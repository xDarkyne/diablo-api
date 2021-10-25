import Config from "../config/config"
import { Endpoints } from "../types";

export class URLHandler {
  /**
   * Constructs and returns a string with the App URL,
   * locale, endpoint and slug for easy access trough the API.
   * 
   * @param endpoint 
   * @param slug 
   * @param region 
   * @returns ready-to-use URL pointing to an endpoint of this service.
   */
  public static getEndpointUrl(endpoint: Endpoints, slug: string = "", locale: string = Config.DEFAULT_LOCALE, region: string = Config.DEFAULT_REGION): string {
    return `${Config.URL}/${region}/${locale}/${endpoint}${slug}`;
  }

  /**
   * Constructs and returns a string with the APP URL pointing
   * to a media file (image) of a gives slug.
   * 
   * Supported sizes are: 21, 42, 64, small and large
   * 
   * @param endpoint 
   * @param size (21, 42, 64, small, large)
   * @param icon 
   * @returns ready-to-use URL pointing to an image from Blizzard's media API.
   */
  public static getMediaURL(endpoint: string, size: string, icon: string): string {
    return `http://media.blizzard.com/d3/icons/${endpoint}/${String(size)}/${icon}.png`;
  }
}