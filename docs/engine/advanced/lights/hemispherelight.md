# HemisphereLight

The `HemisphereLight` class creates a light that illuminates the scene from above with a sky color and from below with a ground color. It's useful for outdoor scenes to simulate ambient light from the sky and ground reflections.

## Import

```javascript
import { HemisphereLight } from "mage-engine";
```

## Constructor

```javascript
new HemisphereLight(options);
```

### Parameters

| Parameter | Type     | Default | Description          |
| --------- | -------- | ------- | -------------------- |
| `options` | `Object` | `{}`    | Configuration object |

### Options

| Option         | Type     | Default        | Description                     |
| -------------- | -------- | -------------- | ------------------------------- |
| `color`        | `Object` | -              | Sky and ground colors           |
| `color.sky`    | `number` | `0xffffff`     | Sky color (light from above)    |
| `color.ground` | `number` | `0x555555`     | Ground color (light from below) |
| `intensity`    | `number` | `0.5`          | Light intensity                 |
| `name`         | `string` | Auto-generated | Unique name for the light       |

## Examples

### Basic HemisphereLight

```javascript
import { HemisphereLight } from "mage-engine";

// Create a default hemisphere light
const hemisphere = new HemisphereLight();
```

### Custom Sky and Ground Colors

```javascript
// Blue sky, brown ground
const hemisphere = new HemisphereLight({
  color: {
    sky: 0x87ceeb, // Sky blue
    ground: 0x8b4513, // Saddle brown
  },
  intensity: 0.6,
});
```

### Outdoor Scene

```javascript
// Natural outdoor lighting
const outdoor = new HemisphereLight({
  color: {
    sky: 0xaaccff, // Light blue sky
    ground: 0x44aa44, // Green grass reflection
  },
  intensity: 0.7,
});
```

### Indoor Scene

```javascript
// Subtle indoor ambient
const indoor = new HemisphereLight({
  color: {
    sky: 0xffeedd, // Warm ceiling light
    ground: 0x444444, // Dark floor
  },
  intensity: 0.3,
});
```

## Methods

### Color Methods

| Method            | Description                          |
| ----------------- | ------------------------------------ |
| `setColor(color)` | Sets both sky and ground colors      |
| `getColor()`      | Returns `{sky, ground}` color object |

### Inherited Methods

| Method                          | Description                    |
| ------------------------------- | ------------------------------ |
| `setIntensity(value)`           | Sets light intensity           |
| `getIntensity()`                | Returns current intensity      |
| `setPosition(position)`         | Sets light position            |
| `getPosition()`                 | Returns position               |
| `animateIntensity(value, time)` | Tweens intensity               |
| `on(time)`                      | Turns light on with animation  |
| `off(time)`                     | Turns light off with animation |

## Examples

### Changing Colors

```javascript
const hemisphere = new HemisphereLight();

// Change to sunset colors
hemisphere.setColor({
  sky: 0xff6644,
  ground: 0x442211,
});
```

### Day/Night Transition

```javascript
const hemisphere = new HemisphereLight({
  color: {
    sky: 0x87ceeb,
    ground: 0x44aa44,
  },
  intensity: 0.7,
});

// Transition to night
hemisphere.setColor({
  sky: 0x111133,
  ground: 0x111111,
});
hemisphere.animateIntensity(0.2, 3000);
```

## Use Cases

### Outdoor Environment

```javascript
// Realistic outdoor lighting setup
const hemisphere = new HemisphereLight({
  color: {
    sky: 0xaaddff,
    ground: 0x446644,
  },
  intensity: 0.5,
});

// Combine with sun for full outdoor lighting
const sun = new SunLight({
  intensity: 1.0,
  position: { x: 50, y: 100, z: 50 },
});
```

### Forest Scene

```javascript
// Green-tinted forest lighting
const forest = new HemisphereLight({
  color: {
    sky: 0x88aa88, // Filtered green light
    ground: 0x224422, // Dark forest floor
  },
  intensity: 0.4,
});
```

### Underwater Scene

```javascript
// Blue underwater lighting
const underwater = new HemisphereLight({
  color: {
    sky: 0x0066aa, // Light from above
    ground: 0x001133, // Deep water below
  },
  intensity: 0.3,
});
```

## Technical Details

- Does not cast shadows
- Wraps THREE.js `HemisphereLight`
- Two-color system simulates light from sky and ground reflections
- Includes HemisphereLightHelper for debugging (green color)

## See Also

- [AmbientLight](/engine/advanced/lights/ambientlight.md) - For uniform illumination
- [SunLight](/engine/advanced/lights/sunlight.md) - For directional lighting
- [PointLight](/engine/advanced/lights/pointlight.md) - For point source lighting
