# Physics

## What is Mage Physics?

Mage includes a physics simulation powered by [Ammo.js](https://github.com/kripken/ammo.js/), a JavaScript port of the Bullet physics engine. This lets you create realistic collisions, gravity, rigid body dynamics, and physical interactions in your games.

**Physics in Mage enables:**
- Gravity and forces on objects
- Collision detection between entities
- Realistic rigid body dynamics (bouncing, rolling, stacking)
- Raycasting for hit detection
- Vehicle physics

---

## Enabling Physics

Enable physics in your configuration:

```javascript
const config = {
    physics: {
        enabled: true,
        path: './mage.physics.js'  // Path to physics worker
    }
};

Router.start(config, assets);
```

::: warning
Physics runs in a Web Worker for performance. Make sure `mage.physics.js` is accessible at the specified path.
:::

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

1. Your game sets positions, applies forces
2. Physics worker simulates the next step
3. Transforms are synced back to Three.js objects

### Bodies and Shapes

Every physics-enabled entity has:
- **Body** - The physics representation (mass, velocity, forces)
- **Shape** - The collision geometry (box, sphere, capsule, mesh)

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
        
        // Enable physics with a box shape
        box.enablePhysics({
            mass: 1,           // 0 = static (immovable)
            shape: 'box'
        });
        
        Scene.add(box);
        // The cube will now fall due to gravity!
    }
}
```

### Physics Shapes

| Shape | Use Case |
|-------|----------|
| `box` | Crates, buildings, walls |
| `sphere` | Balls, projectiles |
| `capsule` | Characters (better for slopes) |
| `cylinder` | Barrels, pillars |
| `mesh` | Complex static geometry |

```javascript
// Sphere for a ball
ball.enablePhysics({ mass: 0.5, shape: 'sphere' });

// Capsule for a character
player.enablePhysics({ mass: 80, shape: 'capsule' });

// Static floor (mass = 0)
ground.enablePhysics({ mass: 0, shape: 'box' });
```

::: tip
Use simpler shapes when possible. A `box` is much faster than a `mesh` shape.
:::

---

## Common Workflows

### Creating a Floor

```javascript
const floor = new Cube(100, 1, 100);
floor.setPosition({ y: -0.5 });
floor.enablePhysics({ mass: 0, shape: 'box' });  // mass: 0 = static
Scene.add(floor);
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
    box.enablePhysics({ mass: 1, shape: 'box' });
    Scene.add(box);
}
```

### Applying Forces

```javascript
// Push an object
object.applyForce({ x: 100, y: 0, z: 0 });

// Apply impulse (instant velocity change)
object.applyImpulse({ x: 0, y: 50, z: 0 });

// Set velocity directly
object.setLinearVelocity({ x: 10, y: 0, z: 0 });
```

### Player Character with Physics

```javascript
class PlayerController extends BaseScript {
    start(player) {
        this.player = player;
        this.player.enablePhysics({
            mass: 80,
            shape: 'capsule',
            friction: 0.5
        });
    }
    
    update(dt) {
        const input = Input.keyboard;
        const force = { x: 0, y: 0, z: 0 };
        
        if (input.isPressed('w')) force.z = -500;
        if (input.isPressed('s')) force.z = 500;
        if (input.isPressed('a')) force.x = -500;
        if (input.isPressed('d')) force.x = 500;
        
        this.player.applyForce(force);
    }
}
```

---

## Collision Detection

### Collision Events

```javascript
box.addEventListener('collision', (event) => {
    const other = event.body;  // The entity we collided with
    console.log('Hit:', other.getName());
});
```

### Collision Filtering

Control which objects can collide:

```javascript
// Group A objects only collide with Group B
boxA.enablePhysics({ 
    mass: 1, 
    shape: 'box',
    collisionGroup: 1,
    collisionMask: 2  // Only collide with group 2
});

boxB.enablePhysics({
    mass: 1,
    shape: 'box', 
    collisionGroup: 2,
    collisionMask: 1  // Only collide with group 1
});
```

---

## Raycasting

Cast rays to detect objects in a direction:

```javascript
import { Physics } from 'mage-engine';

// Cast a ray from origin in direction
const origin = { x: 0, y: 5, z: 0 };
const direction = { x: 0, y: -1, z: 0 };

const hit = Physics.raycast(origin, direction, 100);

if (hit) {
    console.log('Hit:', hit.entity.getName());
    console.log('Distance:', hit.distance);
    console.log('Point:', hit.point);
    console.log('Normal:', hit.normal);
}
```

**Common raycast uses:**
- Ground detection (is player on floor?)
- Line of sight checks
- Shooting/projectiles
- Object picking with mouse

---

## Physics Properties

### Body Properties

| Property | Description | Default |
|----------|-------------|---------|
| `mass` | Weight in kg (0 = static) | 1 |
| `friction` | Surface friction (0-1) | 0.5 |
| `restitution` | Bounciness (0-1) | 0.2 |
| `linearDamping` | Air resistance | 0 |
| `angularDamping` | Rotation resistance | 0 |

```javascript
ball.enablePhysics({
    mass: 0.5,
    shape: 'sphere',
    friction: 0.1,       // Slippery
    restitution: 0.9     // Very bouncy
});
```

### Kinematic Bodies

Kinematic bodies are controlled by code but still affect physics objects:

```javascript
// Moving platform
platform.enablePhysics({
    mass: 0,
    shape: 'box',
    kinematic: true
});

// Move platform in update loop
platform.setPosition({ y: Math.sin(time) * 5 });
```

---

## Performance Tips

1. **Use simple shapes** - Box and sphere are fastest
2. **Limit dynamic objects** - Static objects are cheap
3. **Sleep inactive bodies** - Objects at rest don't simulate
4. **Use collision masks** - Reduce unnecessary collision checks
5. **Don't raycast every frame** - Cache results when possible

```javascript
// Bad: Complex mesh for moving object
crate.enablePhysics({ shape: 'mesh', mass: 1 }); // Slow!

// Good: Simple box shape
crate.enablePhysics({ shape: 'box', mass: 1 }); // Fast!
```

---

## Disabling Physics

```javascript
// Remove physics from an entity
entity.disablePhysics();

// Temporarily freeze physics
entity.setPhysicsEnabled(false);
entity.setPhysicsEnabled(true);  // Resume
```

::: tip
Disabling physics is useful for cutscenes, menus, or paused game states.
:::
