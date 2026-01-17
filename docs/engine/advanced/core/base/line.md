# Line

The `Line` class creates a line connecting multiple points in 3D space.

## Import

```javascript
import { Line } from "mage-engine";
```

## Constructor

```javascript
new Line(points, options);
```

### Parameters

| Parameter | Type     | Default | Description                        |
| --------- | -------- | ------- | ---------------------------------- |
| `points`  | `Array`  | `[]`    | Array of point objects `{x, y, z}` |
| `options` | `Object` | `{}`    | Line options                       |

### Options

| Option      | Type      | Default    | Description                 |
| ----------- | --------- | ---------- | --------------------------- |
| `color`     | `number`  | `0xffffff` | Line color                  |
| `dashed`    | `boolean` | `false`    | Creates dashed line if true |
| `thickness` | `number`  | `2`        | Line width                  |

## Properties

| Property   | Type    | Description                       |
| ---------- | ------- | --------------------------------- |
| `vertices` | `Array` | Array of points defining the line |

## Examples

### Basic Line

```javascript
import { Line } from "mage-engine";

// Create a simple line
const line = new Line([
  { x: 0, y: 0, z: 0 },
  { x: 10, y: 10, z: 0 },
  { x: 20, y: 0, z: 0 },
]);
```

### Colored Line

```javascript
// Create a red line
const line = new Line(
  [
    { x: 0, y: 0, z: 0 },
    { x: 50, y: 0, z: 0 },
  ],
  { color: 0xff0000 }
);
```

### Dashed Line

```javascript
// Create a dashed line
const line = new Line(
  [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 50, z: 0 },
  ],
  { dashed: true, color: 0x00ff00 }
);
```

### Thick Line

```javascript
// Create a thick line
const line = new Line(points, { thickness: 5 });
```

### Complex Path

```javascript
// Create a path with multiple segments
const path = new Line(
  [
    { x: 0, y: 0, z: 0 },
    { x: 10, y: 5, z: 0 },
    { x: 20, y: 0, z: 5 },
    { x: 30, y: 10, z: 10 },
    { x: 40, y: 0, z: 5 },
  ],
  { color: 0xffaa00, thickness: 3 }
);
```

## Methods

### `setVertices(vertices)`

Updates the line's vertices dynamically.

```javascript
// Update the line path
line.setVertices([
  { x: 0, y: 0, z: 0 },
  { x: 100, y: 100, z: 0 },
]);
```

### `setThickness(value)`

Sets the line width.

```javascript
line.setThickness(4);
```

### `computeLineDistances()`

Computes line distances (required for dashed lines).

```javascript
line.computeLineDistances();
```

### Inherited Methods

The Line inherits methods from the [Element](/engine/advanced/core/element.md) class:

- `setPosition(x, y, z)` - Set the line's position
- `setRotation(x, y, z)` - Set the line's rotation
- `setScale(x, y, z)` - Set the line's scale
- `setColor(color)` - Change the line's color

## Serialization

```javascript
// Serialize to JSON
const json = line.toJSON();

// Create from serialized data
const restoredLine = Line.fromJSON(json);
```

## See Also

- [CurvedLine](/engine/advanced/core/base/curvedline.md) - For smooth curved lines
- [Element](/engine/advanced/core/element.md) - Base class documentation
