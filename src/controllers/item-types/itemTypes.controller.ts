import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { ErrorHandler, RequestBuilder, URLHandler } from '../../helpers';
import { ItemType } from '../../models';
import { Endpoints } from '../../types';
import Config from '../../config/config';

const ItemTypeIndexCache = new CacheContainer(new MemoryStorage());
const ItemTypeCache = new CacheContainer(new MemoryStorage());

export class ItemTypesController {

  /**
   * Fetches the index of all item-types from Blizzard's item-type-index endpoint.
   * returns a promise of type ItemType[].
   * 
   * @param locale 
   * @returns 
   */
  @Cache(ItemTypeIndexCache, { ttl: 3600 })
  private static async fetchItemTypeIndex(locale: string = Config.DEFAULT_LOCALE, region: string = Config.DEFAULT_REGION): Promise<ItemType[]> {
    let data = await RequestBuilder.GET<ItemType[]>({
      endpoint: Endpoints.ItemTypeIndex,
      region: region,
      locale: locale,
    });

    await Promise.all(data.map(async(type: ItemType) => {
      type.slug = type.path.split("/")[1];
      type.url = URLHandler.getEndpointUrl(Endpoints.cItemType, type.slug, locale);
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
    try {
      let data = await this.fetchItemTypeIndex(req.params["locale"], req.params["region"]);
      res.json(data);
    } catch(error: any) {
      console.error(error);
      ErrorHandler.Handle(req, res, error);
    }
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
      let data = await RequestBuilder.GET<ItemType[]>({
        endpoint: Endpoints.ItemType,
        region: region,
        slug: slug,
        locale: locale
      });
  
      await Promise.all(data.map(async(item: ItemType) => {
        item.url = URLHandler.getEndpointUrl(Endpoints.cItem, item.path.split("/")[1], locale);
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
}
