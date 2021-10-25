import { AxiosBasicCredentials, Method } from "axios";
import { Endpoints } from "../types";

/**
 * custom RequestConfig used in RequestBuilder
 * helper class for avoiding redundancy in requests.
 */
export interface RequestConfig {
  endpoint: Endpoints,
  region: string,
  method?: Method,
  data?: Object,
  locale?: string,
  auth?: AxiosBasicCredentials,
  slug?: string
}
