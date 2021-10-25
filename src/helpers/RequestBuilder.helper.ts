import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Cache, CacheContainer } from "node-ts-cache";
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { stringify } from "querystring";
import { RequestConfig } from "../models";
import Config from '../config/config';
import { Endpoints } from "../types";

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
    if (Config.CLIENT_ID === "" || Config.CLIENT_SECRET === "") throw "Client credentials not defined.";

    let data = await this.GET<any>({
      endpoint: Endpoints.Auth,
      region: region,
      method: "POST",
      auth: {
        username: Config.CLIENT_ID,
        password: Config.CLIENT_SECRET
      },
      data: stringify({"grant_type": "client_credentials"})
    }, "auth");

    const token = data.access_token;
    return token;
  }
  
  /**
   * Helper function for easy axios requests
   * 
   * @param params 
   * @returns 
   */
  public static async GET<T>(params: RequestConfig, type: keyof { api: string, auth: string } = "api"): Promise<T> {
    let slug = params.slug || "";
    let url = this.URLS[params.region][type];

    const config: AxiosRequestConfig = {
      url: params.endpoint + slug,
      baseURL: url,
      method: params.method || "GET",
      params: {
        "locale": params.locale || Config.DEFAULT_LOCALE
      },
    };

    if (type === "auth") {
      config.auth = params.auth;
      config.data = params.data;
    } else {
      let token = await this.getAccessToken(params.region);
      config.headers = {
        "Authorization": `bearer ${token}`
      };
    }

    let data = await axios.request<T>(config)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
    
    return data;
  }
}
