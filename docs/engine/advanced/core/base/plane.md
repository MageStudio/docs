# Plane

The `Plane` class creates a flat 2D surface in 3D space, useful for floors, walls, and billboards.

## Import

```javascript
import { Plane } from "mage-engine";
```

## Constructor

```javascript
new Plane(height, width, color, options);
```

### Parameters

| Parameter | Type            | Default    | Description            |
| --------- | --------------- | ---------- | ---------------------- |
| `height`  | `number`        | _required_ | Height of the plane    |
| `width`   | `number`        | _required_ | Width of the plane     |
| `color`   | `number/string` | -          | The color of the plane |
| `options` | `Object`        | `{}`       | Additional options     |

### Options

| Option        | Type      | Default | Description         |
| ------------- | --------- | ------- | ------------------- |
| `transparent` | `boolean` | `false` | Enable transparency |
| `opacity`     | `number`  | `1`     | Opacity level (0-1) |

## Properties

| Property | Type            | Description            |
| -------- | --------------- | ---------------------- |
| `height` | `number`        | Height of the plane    |
| `width`  | `number`        | Width of the plane     |
| `color`  | `number/string` | The color of the plane |

## Static Properties

| Property     | Value               | Description                    |
| ------------ | ------------------- | ------------------------------ |
| `Plane.UP`   | `Vector3(0, 1, 0)`  | Direction vector pointing up   |
| `Plane.DOWN` | `Vector3(0, -1, 0)` | Direction vector pointing down |

## Technical Details

- Uses `DoubleSide` material, making the plane visible from both sides
- Based on THREE.js `PlaneGeometry`

## Examples

### Basic Plane

```javascript
import { Plane } from "mage-engine";

// Create a floor
const floor = new Plane(100, 100);
```

### Colored Plane

```javascript
// Create a green floor
const floor = new Plane(100, 100, 0x00ff00);
```

### Transparent Plane

```javascript
// Create a semi-transparent plane
const glass = new Plane(50, 50, 0x88ccff, {
  transparent: true,
  opacity: 0.5,
});
```

### Facing a Direction

```javascript
// Create a floor that faces upward
const floor = new Plane(100, 100, 0x888888);
floor.face(Plane.UP);

// Create a wall
const wall = new Plane(50, 30, 0xcccccc);
// Default orientation faces the camera
```

## Methods

### `face(direction)`

Rotates the plane to face a specific direction.

```javascript
// Face upward (floor)
plane.face(Plane.UP);

// Face downward (ceiling)
plane.face(Plane.DOWN);

// Custom direction
plane.face(new Vector3(1, 0, 0));
```

### Inherited Methods

The Plane inherits all methods from the [Element](/engine/advanced/core/element.md) class:

- `setPosition(x, y, z)` - Set the plane's position
- `setRotation(x, y, z)` - Set the plane's rotation
- `setScale(x, y, z)` - Set the plane's scale
- `setColor(color)` - Change the plane's color
- `setOpacity(value)` - Set transparency (0-1)
- `enablePhysics(options)` - Add physics to the plane

## Serialization

```javascript
// Serialize to JSON
const json = plane.toJSON();

// Create from serialized data
const restoredPlane = Plane.fromJSON(json);
```

## See Also

- [Grid](/engine/advanced/core/base/grid.md) - For visible grid helpers
- [Element](/engine/advanced/core/element.md) - Base class documentation
