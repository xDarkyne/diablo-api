/**
 * list of endpoint keys
 */
export enum Endpoints {
  // Blizzard
  Auth = "oauth/token",
  Item = "d3/data/item/",
  ItemTypeIndex = "d3/data/item-type/",
  ItemType = "d3/data/item-type/",
  SeasonIndex = "data/d3/season/",

  // Custom - prefixed with c
  cItem = "item/",
  cItemTypeIndex = "item-types/",
  cItemType = "item-types/",
  cSeasonIndex = "seasons/",
  cGroupedItemTypeIndex = "v1/item-types/",
  cGroupedItemType = "v1/item-types/",
  cAllItems = "v1/items-all",
}
