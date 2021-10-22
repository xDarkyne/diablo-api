import { AxiosBasicCredentials, Method } from "axios";
import { Endpoints, Regions } from "../types";

export interface RequestConfig {
    endpoint: keyof Endpoints,
    region: keyof Regions,
    method?: Method,
    data?: Object,
    locale?: string,
    auth?: AxiosBasicCredentials,
    slug?: string
}