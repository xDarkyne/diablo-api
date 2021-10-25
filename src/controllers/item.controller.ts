import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { RequestBuilder } from '../helpers/RequestBuilder.helper';
import Config from '../config/config';
import { Item } from '../models';
import { URLHandler } from '../helpers';

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
      let config = await RequestBuilder.getRequest({
        endpoint: "item",
        region: region,
        slug: slug,
        locale: locale,
      });
      let data = await RequestBuilder.makeRequest<Item>(config);
      data.iconSmallURL = URLHandler.getMediaURL(`items/small/${data.icon!}.png`);
      data.iconLargeURL = URLHandler.getMediaURL(`items/large/${data.icon!}.png`);
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
