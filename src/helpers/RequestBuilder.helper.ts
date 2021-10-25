import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Cache, CacheContainer } from "node-ts-cache";
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { stringify } from "querystring";
import { RequestConfig } from "../models";
import Config from '../config/config';

const tokenCache = new CacheContainer(new MemoryStorage());

export class RequestBuilder {

  /**
   * Easy storage of Blizzard's Region URLs
   */
  private static URLS: Record<string, { api: string, auth: string }> = {
    "eu": { api: "https://eu.api.blizzard.com/", auth: "https://eu.battle.net/" },
    "us": { api: "https://us.api.blizzard.com/", auth: "https://us.battle.net/" },
    "kr": { api: "https://kr.api.blizzard.com/", auth: "https://apac.battle.net/" },
    "tw": { api: "https://tw.api.blizzard.com/", auth: "https://apac.battle.net/" },
    "cn": { api: "https://gateway.battlenet.com.cn/", auth: "https://www.battlenet.com.cn/" },
  }

  /**
   * Fetches, caches and returns an access token for Blizzard's API
   * with the provided client ID and client secret.
   * 
   * @returns 
   */
  @Cache(tokenCache, { ttl: 3600 })
  private static async getAccessToken(region: string = Config.DEFAULT_REGION): Promise<string> {
    if (Config.CLIENT_ID === "" || Config.CLIENT_SECRET === "") throw "Could not recieve access token.";
    let url = this.URLS[region].auth;

    let requestData: AxiosRequestConfig = {
      url: "oauth/token",
      method: "POST",
      baseURL: url,
      auth: {
        username: Config.CLIENT_ID,
        password: Config.CLIENT_SECRET
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
   * Helper function for easy axios requests
   * 
   * @param params 
   * @returns 
   */
  public static async GET<T>(params: RequestConfig): Promise<T> {
    let token = await this.getAccessToken(params.region);
    let slug = params.slug || "";

    const config: AxiosRequestConfig = {
      url: params.endpoint + slug,
      baseURL: this.URLS[params.region].api,
      method: params.method || "GET",
      headers: {
        "Authorization": `bearer ${token}`
      },
      params: {
        "locale": params.locale || Config.DEFAULT_LOCALE
      }
    };

    let data = await axios.request<T>(config)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw "Something terrible happened";
      });
    
    return data;
  }
}
