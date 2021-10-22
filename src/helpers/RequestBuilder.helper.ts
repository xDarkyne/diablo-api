import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Cache, CacheContainer } from "node-ts-cache";
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { stringify } from "querystring";
import { RequestConfig } from "../models";
import { Regions, Endpoints } from "../types";
import config from '../config/config';

const tokenCache = new CacheContainer(new MemoryStorage());

export class RequestBuilder {

  private static Urls: Record<keyof Regions, string> = {
    eu: "https://eu.api.blizzard.com/",
    us: "https://us.api.blizzard.com/"
  }

  private  static Endpoints: Record<keyof Endpoints, string> = {
    seasonIndex: "data/d3/season/",
    itemTypeIndex: "d3/data/item-type/",
    item: "d3/data/item/"
  }

  @Cache(tokenCache, { ttl: 15 })
  private static async getAccessToken(): Promise<string> {
    if (config.CLIENT_ID === "" || config.CLIENT_SECRET === "") throw "Could not recieve access token.";

    let requestData: AxiosRequestConfig = {
      url: "/oauth/token",
      method: "POST",
      baseURL: "https://eu.battle.net",
      auth: {
        username: config.CLIENT_ID,
        password: config.CLIENT_SECRET
      },
      data: stringify({"grant_type": "client_credentials"})
    };

    const token = await axios.request(requestData)
      .then((res: AxiosResponse) => {
        return res.data.access_token;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });

    return token;
  }

  /**
   * This is for testing purposes and might be removed later.
   * 
   * @param endpoint 
   * @param slug 
   * @param region 
   * @returns 
   */
  public static getUrl(endpoint: string, slug: string = ""): string {
    return `http://localhost:${config.PORT}/${endpoint}/${slug}`;
  }

  public static async getRequest(requestParams: RequestConfig): Promise<AxiosRequestConfig> {
    let token = await this.getAccessToken();
    let slug = requestParams.slug || "";
    let url = this.Endpoints[requestParams.endpoint] + slug;

    const requestConfig: AxiosRequestConfig = {
      url: url,
      baseURL: this.Urls[requestParams.region],
      method: requestParams.method || "GET",
      headers: {
        "Authorization": `bearer ${token}`
      },
      params: {
        "locale": requestParams.locale || config.DEFAULT_LOCALE
      }
    };

    return requestConfig;
  }

  public static async makeRequest<T>(requestConfig: AxiosRequestConfig): Promise<T> {
    let data = await axios.request<T>(requestConfig)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    
    return data;
  }
}
