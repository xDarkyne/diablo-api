import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { RequestBuilder } from '../helpers/RequestBuilder.helper';
import { ItemType } from '../models';

const ItemTypeIndexCache = new CacheContainer(new MemoryStorage());

export class ItemTypeController {

    @Cache(ItemTypeIndexCache, { ttl: 3600 })
    private static async fetchItemTypeIndex(): Promise<ItemType[]> {
        let config = await RequestBuilder.getRequest("itemTypeIndex");
        let data = await RequestBuilder.makeRequest<ItemType[]>(config);

        await Promise.all(data.map(async(type: ItemType) => {
            type.slug = type.path.split("/")[1];
        }));

        return data;
    }
    
    public static getItemTypeIndex = async(req: Request, res: Response) => {
        let data = await this.fetchItemTypeIndex();

        res.json(data);
    }

    public static async getItemType(req: Request, res: Response) {
        let slug = req.params["type"];
        let config = await RequestBuilder.getRequest("itemTypeIndex", slug);
        let data = await RequestBuilder.makeRequest<any>(config);

        res.json(data);
    }
}
