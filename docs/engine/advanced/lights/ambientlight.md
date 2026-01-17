# AmbientLight

The `AmbientLight` class provides uniform illumination to all objects in the scene regardless of their position or orientation. This light has no direction and does not cast shadows.

## Import

```javascript
import { AmbientLight } from "mage-engine";
```

## Constructor

```javascript
new AmbientLight(options);
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

## Examples

### Basic AmbientLight

```javascript
import { AmbientLight } from "mage-engine";

// Create a default ambient light
const ambient = new AmbientLight();
```

### Custom Intensity

```javascript
// Brighter ambient light
const ambient = new AmbientLight({
  intensity: 0.8,
});
```

### Colored Light

```javascript
// Warm ambient light
const ambient = new AmbientLight({
  color: 0xffffcc,
  intensity: 0.6,
});
```

### Named Light

```javascript
// Named ambient light for reference
const ambient = new AmbientLight({
  color: 0xffffff,
  intensity: 0.5,
  name: "MainAmbient",
});
```

## Methods

### Inherited from Light Base Class

| Method                          | Description                    |
| ------------------------------- | ------------------------------ |
| `setIntensity(value)`           | Sets light intensity           |
| `getIntensity()`                | Returns current intensity      |
| `setColor(color)`               | Sets light color               |
| `getColor()`                    | Returns current color          |
| `setPosition(position)`         | Sets light position            |
| `getPosition()`                 | Returns position as Vector3    |
| `animateIntensity(value, time)` | Tweens intensity over time     |
| `on(time)`                      | Turns light on with animation  |
| `off(time)`                     | Turns light off with animation |

## Use Cases

### Base Scene Illumination

```javascript
// Provide base lighting so objects aren't completely dark
const ambient = new AmbientLight({
  color: 0xffffff,
  intensity: 0.3,
});
```

### Simulating Indirect Light

```javascript
// Soften shadows by adding ambient light
const ambient = new AmbientLight({
  color: 0x404060, // Slight blue tint
  intensity: 0.4,
});
```

### Day/Night Cycle

```javascript
// Adjust ambient light for time of day
const ambient = new AmbientLight({ intensity: 0.5 });

// Transition to night
ambient.animateIntensity(0.1, 2000);

// Transition to day
ambient.animateIntensity(0.5, 2000);
```

## Technical Details

- Does not cast shadows
- Affects all objects equally
- Wraps THREE.js `AmbientLight`
- Automatically added to scene on creation

## See Also

- [HemisphereLight](/engine/advanced/lights/hemispherelight.md) - For sky/ground ambient simulation
- [SunLight](/engine/advanced/lights/sunlight.md) - For directional lighting
- [PointLight](/engine/advanced/lights/pointlight.md) - For point source lighting
