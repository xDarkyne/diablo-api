import { AxiosBasicCredentials, Method } from "axios";

export interface Points {
    item: string,
    itemTypeIndex: string,
    seasonIndex: string
}

export interface Regions {
    eu: string,
    us: string
}

export interface RequestConfig {
    endpoint: keyof Points,
    region: keyof Regions,
    method?: Method,
    data?: Object,
    locale?: string,
    auth?: AxiosBasicCredentials,
    slug?: string
}