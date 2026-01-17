# Sprite

The `Sprite` class creates a 2D image that always faces the camera, commonly used for particles, billboards, and UI elements in 3D space.

## Import

```javascript
import { Sprite, Images } from "mage-engine";
```

## Constructor

```javascript
new Sprite(width, height, textureId, options);
```

### Parameters

| Parameter   | Type     | Default    | Description                   |
| ----------- | -------- | ---------- | ----------------------------- |
| `width`     | `number` | `20`       | Width of the sprite           |
| `height`    | `number` | `20`       | Height of the sprite          |
| `textureId` | `string` | _required_ | Texture ID from Images system |
| `options`   | `Object` | `{}`       | Sprite options                |

### Options

| Option            | Type      | Default | Description                         |
| ----------------- | --------- | ------- | ----------------------------------- |
| `anisotropy`      | `number`  | `1`     | Texture anisotropy level            |
| `sizeAttenuation` | `boolean` | `true`  | Whether sprite scales with distance |
| `depthTest`       | `boolean` | `true`  | Enable depth testing                |
| `depthWrite`      | `boolean` | `true`  | Enable depth writing                |

## Properties

| Property    | Type     | Description          |
| ----------- | -------- | -------------------- |
| `width`     | `number` | Width of the sprite  |
| `height`    | `number` | Height of the sprite |
| `textureId` | `string` | The texture ID       |

## Examples

### Basic Sprite

```javascript
import { Sprite, Images } from "mage-engine";

// First, load the texture in your assets
// In your config: images: { 'mySprite': 'path/to/sprite.png' }

// Create the sprite
const sprite = new Sprite(20, 20, "mySprite");
```

### Custom Size

```javascript
// Create a larger sprite
const billboard = new Sprite(100, 50, "billboard");
```

### Fixed Size Sprite

```javascript
// Sprite that doesn't scale with distance (useful for UI)
const icon = new Sprite(32, 32, "icon", {
  sizeAttenuation: false,
});
```

### High Quality Texture

```javascript
// Sprite with anisotropic filtering
const sprite = new Sprite(50, 50, "detailedTexture", {
  anisotropy: 4,
});
```

### Sprite Without Depth

```javascript
// Sprite that renders on top of everything
const overlay = new Sprite(64, 64, "overlay", {
  depthTest: false,
  depthWrite: false,
});
```

## Methods

### `getRotation()`

Gets the sprite's material rotation.

```javascript
const rotation = sprite.getRotation();
```

### `setRotation(radians)`

Sets the sprite's rotation.

```javascript
sprite.setRotation(Math.PI / 4); // 45 degrees
```

### `setWidth(value)`

Sets the sprite width via scale.

```javascript
sprite.setWidth(100);
```

### `setHeight(value)`

Sets the sprite height via scale.

```javascript
sprite.setHeight(100);
```

### `setAnisotropy(level)`

Sets texture anisotropy (capped at renderer max).

```javascript
sprite.setAnisotropy(8);
```

### `setSizeAttenuation(value)`

Enable/disable size attenuation.

```javascript
sprite.setSizeAttenuation(false); // Fixed size regardless of distance
```

### `setDepthTest(value)`

Enable/disable depth testing.

```javascript
sprite.setDepthTest(false);
```

### `setDepthWrite(value)`

Enable/disable depth writing.

```javascript
sprite.setDepthWrite(false);
```

### Inherited Methods

- `setPosition(x, y, z)` - Set position
- `setScale(x, y, z)` - Set scale
- `setOpacity(value)` - Set transparency

## Serialization

```javascript
// Serialize to JSON
const json = sprite.toJSON();

// Create from serialized data
const restoredSprite = Sprite.fromJSON(json);
```

## See Also

- [AnimatedSprite](/engine/advanced/core/base/animatedsprite.md) - For animated sprites
- [Images and Textures](/engine/advanced/assets/images_and_textures.md) - Loading images
- [Element](/engine/advanced/core/element.md) - Base class documentation
