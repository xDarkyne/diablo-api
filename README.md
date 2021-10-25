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

### - `:region/:locale/item-types`

returns all item types

### - `:region/:locale/item-types/:type`

returns all items by slug `type`

### - `:region/:locale/item/:item`

returns detailed information about an item by given item-slug and item-id

### - `:region/:locale/v1/item-types/`

custom endpoint returning an index of available grouped item-type slugs

### - `:region/:locale/v1/item-types/:slug`

custom endpoint returning grouped results for item-types like `bootsnecromancer`, `bootscrusader` and `boots` under one single endpoint called `boots`

### - `:region/:locale/v1/items-all`

returns all items defined in the Storage Helper, this function is relatively slow though it gets cached after being called once. Only use this if you really have to

<a name="parameters">

## Parameters

### Regions

- `eu` - Europe (default)
- `us` - North America
- `kr` - Korea
- `tw` - Taiwan
- `ch` - China

All regions _should_ work, though only eu and us is actively being tested.

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

- Head - `/head`
- Shoulders - `/shoulders`
- Chest - `/chest`
- Bracers - `/bracers`
- Gloves - `/gloves`
- Waist - `/waist`
- Legs - `/legs`
- Jewelry - `/jewelry`
- Boots - `/boots`
- Offhand - `/offhand`
- Follower - `/follower`

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
- - [ ] search item
- - [ ] search item by property
- [ ] group categories like bootsmonk, bootsnecromancer, etc
- - [x] Armor
- - [ ] Weapons
- - [ ] Other
- [ ] create devops workflows
- [x] implement support for multiple regions
- [x] implement support for oauth in multiple regions
- [x] allow localization
- [ ] make api more resilient against errors
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
