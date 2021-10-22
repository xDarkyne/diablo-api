import { Request, Response } from 'express';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { RequestBuilder } from '../helpers/RequestBuilder.helper';
import { ItemType, Base } from '../models';
import config from '../config/config';
import { StorageHelper } from '../helpers';
import { ItemCategories } from '../types';
import { ErrorHandler } from '../helpers/ErrorHandler.helper';

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
      type.url = RequestBuilder.getUrl("item-types", type.slug, locale);
    }));

    return data;
  }
    
  public static getItemTypeIndex = async(req: Request, res: Response) => {
    let data = await this.fetchItemTypeIndex(req.params["locale"]);
    res.json(data);
  }

  @Cache(ItemTypeCache, { ttl: 3600 })
  private static async fetchItemType(slug: string, locale: string = config.DEFAULT_LOCALE): Promise<ItemType[]> {
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
  }

  public static async getItemType(req: Request, res: Response) {
    let slug = req.params["type"];
    let locale = req.params["locale"];

    let data = await this.fetchItemType(slug, locale);

    res.json(data);
  }

  public static async getGroupedItemType(req: Request, res: Response) {
    console.time("fetch")
    let slug = req.params["type"] as keyof ItemCategories;
    let locale = req.params["locale"];

    if (!StorageHelper.Categories[slug]) {
      ErrorHandler.Handle(req, res, "Invalid Slug");
      return;
    }

    let data = [] as ItemType[];
    await Promise.all(StorageHelper.Categories[slug].map(async(category) => {
      let subSlug = category[0];
      let typeClass = category[1];
      let slugData = await this.fetchItemType(subSlug, locale);
      await Promise.all(slugData.map(async(item: ItemType) => {
        item.class = typeClass;
        data.push(item);
      }));
    }));

    res.json(data);
    console.timeEnd("fetch");
  }
}
