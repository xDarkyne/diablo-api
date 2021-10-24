import { Base } from ".";

/**
 * Interface used for typing item-type endpoints
 */
export interface ItemType extends Base {
  origin?: string;
  class?: string;
  type?: string;
}
