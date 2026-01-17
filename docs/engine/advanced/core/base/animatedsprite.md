# AnimatedSprite

The `AnimatedSprite` class creates a sprite that supports shader-based animations, commonly used for sprite sheet animations in 3D space.

## Import

```javascript
import { AnimatedSprite, Images } from "mage-engine";
```

## Constructor

```javascript
new AnimatedSprite(width, height, textureId, options);
```

### Parameters

| Parameter   | Type     | Default    | Description                   |
| ----------- | -------- | ---------- | ----------------------------- |
| `width`     | `number` | `20`       | Width of the animated sprite  |
| `height`    | `number` | `20`       | Height of the animated sprite |
| `textureId` | `string` | _required_ | Texture ID from Images system |
| `options`   | `Object` | `{}`       | Sprite material options       |

## Properties

| Property    | Type     | Description                   |
| ----------- | -------- | ----------------------------- |
| `width`     | `number` | Width of the animated sprite  |
| `height`    | `number` | Height of the animated sprite |
| `textureId` | `string` | The texture ID                |

## Technical Details

- Uses `AnimatedSpriteMaterial` for advanced shader-based animations
- Based on sprite sheets/texture atlases
- Scale is set via `scale.x` and `scale.y`

## Examples

### Basic AnimatedSprite

```javascript
import { AnimatedSprite, Images } from "mage-engine";

// Load the sprite sheet texture first
// In your config: images: { 'spriteSheet': 'path/to/spritesheet.png' }

// Create the animated sprite
const animatedSprite = new AnimatedSprite(32, 32, "spriteSheet");
```

### Custom Size

```javascript
// Create a larger animated sprite
const character = new AnimatedSprite(64, 64, "characterSheet");
```

### With Options

```javascript
// Create an animated sprite with material options
const effect = new AnimatedSprite(48, 48, "effectSheet", {
  transparent: true,
  opacity: 0.8,
});
```

## Methods

### Inherited Methods

The AnimatedSprite inherits methods from the [Element](/engine/advanced/core/element.md) class:

- `setPosition(x, y, z)` - Set position
- `setScale(x, y, z)` - Set scale
- `setOpacity(value)` - Set transparency (0-1)

## Serialization

```javascript
// Serialize to JSON
const json = animatedSprite.toJSON();

// Create from serialized data
const restoredSprite = AnimatedSprite.fromJSON(json);
```

## Use Cases

### Character Animations

```javascript
// Create an animated character sprite
const player = new AnimatedSprite(32, 32, "playerSpriteSheet");
player.setPosition(0, 16, 0);
```

### Particle Effects

```javascript
// Animated fire effect
const fire = new AnimatedSprite(48, 48, "fireSpriteSheet");
```

### UI Elements

```javascript
// Animated UI indicator
const indicator = new AnimatedSprite(24, 24, "loadingSpinner");
```

## See Also

- [Sprite](/engine/advanced/core/base/sprite.md) - For static sprites
- [Images and Textures](/engine/advanced/assets/images_and_textures.md) - Loading images
- [Element](/engine/advanced/core/element.md) - Base class documentation
