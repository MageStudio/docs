# Grid

The `Grid` class creates a visual grid helper for development and debugging purposes.

## Import

```javascript
import { Grid } from "mage-engine";
```

## Constructor

```javascript
new Grid(size, divisions, color, secondaryColor);
```

### Parameters

| Parameter        | Type            | Default    | Description            |
| ---------------- | --------------- | ---------- | ---------------------- |
| `size`           | `number`        | _required_ | Total size of the grid |
| `divisions`      | `number`        | _required_ | Number of divisions    |
| `color`          | `number/string` | -          | Primary grid color     |
| `secondaryColor` | `number/string` | -          | Secondary grid color   |

## Technical Details

- Uses THREE.js `GridHelper`
- Creates a grid on the XZ plane (horizontal)
- Useful for debugging and development visualization

## Examples

### Basic Grid

```javascript
import { Grid } from "mage-engine";

// Create a 100x100 grid with 10 divisions
const grid = new Grid(100, 10);
```

### Custom Colors

```javascript
// Create a grid with custom colors
const grid = new Grid(100, 10, 0x444444, 0x888888);
```

### Large Detailed Grid

```javascript
// Create a large grid with many divisions
const grid = new Grid(500, 50, 0x222222, 0x555555);
```

### Small Debug Grid

```javascript
// Create a small grid for close-up work
const grid = new Grid(20, 20, 0x333333, 0x666666);
```

## Methods

### Inherited Methods

The Grid inherits methods from the [Element](/engine/advanced/core/element.md) class:

- `setPosition(x, y, z)` - Set the grid's position
- `setRotation(x, y, z)` - Set the grid's rotation
- `setScale(x, y, z)` - Set the grid's scale
- `setOpacity(value)` - Set transparency

## Use Cases

### Development Floor

```javascript
// Add a grid to help visualize the scene during development
const devGrid = new Grid(1000, 100, 0x333333, 0x444444);
devGrid.setPosition(0, 0, 0);
```

### Level Editor

```javascript
// Create a snap-to-grid reference
const editorGrid = new Grid(100, 10, 0x0066ff, 0x003388);
```

## See Also

- [Plane](/engine/advanced/core/base/plane.md) - For solid surfaces
- [Element](/engine/advanced/core/element.md) - Base class documentation
