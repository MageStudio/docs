# SunLight

The `SunLight` class creates a directional light that simulates sunlight. It emits parallel rays in a specific direction and supports shadow casting with configurable shadow maps.

## Import

```javascript
import { SunLight } from "mage-engine";
```

## Constructor

```javascript
new SunLight(options);
```

### Parameters

| Parameter | Type     | Default | Description          |
| --------- | -------- | ------- | -------------------- |
| `options` | `Object` | `{}`    | Configuration object |

### Options

| Option      | Type     | Default        | Description                     |
| ----------- | -------- | -------------- | ------------------------------- |
| `color`     | `number` | `0xffffff`     | Light color (hex)               |
| `intensity` | `number` | `0.5`          | Light intensity                 |
| `name`      | `string` | Auto-generated | Unique name for the light       |
| `position`  | `Object` | -              | Initial position `{x, y, z}`    |
| `near`      | `number` | `0.1`          | Shadow camera near plane        |
| `far`       | `number` | `100`          | Shadow camera far plane         |
| `fov`       | `number` | `75`           | Shadow camera field of view     |
| `mapSize`   | `number` | `512`          | Shadow map resolution           |
| `bias`      | `number` | `-0.0001`      | Shadow bias to reduce artifacts |

## Examples

### Basic SunLight

```javascript
import { SunLight } from "mage-engine";

// Create a default sun light
const sun = new SunLight();
```

### Positioned Sun

```javascript
// Sun light from above and to the side
const sun = new SunLight({
  position: { x: 10, y: 20, z: 10 },
  intensity: 1.0,
});
```

### High Quality Shadows

```javascript
// Sun with high-resolution shadows
const sun = new SunLight({
  color: 0xffffff,
  intensity: 1.0,
  position: { x: 50, y: 100, z: 50 },
  mapSize: 2048,
  near: 0.5,
  far: 200,
  fov: 90,
  bias: -0.0005,
});
```

### Warm Sunset Light

```javascript
// Orange sunset light
const sunset = new SunLight({
  color: 0xff8844,
  intensity: 0.8,
  position: { x: -100, y: 20, z: 0 },
});
```

## Methods

### Target Methods

| Method              | Description                         |
| ------------------- | ----------------------------------- |
| `setTarget(target)` | Sets the light's target (direction) |
| `getTarget()`       | Returns the current target          |

### Shadow Methods

| Method                        | Description                        |
| ----------------------------- | ---------------------------------- |
| `setShadow(options)`          | Configures shadow settings         |
| `setShadowNearFar(near, far)` | Sets shadow camera clipping planes |
| `setShadowFov(fov)`           | Sets shadow camera field of view   |
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

### Setting Target

```javascript
const sun = new SunLight({ position: { x: 50, y: 100, z: 50 } });

// Point light at specific location
sun.setTarget({ x: 0, y: 0, z: 0 });
```

### Configuring Shadows

```javascript
const sun = new SunLight();

// Enable shadows
sun.setCastShadow(true);

// Configure shadow quality
sun.setShadowMapSize(2048);
sun.setShadowNearFar(1, 500);
sun.setShadowBias(-0.001);
```

### Day/Night Cycle

```javascript
const sun = new SunLight({
  color: 0xffffff,
  intensity: 1.0,
  position: { x: 0, y: 100, z: 0 },
});

// Animate to sunset
sun.setColor(0xff6644);
sun.animateIntensity(0.3, 5000);
sun.setPosition({ x: -100, y: 10, z: 0 });
```

## Technical Details

- Wraps THREE.js `DirectionalLight`
- Automatically creates and manages a target object
- Shadow casting enabled when scene shadows are enabled
- Includes DirectionalLightHelper and CameraHelper for debugging

## Shadow Quality Tips

| Map Size | Quality   | Performance |
| -------- | --------- | ----------- |
| 512      | Low       | Fast        |
| 1024     | Medium    | Good        |
| 2048     | High      | Slower      |
| 4096     | Very High | Slowest     |

## See Also

- [AmbientLight](/engine/advanced/lights/ambientlight.md) - For uniform illumination
- [HemisphereLight](/engine/advanced/lights/hemispherelight.md) - For sky/ground simulation
- [PointLight](/engine/advanced/lights/pointlight.md) - For point source lighting
