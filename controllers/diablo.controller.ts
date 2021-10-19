import { Request, Response } from 'express';
import { Cache, CacheContainer } from "node-ts-cache";
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import Config from '../config/config';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { stringify } from "qs";

const tokenCache = new CacheContainer(new MemoryStorage());

export class DiabloController{

    public static Endpoints: Record<string, string> = {
        "seasonIndex": "https://eu.api.blizzard.com/data/d3/season/"
    }

    @Cache(tokenCache, {ttl: 10})
    protected static async getAccessToken(): Promise<any> {
        if (Config.CLIENT_ID === "" || Config.CLIENT_SECRET === "") throw "clldd";

        let requestData: AxiosRequestConfig = {
            url: "/oauth/token",
            method: "post",
            baseURL: "https://eu.battle.net",
            auth: {
                username: Config.CLIENT_ID,
                password: Config.CLIENT_SECRET
            },
            data: stringify({"grant_type": "client_credentials"})
        };

        let data = await axios.request(requestData).then((res: AxiosResponse) => res.data).catch(error => console.log(error));
        const token = data.access_token;

        return token;
    }

    public static getSeasonIndex = async(req: Request, res: Response) => {
        let token = await this.getAccessToken();
        let auth = {
            "Authorization": `Bearer ${token}`
        };

        let data = await axios.get(this.Endpoints["seasonIndex"], { headers: auth }).then(res => res.data);

        data = await axios.get("https://eu.api.blizzard.com/data/d3/season/24", { headers: auth }).then(res => res.data);
        data = await axios.get(data._links.self.href, { headers: auth }).then(res => res.data);
        res.json(data);
    }
}
