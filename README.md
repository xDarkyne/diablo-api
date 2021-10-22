<div align=center>
  <h1>Diablo 3 API</h1>
</div>

## Table of Contents
- [ Description ](#description)
- [ Endpoints ](#endpoints)
- [ Todo ](#todo)
- [ Api ](#blizzard)

<a name="description"></a>

## Description
[ this project is a work in progress ]

This is my take on writing a TypeScript wrapper for Blizzards Diablo3 API with caching and that sort of fancy stuff.

<a name="endpoints"></a>

## Covered Endpoints

### - `/:locale/item-types`
returns all item types

### - `/:locale/item-types/:type`
returns all items by slug `type`

### - `/:locale/item/:item`
returns detailed information about an item by given item-slug and item-id

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
- [x] allow localization
- [ ] make api more resilient against errors
- [ ] write detailed documentation for api

<a name="blizzard"></a>

## Blizzard API
My wrapper builds on top of blizzards own Diablo3 api. You can find their official documentation [here](https://develop.battle.net/documentation/diablo-3/).