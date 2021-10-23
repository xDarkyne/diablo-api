import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { ItemType, ItemCategories } from '../models';
import config from '../config/config';
import { StorageHelper, ErrorHandler, RequestBuilder } from '../helpers';

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
  private static async fetchItemTypeIndex(locale: string = config.DEFAULT_LOCALE): Promise<ItemType[]> {
    let config = await RequestBuilder.getRequest({
      endpoint: "itemTypeIndex",
      region: "eu",
      locale: locale,
    });
    let data = await RequestBuilder.makeRequest<ItemType[]>(config);

    await Promise.all(data.map(async(type: ItemType) => {
      type.slug = type.path.split("/")[1];
      type.url = RequestBuilder.getUrl("item-types", type.slug, locale);
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
  private static async fetchItemType(slug: string, locale: string = config.DEFAULT_LOCALE): Promise<ItemType[]> {
    try {
      let config = await RequestBuilder.getRequest({
        endpoint: "itemTypeIndex",
        region: "eu",
        slug: slug,
        locale: locale
      });
      let data = await RequestBuilder.makeRequest<ItemType[]>(config);
  
      await Promise.all(data.map(async(item: ItemType) => {
        item.url = RequestBuilder.getUrl("item", item.path.split("/")[1], locale);
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
      let data = [] as ItemType[];
      await Promise.all(StorageHelper.Categories[slug].map(async(category) => {
        let slugData = await this.fetchItemType(category.slug, locale);
        await Promise.all(slugData.map(async(item: ItemType) => {
          item.type = category.type;
          item.class = category.class;
          data.push(item);
        }));
      }));

      res.json(data);
    } catch(error: any) {
      console.error(error);
      ErrorHandler.Handle(req, res, "Something terrible happened :c");
    }
  }
}
