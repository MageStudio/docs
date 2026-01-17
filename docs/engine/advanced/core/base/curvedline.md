# CurvedLine

The `CurvedLine` class creates a smooth curved line through control points using Catmull-Rom spline interpolation.

## Import

```javascript
import { CurvedLine } from "mage-engine";
```

## Constructor

```javascript
new CurvedLine(points, options);
```

### Parameters

| Parameter | Type     | Default | Description                         |
| --------- | -------- | ------- | ----------------------------------- |
| `points`  | `Array`  | `[]`    | Array of control points `{x, y, z}` |
| `options` | `Object` | `{}`    | Curve options                       |

### Options

| Option      | Type      | Default    | Description                            |
| ----------- | --------- | ---------- | -------------------------------------- |
| `divisions` | `number`  | `20`       | Number of curve divisions (smoothness) |
| `color`     | `number`  | `0xffffff` | Line color                             |
| `dashed`    | `boolean` | `false`    | Creates dashed line if true            |
| `thickness` | `number`  | `2`        | Line width                             |

## Properties

| Property | Type    | Description                                      |
| -------- | ------- | ------------------------------------------------ |
| `points` | `Array` | The generated curve points (after interpolation) |

## Technical Details

- Extends the [Line](/engine/advanced/core/base/line.md) class
- Uses Catmull-Rom spline interpolation for smooth curves
- Higher `divisions` value = smoother curve (more segments)

## Examples

### Basic Curve

```javascript
import { CurvedLine } from "mage-engine";

// Create a smooth curve through control points
const curve = new CurvedLine([
  { x: 0, y: 0, z: 0 },
  { x: 10, y: 20, z: 0 },
  { x: 20, y: 5, z: 0 },
  { x: 30, y: 15, z: 0 },
]);
```

### High Resolution Curve

```javascript
// Create a smoother curve with more divisions
const curve = new CurvedLine(
  [
    { x: 0, y: 0, z: 0 },
    { x: 25, y: 30, z: 10 },
    { x: 50, y: 10, z: 20 },
    { x: 75, y: 25, z: 5 },
  ],
  { divisions: 50 }
);
```

### Colored Curve

```javascript
// Create a colored curve
const curve = new CurvedLine(points, {
  color: 0xff0000,
  divisions: 30,
});
```

### Dashed Curve

```javascript
// Create a dashed curved line
const curve = new CurvedLine(points, {
  dashed: true,
  color: 0x00ff00,
});
```

### 3D Helix

```javascript
// Create a 3D helical path
const helixPoints = [];
for (let i = 0; i < 10; i++) {
  helixPoints.push({
    x: Math.cos(i * 0.5) * 10,
    y: i * 5,
    z: Math.sin(i * 0.5) * 10,
  });
}
const helix = new CurvedLine(helixPoints, {
  divisions: 100,
  color: 0xffaa00,
});
```

## Methods

### Inherited from Line

- `setVertices(vertices)` - Update the curve's points
- `setThickness(value)` - Set line width
- `computeLineDistances()` - Required for dashed lines

### Inherited from Element

- `setPosition(x, y, z)` - Set the curve's position
- `setRotation(x, y, z)` - Set the curve's rotation
- `setScale(x, y, z)` - Set the curve's scale
- `setColor(color)` - Change the curve's color

## Serialization

```javascript
// Serialize to JSON
const json = curve.toJSON();

// Create from serialized data
const restoredCurve = CurvedLine.fromJSON(json);
```

## See Also

- [Line](/engine/advanced/core/base/line.md) - For straight line segments
- [Element](/engine/advanced/core/element.md) - Base class documentation
