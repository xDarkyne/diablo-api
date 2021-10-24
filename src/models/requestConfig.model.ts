import { AxiosBasicCredentials, Method } from "axios";
import { Endpoints } from "../types";

export interface RequestConfig {
  endpoint: keyof Endpoints,
  region: string,
  method?: Method,
  data?: Object,
  locale?: string,
  auth?: AxiosBasicCredentials,
  slug?: string
}
