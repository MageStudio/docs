# Cylinder

The `Cylinder` class creates a cylindrical mesh with configurable top and bottom radii, allowing for cones and tapered shapes.

## Import

```javascript
import { Cylinder } from "mage-engine";
```

## Constructor

```javascript
new Cylinder(radiusTop, radiusBottom, height, color, options);
```

### Parameters

| Parameter      | Type            | Default | Description                          |
| -------------- | --------------- | ------- | ------------------------------------ |
| `radiusTop`    | `number`        | `10`    | Radius at the top of the cylinder    |
| `radiusBottom` | `number`        | `10`    | Radius at the bottom of the cylinder |
| `height`       | `number`        | `10`    | Height of the cylinder               |
| `color`        | `number/string` | -       | The color of the cylinder            |
| `options`      | `Object`        | `{}`    | Additional material/mesh options     |

## Properties

| Property       | Type            | Description               |
| -------------- | --------------- | ------------------------- |
| `radiusTop`    | `number`        | Top radius                |
| `radiusBottom` | `number`        | Bottom radius             |
| `height`       | `number`        | Height of the cylinder    |
| `color`        | `number/string` | The color of the cylinder |

## Technical Details

- Uses 32 radial segments for a smooth appearance
- Based on THREE.js `CylinderGeometry`

## Examples

### Basic Cylinder

```javascript
import { Cylinder } from "mage-engine";

// Create a default cylinder (radius 10, height 10)
const cylinder = new Cylinder();
```

### Uniform Cylinder

```javascript
// Create a tall pipe
const pipe = new Cylinder(5, 5, 30);
```

### Cone Shape

```javascript
// Create a cone (top radius = 0)
const cone = new Cylinder(0, 10, 20);
```

### Tapered Cylinder

```javascript
// Create a tapered shape
const tapered = new Cylinder(5, 15, 25);
```

### Colored Cylinder

```javascript
// Create a red cylinder
const cylinder = new Cylinder(10, 10, 30, 0xff0000);
```

### Cylinder with Options

```javascript
// Create a wireframe cylinder
const cylinder = new Cylinder(10, 10, 30, 0x00ff00, { wireframe: true });
```

## Methods

The Cylinder inherits all methods from the [Element](/engine/advanced/core/element.md) class, including:

- `setPosition(x, y, z)` - Set the cylinder's position
- `setRotation(x, y, z)` - Set the cylinder's rotation
- `setScale(x, y, z)` - Set the cylinder's scale
- `setColor(color)` - Change the cylinder's color
- `setOpacity(value)` - Set transparency (0-1)
- `enablePhysics(options)` - Add physics to the cylinder

## Serialization

```javascript
// Serialize to JSON
const json = cylinder.toJSON();

// Create from serialized data
const restoredCylinder = Cylinder.fromJSON(json);
```

## See Also

- [Sphere](/engine/advanced/core/base/sphere.md) - For spherical shapes
- [Element](/engine/advanced/core/element.md) - Base class documentation
