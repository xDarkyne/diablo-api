import { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { RequestBuilder } from '../helpers/RequestBuilder.helper';

const ItemCache = new CacheContainer(new MemoryStorage());

export class ItemController {

    @Cache(ItemCache, { ttl: 3600 })
    private static async fetchItem(config: AxiosRequestConfig): Promise<any> {
        let data = await RequestBuilder.makeRequest<any>(config);
        return data;
    }

    public static async getItem(req: Request, res: Response) {
        let slug = req.params["item"];
        let locale = req.params["locale"];
        let config = await RequestBuilder.getRequest({
            endpoint: "item",
            region: "eu",
            slug: slug,
            locale: locale,
        });
        let data = await this.fetchItem(config);
    
        res.json(data);
    }
}
