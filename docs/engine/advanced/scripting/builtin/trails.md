# Trails

The `Trails` script creates particle trail effects that follow an element, useful for vehicle exhaust, magic effects, projectile trails, and more.

## Import

```javascript
import { Scripts, BUILTIN_SCRIPTS } from "mage-engine";
```

## Usage

The Trails script is a built-in script that can be attached to any element.

```javascript
// Attach trails to an element
element.addScript(BUILTIN_SCRIPTS.TRAILS, {
  texture: "trailTexture",
  size: 2,
});
```

## Parameters

| Parameter | Type     | Default | Description                               |
| --------- | -------- | ------- | ----------------------------------------- |
| `texture` | `string` | `false` | Texture ID for trail particles (optional) |
| `size`    | `number` | -       | Size of the trail particles               |

## Examples

### Basic Trail

```javascript
import { Sphere, BUILTIN_SCRIPTS } from "mage-engine";

// Create a projectile
const projectile = new Sphere(2, 0xff0000);

// Add trail effect
projectile.addScript(BUILTIN_SCRIPTS.TRAILS, {
  size: 1,
});
```

### Textured Trail

```javascript
// First, load a trail texture in your config
// images: { 'smokeTexture': 'textures/smoke.png' }

// Create element with textured trail
const rocket = new Cylinder(2, 2, 8, 0x888888);
rocket.addScript(BUILTIN_SCRIPTS.TRAILS, {
  texture: "smokeTexture",
  size: 3,
});
```

### Vehicle Exhaust

```javascript
import { Models, BUILTIN_SCRIPTS } from "mage-engine";

// Load car model
const car = Models.get("car");

// Add exhaust trails
car.addScript(BUILTIN_SCRIPTS.TRAILS, {
  texture: "exhaustSmoke",
  size: 0.5,
});
```

### Magic Effect

```javascript
// Create a magic orb with sparkle trail
const orb = new Sphere(3, 0x00ffff);
orb.addScript(BUILTIN_SCRIPTS.TRAILS, {
  texture: "sparkle",
  size: 1.5,
});
```

## Script Lifecycle

### `start(element, options)`

Called when the script is attached. Initializes the particle emitter.

### `update()`

Called every frame. Updates the trail position to follow the element.

### `stop()`

Called when the script is removed. Disposes of the particle emitter.

## Removing Trails

```javascript
// Remove the trails script
element.removeScript(BUILTIN_SCRIPTS.TRAILS);
```

## Combining with Movement

```javascript
class Projectile extends Sphere {
  constructor() {
    super(1, 0xffff00);

    // Add trail
    this.addScript(BUILTIN_SCRIPTS.TRAILS, {
      texture: "fireTrail",
      size: 2,
    });

    this.velocity = { x: 10, y: 0, z: 0 };
  }

  update(dt) {
    // Move projectile
    const pos = this.getPosition();
    this.setPosition(
      pos.x + this.velocity.x * dt,
      pos.y + this.velocity.y * dt,
      pos.z + this.velocity.z * dt
    );
    // Trail automatically follows
  }
}
```

## Technical Details

- Uses the Particles system internally with `PARTICLES.TRAIL` type
- The emitter starts with infinite duration
- Position updates automatically in the `update` loop
- Disposed properly when script is stopped

## See Also

- [Scripts](/engine/advanced/scripting/scripts.md) - Script system overview
- [Particles](/engine/advanced/effects/particles.md) - Particle effects
- [BaseCar](/engine/advanced/scripting/builtin/basecar.md) - Vehicle script
- [SmoothCarFollow](/engine/advanced/scripting/builtin/smoothcarfollow.md) - Camera follow script
