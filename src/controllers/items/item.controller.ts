import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { URLHandler, RequestBuilder } from '../../helpers';
import { Item } from '../../models';
import { Endpoints } from '../../types';
import Config from '../../config/config';

const ItemCache = new CacheContainer(new MemoryStorage());

export class ItemController {

  /**
   * Fetches the information about a given items and
   * caches it.
   * 
   * @param config 
   * @returns 
   */
  @Cache(ItemCache, { ttl: 3600 })
  private static async fetchItem(slug: string, locale: string = Config.DEFAULT_LOCALE, region: string = Config.DEFAULT_REGION): Promise<Item> {
    try {
      let data = await RequestBuilder.GET<Item>({
        endpoint: Endpoints.Item,
        region: region,
        slug: slug,
        locale: locale,
      });
      
      data.iconSmallURL = URLHandler.getMediaURL("items", "small", data.icon!);
      data.iconLargeURL = URLHandler.getMediaURL("items", "large", data.icon!);
      return data;
    } catch(error: any) {
      throw "Something terrible happened";
    }
  }

  /**
   * GET | Endpoint to get detailed information about
   * an item defined by slug.
   * 
   * @param req 
   * @param res 
   */
  public static async getItem(req: Request, res: Response) {
    let slug = req.params["item"];
    let locale = req.params["locale"];
    let region = req.params["region"];

    let data = await this.fetchItem(slug, locale, region).catch(error => {
      console.error(error);
    });

    res.json(data);
  }
}
