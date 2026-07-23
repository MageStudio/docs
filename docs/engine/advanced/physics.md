# Physics

## What is Mage Physics?

Mage includes a physics simulation powered by [Ammo.js](https://github.com/kripken/ammo.js/), a JavaScript port of the Bullet physics engine. This lets you create realistic collisions, gravity, rigid body dynamics, and physical interactions in your games.

**Physics in Mage enables:**
- Gravity and forces on objects
- Collision detection between entities
- Realistic rigid body dynamics (bouncing, rolling, stacking)
- Kinematic platforms that carry other bodies
- Character and vehicle physics

---

## Enabling Physics

Enable physics in your configuration:

```javascript
const config = {
    physics: {
        enabled: true,
        path: './ammo.js',                  // Path to the physics worker
        gravity: { x: 0, y: -30, z: 0 },    // World gravity (default)
        fixedTimeStep: 1 / 60,              // Simulation step (seconds)
        maxSubSteps: 3                      // Substeps per frame to catch up
    }
};

Router.start(config, assets);
```

::: warning
Physics runs in a Web Worker for performance. Make sure the worker script is accessible at the specified `path`.
:::

::: tip Since v3.25.3
When you request [Third Person Controls](/engine/advanced/controls/third.md) with `physicsEnabled: true`, the engine enables physics on demand — you don't need to enable it upfront in your configuration.
:::

### Per-level overrides

Different levels can override any of the physics fields above. The engine deep-merges the common physics config with the active level's overrides — only the keys you specify are replaced:

```javascript
const config = {
    physics: {
        enabled: true,
        gravity: { x: 0, y: -30, z: 0 }
    },
    levels: {
        '/moon':  { physics: { gravity: { y: -1.6 } } },
        '/space': { physics: { gravity: { y: 0 } } }
    }
};
```

See [Per-Level Configuration](/engine/advanced/configuration#per-level-configuration) for the full mechanism.

---

## How Physics Works

### The Physics Loop

```
Main Thread                    Worker Thread
─────────────                  ─────────────
Game Loop ──────► Sync ──────► Physics Step
                                    │
                                    ▼
Display ◄────────────────── Transform Updates
```

1. Your game sets positions, applies velocities
2. The physics worker simulates the next step
3. Transforms are synced back to Three.js objects

### Bodies and Colliders

Every physics-enabled element has:
- **Body** - The physics representation (mass, velocity, forces)
- **Collider** - The collision shape, derived from the element's bounding box (or set explicitly)

---

## Adding Physics to Elements

### Basic Rigid Bodies

```javascript
import { Cube, Scene } from 'mage-engine';

class GameLevel extends Level {
    onCreate() {
        // Create a cube with physics
        const box = new Cube(2, 2, 2);
        box.setPosition({ x: 0, y: 10, z: 0 });

        // Enable physics — set a mass to make it dynamic
        box.enablePhysics({
            mass: 1,
            colliderType: 'BOX'
        });

        // The cube will now fall due to gravity!
    }
}
```

::: warning Since v3.25.5
Bodies without an explicit `mass` default to **static** (`mass: 0`). If you want an object to fall or react to forces, always set a `mass` greater than `0` — previously the default was `1` (dynamic).
:::

### Collider Types

| Collider Type | Use Case |
|---------------|----------|
| `BOX` | Crates, buildings, walls, floors (default) |
| `SPHERE` | Balls, projectiles |
| `PLAYER` | Character capsules (used by Third Person Controls) |
| `VEHICLE` | Cars and other vehicles |

```javascript
// Sphere for a ball
ball.enablePhysics({ mass: 0.5, colliderType: 'SPHERE' });

// Static floor (mass defaults to 0)
ground.enablePhysics({ colliderType: 'BOX' });
```

Collider sizes are computed automatically from the element's bounding box (in world space since v3.25.8). You can override the size explicitly:

```javascript
crate.enablePhysics({
    mass: 1,
    colliderType: 'BOX',
    colliderWidth: 2,
    colliderHeight: 1,
    colliderLength: 2
});

ball.enablePhysics({
    mass: 0.5,
    colliderType: 'SPHERE',
    colliderRadius: 0.75
});
```

::: tip
Since v3.25.7 you can also override `element.boundingBox` with your own `Box3` — automatic collider sizing will use it. See [Element](/engine/advanced/core/element.md).
:::

---

## Common Workflows

### Creating a Floor

```javascript
const floor = new Cube(100, 1, 100);
floor.setPosition({ y: -0.5 });
floor.enablePhysics({ colliderType: 'BOX' });  // mass defaults to 0 = static
```

### Dropping Objects

```javascript
for (let i = 0; i < 10; i++) {
    const box = new Cube(1, 1, 1);
    box.setPosition({
        x: Math.random() * 10 - 5,
        y: 10 + i * 2,
        z: Math.random() * 10 - 5
    });
    box.enablePhysics({ mass: 1, colliderType: 'BOX' });
}
```

### Setting Velocities

```javascript
// Set linear velocity directly
object.setLinearVelocity({ x: 10, y: 0, z: 0 });
object.getLinearVelocity();

// Spin an object
object.setAngularVelocity({ x: 0, y: 5, z: 0 });
object.getAngularVelocity();
```

### Player Characters

For physics-driven characters, use [Third Person Controls](/engine/advanced/controls/third.md) — the engine creates a `PLAYER` capsule body for the target, handles movement, jumping, and ground detection for you:

```javascript
import { Controls } from 'mage-engine';

const control = await Controls.setThirdPersonControls({
    target: character,
    physicsEnabled: true,
    speed: 2,
    jumpSpeed: 2
});
```

---

## Physics Properties

### Body Properties

| Property | Description | Default |
|----------|-------------|---------|
| `mass` | Weight in kg (0 = static) | 0 |
| `colliderType` | `BOX`, `SPHERE`, `PLAYER` or `VEHICLE` | `BOX` |
| `kinematic` | Script-driven body that pushes dynamic bodies | `false` |
| `friction` | Surface friction | 1 |
| `restitution` | Bounciness (dynamic bodies) | 0.9 |
| `damping` | `{ linear, angular }` resistance (dynamic bodies) | `{ linear: 0.2, angular: 0.2 }` |
| `ccdRadius` | Continuous collision detection radius (fast-moving dynamic bodies) | 0 |
| `colliderWidth` / `colliderHeight` / `colliderLength` / `colliderRadius` | Explicit collider size overrides | auto |

```javascript
ball.enablePhysics({
    mass: 0.5,
    colliderType: 'SPHERE',
    friction: 0.1,       // Slippery
    restitution: 0.9     // Very bouncy
});
```

### Kinematic Bodies

Kinematic bodies (since v3.27.4) are controlled by your code but still push and carry dynamic bodies — perfect for moving platforms:

```javascript
// Moving platform
platform.enablePhysics({
    mass: 0,
    colliderType: 'BOX',
    kinematic: true
});

// Move the platform from a script — riders are carried along
platform.setPosition({ y: Math.sin(time) * 5 });
```

::: tip
A static body is automatically promoted to kinematic the first time a script moves or rotates it, so forgetting the flag won't freeze your platform.
:::

### Compound Bodies

Since v3.28.0, when a physics-enabled element has physics-enabled children attached to it, the engine builds a single **compound body**: the parent's collider plus one collider per child, welded together. Moving or rotating the parent carries every child collider with it, and compound bodies are rebuilt automatically when elements are reparented at runtime.

```javascript
platform.enablePhysics({ mass: 0, kinematic: true });
bumper.enablePhysics({});      // child of platform → welded into the platform's body
platform.add(bumper);
```

---

## Collision Detection

Elements detect collisions using ray-based colliders:

```javascript
import { constants } from 'mage-engine';

const { VECTOR_FRONT, VECTOR_DOWN, DOWN } = constants;

// Set up colliders in the directions you care about
player.setColliders(
    [VECTOR_FRONT, VECTOR_DOWN],
    [{ near: 0.5 }, { near: 0.5 }]
);

// Check all colliders — dispatches a collision event when something is hit
const collisions = player.checkCollisions();

// Or check a single direction (e.g. ground detection)
const ground = player.isCollidingOnDirection(DOWN);
```

Each collider accepts `near`, `far` (default `10`), `offset` (`{ x, y, z }`) and `debug` options. Available direction vectors: `VECTOR_UP`, `VECTOR_DOWN`, `VECTOR_LEFT`, `VECTOR_RIGHT`, `VECTOR_FRONT`, `VECTOR_BACK`.

Collision state for physics bodies is also available via the physics state:

```javascript
element.getPhysicsState();  // includes collision information from the simulation
```

---

## Performance Tips

1. **Use simple colliders** - `BOX` and `SPHERE` are fastest
2. **Limit dynamic objects** - Static objects are cheap
3. **Prefer kinematic over dynamic** for script-driven movers
4. **Use `ccdRadius` sparingly** - Only for fast-moving objects that tunnel through walls
