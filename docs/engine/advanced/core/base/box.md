# Box

The `Box` class creates a rectangular box mesh with independent width, height, and depth dimensions.

## Import

```javascript
import { Box } from "mage-engine";
```

## Constructor

```javascript
new Box(width, height, depth, color, options);
```

### Parameters

| Parameter | Type            | Default | Description                      |
| --------- | --------------- | ------- | -------------------------------- |
| `width`   | `number`        | `10`    | Width of the box (X-axis)        |
| `height`  | `number`        | `10`    | Height of the box (Y-axis)       |
| `depth`   | `number`        | `10`    | Depth of the box (Z-axis)        |
| `color`   | `number/string` | -       | The color of the box             |
| `options` | `Object`        | `{}`    | Additional material/mesh options |

## Properties

| Property | Type            | Description          |
| -------- | --------------- | -------------------- |
| `width`  | `number`        | Width dimension      |
| `height` | `number`        | Height dimension     |
| `depth`  | `number`        | Depth dimension      |
| `color`  | `number/string` | The color of the box |

## Examples

### Basic Box

```javascript
import { Box } from "mage-engine";

// Create a default box (10x10x10)
const box = new Box();
```

### Custom Dimensions

```javascript
// Create a flat platform
const platform = new Box(100, 5, 100);

// Create a tall pillar
const pillar = new Box(5, 50, 5);
```

### Colored Box

```javascript
// Create a blue box
const box = new Box(20, 10, 5, 0x0000ff);
```

### Box with Options

```javascript
// Create a wireframe box
const box = new Box(20, 10, 5, 0x00ff00, { wireframe: true });
```

## Methods

The Box inherits all methods from the [Element](/engine/advanced/core/element.md) class, including:

- `setPosition(x, y, z)` - Set the box's position
- `setRotation(x, y, z)` - Set the box's rotation
- `setScale(x, y, z)` - Set the box's scale
- `setColor(color)` - Change the box's color
- `setOpacity(value)` - Set transparency (0-1)
- `enablePhysics(options)` - Add physics to the box

## Serialization

```javascript
// Serialize to JSON
const json = box.toJSON();

// Create from serialized data
const restoredBox = Box.fromJSON(json);
```

## See Also

- [Cube](/engine/advanced/core/base/cube.md) - For uniform cubes
- [Element](/engine/advanced/core/element.md) - Base class documentation
