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

### - `:region/:locale/v1/item-types/:slug`

custom endpoint returning grouped results for item-types like `bootsnecromancer`, `bootscrusader` and `boots` under one single endpoint called `boots`.

### - `:region/:locale/v1/items-all`

returns all items defined in the Storage Helper, this function is relatively slow though it gets cached after being called once. Only use this if you really have to.

<a name="parameters">

## Tested Parameters

### Regions

- Europe `eu` (default)
- USA `us`

Although only those were tested, all regions (except china) _should_ work.

### Locales

- German - `de_DE` (default)
- English (US) - `en_US`
- Espanol (Spain) - `es_ES`

Although only those were tested, all locales _should_ work.
You can find your locale [here](https://saimana.com/list-of-country-locale-code/).

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
- [ ] group categories like bootsmonk, bootsnecromancer, etc
- - [x] Armor
- - [ ] Weapons
- - [ ] Other
- ### CUSTOM
- - [x] get all items\*
- - [ ] get list of custom item-types
- - [ ] search item
- - [ ] search item by property
- [ ] create devops workflows
- [x] implement support for multiple regions
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
