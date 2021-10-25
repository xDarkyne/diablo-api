import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { StorageHelper, ErrorHandler, RequestBuilder, URLHandler } from '../../helpers';
import { ItemType } from '../../models';
import { Endpoints, ItemTypes } from '../../types';
import Config from '../../config/config';

export abstract class CustomItemTypesController {
  /**
   * Fetches all items in a category by slug defined in the StorageHelper 
   * (src/helpers/StorageHelper.helpers.ts).
   * 
   * @param slug 
   * @param locale 
   * @returns 
   */
  private static async fetchGroupedItemType(slug: ItemTypes, locale: string, region: string = Config.DEFAULT_REGION): Promise<ItemType[]> {
    try {
      let data = [] as ItemType[];
      await Promise.all(StorageHelper.Categories[slug].map(async(category) => {
        let config = await RequestBuilder.getRequest({
          endpoint: Endpoints.ItemType,
          region: region,
          slug: category.slug,
          locale: locale
        });

        let slugData = await RequestBuilder.makeRequest<ItemType[]>(config);
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
   * GET | Request to get an index of my custom grouped item types.
   * 
   * @param req 
   * @param res 
   */
  public static async getGroupedItemTypeIndex(req: Request, res: Response) {
    let types = [];
    let region = req.params["region"];
    let locale = req.params["locale"];

    try {
      for (const itemType in StorageHelper.Categories) {
        let item = {
          slug: itemType,
          url: URLHandler.getEndpointUrl(Endpoints.cGroupedItemTypeIndex, itemType, locale, region)
        };
        types.push(item);
      }
    } catch(error) {

    }

    res.json(types);
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
    let slug = req.params["type"] as ItemTypes;
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
        let slug = item as ItemTypes;
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
