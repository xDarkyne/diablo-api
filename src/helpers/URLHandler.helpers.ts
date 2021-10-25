import Config from "../config/config"

export class URLHandler {
    /**
   * Constructs and returns a string with the App URL,
   * locale, endpoint and slug for easy access trough the API.
   * 
   * @param endpoint 
   * @param slug 
   * @param region 
   * @returns 
   */
  public static getEndpointUrl(endpoint: string, slug: string = "", locale: string = Config.DEFAULT_LOCALE, region: string = Config.DEFAULT_REGION): string {
    return `${Config.URL}/${region}/${locale}/${endpoint}/${slug}`;
  }

  public static getMediaURL(endpoint: string) {
    return `http://media.blizzard.com/d3/icons/${endpoint}`;
  }
}