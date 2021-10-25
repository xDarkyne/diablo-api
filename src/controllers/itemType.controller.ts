import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { ItemType, ItemCategories } from '../models';
import { StorageHelper, ErrorHandler, RequestBuilder, URLHandler } from '../helpers';
import Config from '../config/config';

const ItemTypeIndexCache = new CacheContainer(new MemoryStorage());
const ItemTypeCache = new CacheContainer(new MemoryStorage());

export class ItemTypeController {

  /**
   * Fetches the index of all item-types from Blizzard's item-type-index endpoint.
   * returns a promise of type ItemType[].
   * 
   * @param locale 
   * @returns 
   */
  @Cache(ItemTypeIndexCache, { ttl: 3600 })
  private static async fetchItemTypeIndex(locale: string = Config.DEFAULT_LOCALE, region: string = Config.DEFAULT_REGION): Promise<ItemType[]> {
    let config = await RequestBuilder.getRequest({
      endpoint: "itemTypeIndex",
      region: region,
      locale: locale,
    });
    let data = await RequestBuilder.makeRequest<ItemType[]>(config);

    await Promise.all(data.map(async(type: ItemType) => {
      type.slug = type.path.split("/")[1];
      type.url = URLHandler.getEndpointUrl("item-types", type.slug, locale);
    }));

    return data;
  }
    
  /**
   * GET | Request to get an index of all of Blizzard's vanilla
   * item-types, this endpoint does not include the grouped types
   * I made.
   * 
   * @param req 
   * @param res 
   */
  public static getItemTypeIndex = async(req: Request, res: Response) => {
    let data = await this.fetchItemTypeIndex(req.params["locale"]);
    res.json(data);
  }

  /**
   * Fetches all items from a given slug from Blizzard's item-type endpoint.
   * returns a promise of type ItemType[].
   * 
   * @param slug 
   * @param locale 
   * @returns 
   */
  @Cache(ItemTypeCache, { ttl: 3600 })
  private static async fetchItemType(slug: string, locale: string = Config.DEFAULT_LOCALE, region: string = Config.DEFAULT_REGION): Promise<ItemType[]> {
    try {
      let config = await RequestBuilder.getRequest({
        endpoint: "itemTypeIndex",
        region: region,
        slug: slug,
        locale: locale
      });
      let data = await RequestBuilder.makeRequest<ItemType[]>(config);
  
      await Promise.all(data.map(async(item: ItemType) => {
        item.url = URLHandler.getEndpointUrl("item", item.path.split("/")[1], locale);
      }));
  
      return data;
    } catch(error: any) {
      throw "Invalid slug provided";
    }
  }

  /**
   * GET | Request to recieve a specific item-type defined by
   * slug from Blizzard's item-type endpoint.
   * 
   * @param req 
   * @param res 
   */
  public static async getItemType(req: Request, res: Response) {
    let slug = req.params["type"];
    let locale = req.params["locale"];

    try {
      let data = await this.fetchItemType(slug, locale);
      res.json(data);
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
  private static async fetchGroupedItemType(slug: keyof ItemCategories, locale: string, region: string = Config.DEFAULT_REGION): Promise<ItemType[]> {
    try {
      let data = [] as ItemType[];
      await Promise.all(StorageHelper.Categories[slug].map(async(category) => {
        let slugData = await this.fetchItemType(category.slug, locale, region);
        await Promise.all(slugData.map(async(item: ItemType) => {
          item.type = category.type;
          item.class = category.class;
          item.origin  =  category.slug;
          data.push(item);
        }));
      }));

      return data;
    } catch(error: any) {
      throw "Something terrible happened";
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
    let slug = req.params["type"] as keyof ItemCategories;
    let locale = req.params["locale"];

    if (!StorageHelper.Categories[slug]) {
      ErrorHandler.Handle(req, res, "Invalid Slug");
      return;
    }

    try {
      let data = await this.fetchGroupedItemType(slug, locale);
      res.json(data);
    } catch(error: any) {
      console.error(error);
      ErrorHandler.Handle(req, res, "Something terrible happened :c");
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
      let categories = [] as string[];
      for (const category in StorageHelper.Categories) {
        categories.push(category);
      }

      let data = [] as ItemType[];
      await Promise.all(categories.map(async(item: string) => {
        let slug = item as keyof ItemCategories;
        let subData = await this.fetchGroupedItemType(slug, locale, region);
        data.push(...subData);
      }));

      res.json(data);
    } catch(error: any) {
      console.error(error);
      ErrorHandler.Handle(req, res, "Something terrible happened :c");
    }
  }
}
