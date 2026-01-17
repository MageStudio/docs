# Sphere

The `Sphere` class creates a spherical mesh with a specified radius.

## Import

```javascript
import { Sphere } from "mage-engine";
```

## Constructor

```javascript
new Sphere(radius, color, options);
```

### Parameters

| Parameter | Type            | Default | Description                      |
| --------- | --------------- | ------- | -------------------------------- |
| `radius`  | `number`        | `10`    | The radius of the sphere         |
| `color`   | `number/string` | -       | The color of the sphere          |
| `options` | `Object`        | `{}`    | Additional material/mesh options |

## Properties

| Property | Type            | Description              |
| -------- | --------------- | ------------------------ |
| `radius` | `number`        | The radius of the sphere |
| `color`  | `number/string` | The color of the sphere  |

## Technical Details

- Uses 32 segments for both width and height, providing a smooth appearance
- Based on THREE.js `SphereGeometry`

## Examples

### Basic Sphere

```javascript
import { Sphere } from "mage-engine";

// Create a default sphere (radius 10)
const sphere = new Sphere();
```

### Custom Radius

```javascript
// Create a larger sphere
const sphere = new Sphere(25);
```

### Colored Sphere

```javascript
// Create a red sphere
const sphere = new Sphere(15, 0xff0000);
```

### Sphere with Options

```javascript
// Create a wireframe sphere
const sphere = new Sphere(20, 0x00ff00, { wireframe: true });
```

## Methods

The Sphere inherits all methods from the [Element](/engine/advanced/core/element.md) class, including:

- `setPosition(x, y, z)` - Set the sphere's position
- `setRotation(x, y, z)` - Set the sphere's rotation
- `setScale(x, y, z)` - Set the sphere's scale
- `setColor(color)` - Change the sphere's color
- `setOpacity(value)` - Set transparency (0-1)
- `enablePhysics(options)` - Add physics to the sphere

## Serialization

```javascript
// Serialize to JSON
const json = sphere.toJSON();

// Create from serialized data
const restoredSphere = Sphere.fromJSON(json);
```

## See Also

- [Cylinder](/engine/advanced/core/base/cylinder.md) - For cylindrical shapes
- [Element](/engine/advanced/core/element.md) - Base class documentation
