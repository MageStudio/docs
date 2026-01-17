# Math Utilities

The Math utilities module provides essential mathematical functions for 3D game development, including vector operations, interpolation, random number generation, and smooth damping.

## Import

```javascript
import {
  degToRad,
  radToDeg,
  clamp,
  getDistance,
  lerpVectors,
  lerp,
  randomVector3,
  randomVector2,
  randomInRange,
  randomIntInRange,
  smoothDamp,
  smoothDampAngle,
} from "mage-engine";
```

## Constants

| Constant  | Value         | Description            |
| --------- | ------------- | ---------------------- |
| `PI`      | `Math.PI`     | Pi constant (~3.14159) |
| `HALF_PI` | `Math.PI / 2` | Half of Pi (~1.5708)   |

## Basic Functions

### `degToRad(degrees)`

Converts degrees to radians.

```javascript
const radians = degToRad(90); // 1.5708
const fullCircle = degToRad(360); // 6.2832
```

### `radToDeg(radians)`

Converts radians to degrees.

```javascript
const degrees = radToDeg(Math.PI); // 180
const quarter = radToDeg(Math.PI / 2); // 90
```

### `proportional(a1, a2, b1, value)`

Calculate proportional value: `(b1 * value) / a1`.

```javascript
// Map 50 from range 0-100 to range 0-200
const result = proportional(100, 200, 200, 50); // 100
```

## Clamping & Range Functions

### `clamp(value, min, max)`

Clamps a value between min and max.

```javascript
clamp(150, 0, 100); // 100
clamp(-50, 0, 100); // 0
clamp(50, 0, 100); // 50
```

### `cap(value, max)`

Caps a value at maximum (no minimum).

```javascript
cap(150, 100); // 100
cap(50, 100); // 50
```

### `isInRange(value, min, max)`

Check if value is within range [min, max).

```javascript
isInRange(5, 0, 10); // true
isInRange(10, 0, 10); // false (exclusive max)
isInRange(-1, 0, 10); // false
```

### `repeat(value, length)`

Repeats value within given length.

```javascript
repeat(5, 3); // 2
repeat(7.5, 3); // 1.5
```

## Random Number Generation

### `randomInRange(min, max)`

Random float between min and max (inclusive).

```javascript
const speed = randomInRange(5, 10); // e.g., 7.342
```

### `randomIntInRange(min, max)`

Random integer between min and max (inclusive).

```javascript
const damage = randomIntInRange(10, 20); // e.g., 15
```

### `randomVector3(min, max)`

Random THREE.Vector3 with values in range.

```javascript
const position = randomVector3(-100, 100);
// { x: 23.5, y: -67.2, z: 45.1 }
```

### `randomVector2(min, max)`

Random THREE.Vector2 with values in range.

```javascript
const uv = randomVector2(0, 1);
// { x: 0.34, y: 0.78 }
```

### `pickRandom(array)`

Returns a random element from an array.

```javascript
const colors = [0xff0000, 0x00ff00, 0x0000ff];
const color = pickRandom(colors); // e.g., 0x00ff00
```

## Vector & Distance Operations

### `getDistance(pointA, pointB)`

Calculate 3D Euclidean distance between two points.

```javascript
const dist = getDistance({ x: 0, y: 0, z: 0 }, { x: 10, y: 10, z: 10 }); // ~17.32
```

### `lerpVectors(origin, target, alpha)`

Linear interpolation between two vectors.

```javascript
const mid = lerpVectors({ x: 0, y: 0, z: 0 }, { x: 10, y: 10, z: 10 }, 0.5); // { x: 5, y: 5, z: 5 }
```

### `lerp(start, end, alpha)`

Linear interpolation between two numbers.

```javascript
lerp(0, 100, 0.5); // 50
lerp(0, 100, 0.25); // 25
```

### `getPointFromCenterAtDistance(center, end, distance)`

Find point at specified distance from center toward end.

```javascript
const point = getPointFromCenterAtDistance(
  { x: 0, y: 0, z: 0 },
  { x: 10, y: 0, z: 0 },
  5
); // { x: 5, y: 0, z: 0 }
```

### `multiplyScalar(vector, scalar)`

Multiply vector by scalar.

```javascript
const scaled = multiplyScalar({ x: 1, y: 2, z: 3 }, 2);
// { x: 2, y: 4, z: 6 }
```

### `getSphereVolume(radius)`

Calculate sphere volume.

```javascript
const volume = getSphereVolume(5); // ~523.6
```

## Smooth Damping Functions

### `smoothDamp(current, target, velocity, smoothTime, maxSpeed, deltaTime)`

Smoothly damp a value toward target. Returns `[newPosition, newVelocity]`.

```javascript
let position = 0;
let velocity = 0;

// In update loop
const [newPos, newVel] = smoothDamp(
  position, // current
  100, // target
  velocity, // current velocity
  0.3, // smooth time
  Infinity, // max speed
  deltaTime // time since last frame
);

position = newPos;
velocity = newVel;
```

### `smoothDampAngle(current, target, velocity, smoothTime, maxSpeed, deltaTime)`

Smoothly damp an angle toward target (handles wrapping).

```javascript
let rotation = 0;
let rotVelocity = 0;

// Smoothly rotate to 270 degrees (handles 360 wrap)
const [newRot, newVel] = smoothDampAngle(
  rotation,
  degToRad(270),
  rotVelocity,
  0.3,
  Infinity,
  deltaTime
);
```

### `deltaAngle(current, target)`

Calculate shortest difference between two angles.

```javascript
// Returns shortest path between angles
deltaAngle(degToRad(350), degToRad(10)); // ~20 degrees (not 340)
```

## Complete Example

```javascript
import {
  degToRad,
  clamp,
  getDistance,
  lerpVectors,
  randomVector3,
  smoothDamp,
} from "mage-engine";

class Enemy {
  constructor() {
    this.position = randomVector3(-50, 50);
    this.velocity = 0;
  }

  update(player, deltaTime) {
    // Get distance to player
    const dist = getDistance(this.position, player.position);

    // Only chase if within range
    if (dist < 100) {
      // Smoothly move toward player
      const [newPos, newVel] = smoothDamp(
        this.position.x,
        player.position.x,
        this.velocity,
        0.5,
        10, // max speed
        deltaTime
      );

      this.position.x = newPos;
      this.velocity = newVel;
    }

    // Clamp position to arena bounds
    this.position.x = clamp(this.position.x, -100, 100);
    this.position.z = clamp(this.position.z, -100, 100);
  }
}
```

## See Also

- [Features](/engine/utilities/features.md) - Feature detection
- [Workers](/engine/utilities/workers.md) - Web worker utilities
