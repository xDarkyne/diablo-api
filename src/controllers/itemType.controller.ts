import { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { RequestBuilder } from '../helpers/RequestBuilder.helper';
import { ItemType, Base } from '../models';
import config from '../config/config';
import { StorageHelper } from '../helpers';
import { Categories } from '../types';

const ItemTypeIndexCache = new CacheContainer(new MemoryStorage());
const ItemTypeCache = new CacheContainer(new MemoryStorage());

export class ItemTypeController {

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
        }));

        return data;
    }
    
    public static getItemTypeIndex = async(req: Request, res: Response) => {
        let data = await this.fetchItemTypeIndex(req.params["locale"]);

        res.json(data);
    }

    @Cache(ItemTypeCache, { ttl: 3600 })
    private static async fetchItemType(slug: string, locale: string = config.DEFAULT_LOCALE): Promise<Base[]> {
        let config = await RequestBuilder.getRequest({
            endpoint: "itemTypeIndex",
            region: "eu",
            slug: slug,
            locale: locale
        });
        let data = await RequestBuilder.makeRequest<Base[]>(config);

        await Promise.all(data.map(async(item: Base) => {
            item.url = RequestBuilder.getUrl("item", item.path.split("/")[1]);
        }));

        return data;
    }

    public static async getItemType(req: Request, res: Response) {
        let slug = req.params["type"];
        let locale = req.params["locale"];

        let data = [] as any[];
        if (StorageHelper.Categories[slug as keyof Categories]) {
            await Promise.all(StorageHelper.Categories[slug as keyof Categories].map(async(slug) => {
                let d = await this.fetchItemType(slug, locale);
                await Promise.all(d.map(async(item) => {
                    data.push(item);
                }));
            }));
        } else data = await this.fetchItemType(slug, locale);
        

        res.json(data);
    }
}
