import { Request, Response } from 'express';
import { Cache, CacheContainer } from "node-ts-cache";
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import Config from '../config/config';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { stringify } from "qs";

const tokenCache = new CacheContainer(new MemoryStorage());

export class DiabloController{

    public static Endpoints: Record<string, string> = {
        "seasonIndex": "https://eu.api.blizzard.com/data/d3/season/",
        "itemTypeIndex": "https://eu.api.blizzard.com/d3/data/item-type/",
        "item": "https://eu.api.blizzard.com/d3/data/item/"
    }
    public static HeroSlugs: Record<string, string> = {
        "barbarian": "barbarian",
        "crusader": "crusader",
        "necromancer": "necromancer",
        "dh": "demon-hunter",
        "wd": "witch-doctor",
        "monk": "monk"
    }

    @Cache(tokenCache, { ttl: 15 })
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

        let data = await axios.request(requestData).then((res: AxiosResponse) => {
            return res.data;
        }).catch(error => console.log(error));
        const token = data.access_token;
        const headers: AxiosRequestConfig = {
            headers: { "Authorization": `bearer ${token}` }
        }

        return headers;
    }

    public static async getItemType(req: Request, res: Response) {
        let slug = req.params.type;
        let auth = await this.getAccessToken();
        let url = this.Endpoints["itemTypeIndex"]+slug;

        let data = await axios.get(url, auth).then(res => res.data).catch((err: AxiosError) => {
            console.error(err);
        });

        res.json(data);
    }

    public static async getItem(req: Request, res: Response) {
        let slug = req.params.item;
        let auth = await this.getAccessToken();
        let url = this.Endpoints["item"]+slug;

        let data = await axios.get(url, auth).then(res => res.data).catch((err: AxiosError) => {
            console.error(err);
        });

        res.json(data);
    }

    public static getItemTypeIndex = async(req: Request, res: Response) => {
        let auth = await this.getAccessToken();

        let data = await axios.get("https://eu.api.blizzard.com/d3/data/item-type/", auth).then(res => res.data).catch((err: AxiosError) => {

        });

        res.json(data);
    }
}
