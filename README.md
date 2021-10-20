<div align=center>
  <h1>Diablo 3 API</h1>
</div>

## Table of Contents
- [ Description ](#description)
- [ Endpoints ](#endpoints)
- [ Todo ](#todo)

<a name="description"></a>

## Description
This is a wrapper for the diablo 3 api made my blizzard written in TypeScript.

<a name="endpoints"></a>

## Endpoints

### - `/item-types`
returns all item types

### - `/item-types/:type`
returns all items by slug `type`

### - `/items/:item`
returns detailed information about an item by given item-slug and item-id

<a name="todo"></a>

## Todo
- [x] implement request for access token
- [x] cache access token
- [x] implement basic routes
- [x] create first dynamic routes
- [ ] cover all endpoints
- [ ] allow localization
- [ ] make api more resilient against errors
- [ ] write detailed documentation for api
