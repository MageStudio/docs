# Universe

The Universe module is responsible for holding everything that is displayed within your level. It offers a number of methods you can use to search for Entities.

::: warning Since v3.23.41
Elements are stored and indexed by **UUID** instead of by name. Name lookups still work through a secondary index, but names are no longer required to be unique — when multiple elements share a name, name lookups return the first one registered. Prefer UUIDs (`element.uuid()`) when you need an unambiguous reference.
:::

## Methods

#### get(id: String): Element

Looks the element up by UUID first, then falls back to a name lookup. This keeps code written before `v3.23.41` working unchanged.

#### getByName(name: String): Element

Returns the first element registered under `name`.

#### getByUUID(uuid: String): Element

Direct UUID lookup. Use `element.uuid()` to obtain an element's UUID.

#### getByTag(tag: String): Element[]

Returns all elements carrying the given tag.

#### find(threeObject: Object3D): Element

Maps a raw THREE.js object to its Mage element, walking up the parent chain if needed — useful when working with raycast hits.

#### forEach(callback: (element, uuid) => void)

Iterates over every element in the universe.

#### forEachAsync(callback: (element, uuid) => Promise): Promise

Async variant of `forEach` — awaits the callback for each element.
