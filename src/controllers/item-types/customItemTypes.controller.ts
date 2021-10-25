import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { StorageHelper, ErrorHandler, RequestBuilder, URLHandler } from '../../helpers';
import { ItemType } from '../../models';
import { Endpoints, ItemTypes } from '../../types';
import Config from '../../config/config';

const GroupedItemTypeCache = new CacheContainer(new MemoryStorage());
const AllItemTypeCache = new CacheContainer(new MemoryStorage());

export abstract class CustomItemTypesController {

  /**
   * GET | Request to get an index of my custom grouped item types.
   * 
   * @param req 
   * @param res 
   */
  public static async getGroupedItemTypeIndex(req: Request, res: Response) {
    try {
      let types = [];
      let region = req.params["region"];
      let locale = req.params["locale"];

      for (const itemType in StorageHelper.Categories) {
        let item = {
          slug: itemType,
          url: URLHandler.getEndpointUrl(Endpoints.cGroupedItemTypeIndex, itemType, locale, region)
        };
        types.push(item);
      }

      res.json(types);
    } catch(error: any) {
      console.error(error);
      ErrorHandler.Handle(req, res, error);
    }
  }

  /**
   * Fetches all items in a category by slug defined in the StorageHelper 
   * (src/helpers/StorageHelper.helpers.ts).
   * 
   * @param slug 
   * @param locale 
   * @returns 
   */
  @Cache(GroupedItemTypeCache, { ttl: 3600 })
  private static async fetchGroupedItemType(slug: ItemTypes, locale: string, region: string = Config.DEFAULT_REGION): Promise<ItemType[]> {
    try {
      let data = [] as ItemType[];
      await Promise.all(StorageHelper.Categories[slug].map(async(category) => {
        let slugData = await RequestBuilder.GET<ItemType[]>({
          endpoint: Endpoints.ItemType,
          region: region,
          slug: category.slug,
          locale: locale
        });
        
        await Promise.all(slugData.map(async(item: ItemType) => {
          item.type = category.type;
          item.class = category.class;
          item.origin  =  category.slug;
          item.slug = item.path.split("/")[1]
          item.url = URLHandler.getEndpointUrl(Endpoints.cItem, item.slug, locale, region);
          item.iconSmallURL = URLHandler.getMediaURL("items", "small", item.icon!);
          item.iconLargeURL = URLHandler.getMediaURL("items", "large", item.icon!);
          data.push(item);
        }));
      }));
      
      return data;
    } catch(error: any) {
      let url = URLHandler.getEndpointUrl(Endpoints.cGroupedItemTypeIndex, "", locale, region);
      throw `Could not get information for group "${slug}". Try <a href="${url}">this endpoint</a> for an index of available item types.`;
    }
  }
  
  /**
   *  GET | Runs multiple requests, constructing a combined
   * array of items of the given slug.
   * 
   * This is necessary due to Blizzard's weird way of splitting item types.
   * 
   * @param req 
   * @param res 
   */
  public static async getGroupedItemType(req: Request, res: Response) {
    try {
      let slug = req.params["type"] as ItemTypes;
      let locale = req.params["locale"];
      let searchTerm = req.params["search"];

      let data = await this.fetchGroupedItemType(slug, locale);
      if (searchTerm) {
        data = data.filter((item: any) => {
          let propertyName = req.params["property"]?.toLowerCase();
          let property = (item.hasOwnProperty(propertyName)) ? propertyName : "name";
          return item[property].toLowerCase().includes(searchTerm);
        });
      }
      
      res.json(data);
    } catch(error: any) {
      console.error(error);
      ErrorHandler.Handle(req, res, error);
    }
  }

  /**
   * Fetches, caches and returns a list of all items.
   * 
   * @param locale 
   * @param region 
   * @returns Array of type ItemType containing all items
   */
  @Cache(AllItemTypeCache, { ttl: 3600 })
  private static async fetchAllItemTypes(locale: string = Config.DEFAULT_LOCALE, region: string = Config.DEFAULT_REGION): Promise<ItemType[]> {
    try {
      let categories = [] as string[];
      for (const category in StorageHelper.Categories) {
        categories.push(category);
      }

      let data = [] as ItemType[];
      await Promise.all(categories.map(async(item: string) => {
        let slug = item as ItemTypes;
        let subData = await this.fetchGroupedItemType(slug, locale, region);
        data.push(...subData);
      }));

      return data;
    } catch(error) {
      console.error(error);
      throw "Could not retrieve list of all item types.";
    }
  }

  /**
   * GET | Endpoint to get a list of all items.
   * Currently this does not provide all items since this function
   * uses the StorageHelper which isn't complete yet.
   * 
   * @param req 
   * @param res 
   */
  public static async getAllItemTypes(req: Request, res: Response) {
    let locale = req.params["locale"];
    let region = req.params["region"];

    try {
      let data = await this.fetchAllItemTypes(locale, region);

      res.json(data);
    } catch(error: any) {
      console.error(error);
      ErrorHandler.Handle(req, res, error);
    }
  }

  /**
   * GET | Endpoint allowing to search items based on their names.
   * Support every locale.
   * 
   * @param req 
   * @param res 
   */
  public static async getItemByName(req: Request, res: Response) {
    try {
      let locale = req.params["locale"];
      let region = req.params["region"];
      let searchTerm = req.params["search"]?.toLowerCase();

      let data = await this.fetchAllItemTypes(locale, region);
      data = data.filter((item: any) => {
        let propertyName = req.params["property"]?.toLowerCase();
        let property = (item.hasOwnProperty(propertyName)) ? propertyName : "name";
        return item[property].toLowerCase().includes(searchTerm);
      });

      res.json(data);
    } catch(error: any) {
      console.error(error);
      ErrorHandler.Handle(req, res, error);
    } 
  }
}
