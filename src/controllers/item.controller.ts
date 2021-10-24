import { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { RequestBuilder } from '../helpers/RequestBuilder.helper';
import Config from '../config/config';

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
  private static async fetchItem(config: AxiosRequestConfig): Promise<any> {
    let data = await RequestBuilder.makeRequest<any>(config);
    return data;
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
    let region = req.params["region"] || Config.DEFAULT_REGION;

    let config = await RequestBuilder.getRequest({
      endpoint: "item",
      region: region,
      slug: slug,
      locale: locale,
    });
    let data = await this.fetchItem(config);

    res.json(data);
  }
}
