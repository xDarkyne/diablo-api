import { Base } from ".";
import { ItemTypes } from "../types";

/**
 * Interface used for typing item-type endpoints
 */
export interface ItemType extends Base {
  origin?: string;
  class?: string;
  type?: ItemTypes;
  iconSmallURL?: string,
  iconLargeURL?: string,
}
