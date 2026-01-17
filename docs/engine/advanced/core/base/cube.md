# Cube

The `Cube` class creates a uniform cube mesh where all sides have the same size.

## Import

```javascript
import { Cube } from "mage-engine";
```

## Constructor

```javascript
new Cube(size, color, options);
```

### Parameters

| Parameter | Type            | Default | Description                              |
| --------- | --------------- | ------- | ---------------------------------------- |
| `size`    | `number`        | `10`    | The size of all sides of the cube        |
| `color`   | `number/string` | -       | The color of the cube (hex or CSS color) |
| `options` | `Object`        | `{}`    | Additional material/mesh options         |

## Properties

| Property | Type            | Description           |
| -------- | --------------- | --------------------- |
| `size`   | `number`        | The size of the cube  |
| `color`  | `number/string` | The color of the cube |

## Examples

### Basic Cube

```javascript
import { Cube } from "mage-engine";

// Create a default cube (size 10)
const cube = new Cube();
```

### Cube with Custom Size

```javascript
// Create a larger cube
const cube = new Cube(20);
```

### Colored Cube

```javascript
// Create a red cube
const cube = new Cube(15, 0xff0000);
```

### Cube with Options

```javascript
// Create a wireframe cube
const cube = new Cube(15, 0x00ff00, { wireframe: true });
```

## Methods

The Cube inherits all methods from the [Element](/engine/advanced/core/element.md) class, including:

- `setPosition(x, y, z)` - Set the cube's position
- `setRotation(x, y, z)` - Set the cube's rotation
- `setScale(x, y, z)` - Set the cube's scale
- `setColor(color)` - Change the cube's color
- `setOpacity(value)` - Set transparency (0-1)
- `enablePhysics(options)` - Add physics to the cube

## Serialization

```javascript
// Serialize to JSON
const json = cube.toJSON();

// Create from serialized data
const restoredCube = Cube.fromJSON(json);
```

## See Also

- [Box](/engine/advanced/core/base/box.md) - For non-uniform boxes
- [Element](/engine/advanced/core/element.md) - Base class documentation
