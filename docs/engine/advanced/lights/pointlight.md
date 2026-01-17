# PointLight

The `PointLight` class creates a light that emits from a single point in all directions, like a light bulb. It supports shadow casting, distance attenuation, and decay.

## Import

```javascript
import { PointLight } from "mage-engine";
```

## Constructor

```javascript
new PointLight(options);
```

### Parameters

| Parameter | Type     | Default | Description          |
| --------- | -------- | ------- | -------------------- |
| `options` | `Object` | `{}`    | Configuration object |

### Options

| Option      | Type     | Default        | Description                  |
| ----------- | -------- | -------------- | ---------------------------- |
| `color`     | `number` | `0xffffff`     | Light color (hex)            |
| `intensity` | `number` | `0.5`          | Light intensity              |
| `name`      | `string` | Auto-generated | Unique name for the light    |
| `position`  | `Object` | -              | Initial position `{x, y, z}` |
| `distance`  | `number` | `0`            | Maximum range (0 = infinite) |
| `decay`     | `number` | `1`            | Light decay rate             |
| `near`      | `number` | `0.1`          | Shadow camera near plane     |
| `far`       | `number` | `100`          | Shadow camera far plane      |
| `mapSize`   | `number` | `2048`         | Shadow map resolution        |
| `bias`      | `number` | `-0.0001`      | Shadow bias                  |

## Examples

### Basic PointLight

```javascript
import { PointLight } from "mage-engine";

// Create a default point light
const light = new PointLight();
```

### Positioned Light

```javascript
// Ceiling light
const ceilingLight = new PointLight({
  position: { x: 0, y: 10, z: 0 },
  intensity: 1.0,
});
```

### Limited Range Light

```javascript
// Torch with limited range
const torch = new PointLight({
  color: 0xffaa00,
  intensity: 1.5,
  position: { x: 5, y: 3, z: 0 },
  distance: 50,
  decay: 2,
});
```

### High Quality Shadows

```javascript
// Point light with high-quality shadows
const light = new PointLight({
  color: 0xffffff,
  intensity: 1.0,
  position: { x: 0, y: 5, z: 0 },
  distance: 100,
  decay: 2,
  mapSize: 2048,
  near: 0.5,
  far: 100,
  bias: -0.001,
});
```

## Methods

### Distance and Decay

| Method               | Description              |
| -------------------- | ------------------------ |
| `setDistance(value)` | Sets maximum light range |
| `getDistance()`      | Returns current distance |
| `setDecay(value)`    | Sets light falloff rate  |
| `getDecay()`         | Returns current decay    |

### Shadow Methods

| Method                        | Description                        |
| ----------------------------- | ---------------------------------- |
| `setShadow(options)`          | Configures shadow settings         |
| `setShadowNearFar(near, far)` | Sets shadow camera clipping planes |
| `setShadowMapSize(size)`      | Sets shadow map resolution         |
| `setShadowBias(bias)`         | Sets shadow bias                   |

### Inherited Methods

| Method                          | Description                    |
| ------------------------------- | ------------------------------ |
| `setIntensity(value)`           | Sets light intensity           |
| `getIntensity()`                | Returns current intensity      |
| `setColor(color)`               | Sets light color               |
| `getColor()`                    | Returns current color          |
| `setPosition(position)`         | Sets light position            |
| `getPosition()`                 | Returns position               |
| `setCastShadow(value)`          | Enables/disables shadows       |
| `getCastShadow()`               | Returns shadow casting state   |
| `animateIntensity(value, time)` | Tweens intensity               |
| `on(time)`                      | Turns light on with animation  |
| `off(time)`                     | Turns light off with animation |

## Examples

### Flickering Torch

```javascript
const torch = new PointLight({
  color: 0xff6600,
  intensity: 1.0,
  position: { x: 5, y: 3, z: 0 },
  distance: 30,
  decay: 2,
});

// Animate flicker effect
setInterval(() => {
  torch.setIntensity(0.8 + Math.random() * 0.4);
}, 100);
```

### Room Lighting

```javascript
// Multiple point lights for a room
const lights = [
  { x: -10, y: 8, z: -10 },
  { x: 10, y: 8, z: -10 },
  { x: -10, y: 8, z: 10 },
  { x: 10, y: 8, z: 10 },
].map(
  (pos) =>
    new PointLight({
      position: pos,
      intensity: 0.5,
      distance: 30,
      decay: 2,
      color: 0xffeedd,
    })
);
```

### Interactive Light Switch

```javascript
const roomLight = new PointLight({
  color: 0xffffff,
  intensity: 0,
  position: { x: 0, y: 8, z: 0 },
  distance: 50,
});

// Turn on
roomLight.on(500); // 500ms fade in

// Turn off
roomLight.off(500); // 500ms fade out
```

## Technical Details

- Wraps THREE.js `PointLight`
- Shadow casting enabled when scene shadows are enabled
- Higher default mapSize (2048) than SunLight for better point shadow quality
- Includes PointLightHelper and CameraHelper for debugging

## Distance and Decay

| Decay | Effect                              |
| ----- | ----------------------------------- |
| 0     | No falloff (constant intensity)     |
| 1     | Linear falloff                      |
| 2     | Physically correct (inverse square) |

## Performance Tips

- Use `distance` to limit light range
- Fewer point lights with shadows = better performance
- Lower `mapSize` for distant or less important lights
- Consider using `decay: 0` for stylized graphics

## See Also

- [AmbientLight](/engine/advanced/lights/ambientlight.md) - For uniform illumination
- [SunLight](/engine/advanced/lights/sunlight.md) - For directional lighting
- [HemisphereLight](/engine/advanced/lights/hemispherelight.md) - For sky/ground simulation
