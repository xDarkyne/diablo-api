import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Cache, CacheContainer } from "node-ts-cache";
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { stringify } from "querystring";
import Config from '../config/config';

export interface Points {
    item: string,
    itemTypeIndex: string,
    seasonIndex: string
}

export interface Regions {
    eu: string,
    us: string
}

const tokenCache = new CacheContainer(new MemoryStorage());

export class RequestBuilder {

    private static Urls: Record<string, string> = {
        eu: "https://eu.api.blizzard.com/",
        us: "https://us.api.blizzard.com/"
    }

    private  static Endpoints: Record<keyof Points, string> = {
        seasonIndex: "data/d3/season/",
        itemTypeIndex: "d3/data/item-type/",
        item: "d3/data/item/"
    }

    @Cache(tokenCache, { ttl: 15 })
    private static async getAccessToken(): Promise<string> {
        if (Config.CLIENT_ID === "" || Config.CLIENT_SECRET === "") throw "Could not recieve access token.";

        let requestData: AxiosRequestConfig = {
            url: "/oauth/token",
            method: "POST",
            baseURL: "https://eu.battle.net",
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

    public static async getRequest(endpoint: keyof Points, slug: string = "", region: keyof Regions = "eu"): Promise<AxiosRequestConfig> {
        let token = await this.getAccessToken();
        let url = this.Endpoints[endpoint] + slug;

        const requestConfig: AxiosRequestConfig = {
            url: url,
            baseURL: this.Urls[region],
            headers: {
                "Authorization": `bearer ${token}`
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
