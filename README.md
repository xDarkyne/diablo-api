<div align=center>
  <h1>Diablo 3 API</h1>
</div>

## Table of Contents

- [ Description ](#description)
- [ Endpoints ](#endpoints)
- [ Parameters ](#parameters)
- [ Todo ](#todo)
- [ Used Technologies](#technologies)
- [ Api ](#blizzard)

<a name="description"></a>

## Description

[ this project is a work in progress ]

This is my take on writing a TypeScript wrapper for Blizzards Diablo3 API with caching and that sort of fancy stuff.

<a name="endpoints"></a>

## Covered Endpoints

**ALL** Endpoints are prefixed with `/:region/:locale`.

- `/item-types`

returns all item types

- `/item-types/:type`

returns all items by slug `type`

- `/item/:item`

returns detailed information about an item by given item-slug and item-id

- `/v1/item-types/`

custom endpoint returning an index of available grouped item-type slugs

- `/v1/item-types/:slug`

custom endpoint returning grouped results for item-types like `bootsnecromancer`, `bootscrusader` and `boots` under one single endpoint called `boots`

- `/v1/item-types/:slug/:search`

custom endpoint returning grouped results for item-types under one single endpoint. Allows search for items including the search-term in their name.

- `/v1/item-types/:slug/:property/:search`

Same as before but this endpoint allows the search to be performed on a different property of the item. If the given property does not exist the name will be used.

- `/v1/all-items`

returns all items defined in the Storage Helper, this function is relatively slow though it gets cached after being called once. Only use this if you really have to

- `/v1/all-items/:search`

returns a filtered list of items containing the search-term in their name.

- `/v1/all-items/:property/:search`

returns a filtered list of items containing the search-term in their property, if the provided property is invalid the item's name is used.

<a name="parameters">

## Parameters

### Regions

- `eu` - Europe (default)
- `us` - North America
- `kr` - Korea
- `tw` - Taiwan
- `ch` - China

All regions _should_ work, though only eu and us are actively being tested.

### Locales

- `en_US` - English - UNITED STATES OF AMERICA
- `en_GB` - English - UNITED KINGDOM
- `de_DE` - German - GERMANY
- `fr_FR` - French - FRANCE
- `it_IT` - Italian - ITALY
- `ru_RU` - Russian - RUSSIAN FEDERATION
- `pt_PT` - Portuguese - PORTUGAL
- `pt_BR` - Portuguese - BRAZIL
- `es_MX` - Spanish - MEXICO
- `es_ES` - Spanish - SPAIN
- `ko_KR` - Korean - REPUBLIC OF KOREA
- `zh_TW` - Chinese - TAIWAN
- `zh_CN` - Chinese - CHINA

All locales _should_ work, though only de_DE and en_US are actively being tested.

### Grouped item types

- `/head` - Head
- `/shoulders` - Shoulders
- `/chest` - Chest
- `/bracers` - Bracers
- `/gloves` - Gloves
- `/waist` - Waist
- `/legs` - Legs
- `/jewelry` - Jewelry
- `/boots` - Boots
- `/offhand` - Offhand
- `/follower` - Follower
- `/weapon` - Weapons

<a name="todo"></a>

## Todo

- [x] implement request for access token
- [x] cache access token
- [x] implement basic routes
- [x] create first dynamic routes
- [ ] cover all endpoints
- ### Communit API
- - [ ] get ActIndex
- - [ ] get Act
- - [ ] get Artisan
- - [ ] get Recipe
- - [ ] get Follower
- - [ ] get Character Class
- - [ ] get ApiSkill
- - [x] get ItemTypeIndex
- - [x] get ItemType
- - [x] get Item
- - [ ] get ApiAccount
- - [ ] get ApiHero
- - [ ] get ApiDetailedHeroItems
- - [ ] get ApiDetailedFollowerItems
- ### GAME DATA API
- - [ ] get SeasonIndex
- - [ ] get Season
- - [ ] get Season Leaderboard
- - [ ] get EraIndex
- - [ ] get Era
- - [ ] get Era Leaderboard
- ### CUSTOM
- - [x] get all items\*
- - [x] get list of custom item-types
- - [x] search item
- - [x] search item by property
- [ ] group categories like bootsmonk, bootsnecromancer, etc
- - [x] Armor
- - [x] Weapons
- - [ ] Other
- [ ] create devops workflows
- [x] implement support for multiple regions
- [x] implement support for oauth in multiple regions
- [x] allow localization
- [x] make api more resilient against errors
- [ ] write detailed documentation for api
- [ ] refactor, refactor, refactor
- [ ] write selfhosting guide

\* unfinished

<a name="technologies"></a>

## Used technologies

- [Express](https://expressjs.com/de/)
- [TypeScript](https://www.typescriptlang.org/)
- [NodeCache](https://www.npmjs.com/package/node-cache)

<a name="blizzard"></a>

## Blizzard API

My wrapper builds on top of blizzards own Diablo3 api. You can find their official documentation [here](https://develop.battle.net/documentation/diablo-3/).

If you want to self host this API you'll need to provide your client ID ind and client secret in a .env file like the `.example.env`.
You can get your client information [here](https://develop.battle.net/access/clients).
