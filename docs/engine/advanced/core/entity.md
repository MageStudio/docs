# Entity

## What is an Entity?

Entity is the fundamental building block in Mage. Everything you see in a scene—meshes, lights, cameras, sounds, particles—is an Entity or extends from Entity.

**Think of Entity as a container that:**
- Wraps a Three.js object (the "body")
- Provides a unified API for transforms (position, rotation, scale)
- Enables smooth animations via tweening
- Supports parent-child hierarchies
- Can have behaviors attached via Scripts
- Emits events you can listen to

---

## The Entity Hierarchy

```
Entity (base class)
├── Element (meshes, primitives)
├── Model (loaded 3D models)
├── Light (AmbientLight, PointLight, etc.)
├── Camera
├── Sprite
├── Audio (sound sources)
└── Particle (particle systems)
```

You'll rarely create Entity directly—instead you'll create specific types like `Cube`, `Model`, or `PointLight` that inherit Entity's capabilities.

---

## Common Workflows

### Moving and Rotating

Every Entity has position, rotation, and scale:

```javascript
// Direct positioning
player.setPosition({ x: 10, y: 0, z: -5 });

// Move relative to current position
player.translate({ x: 1, y: 0, z: 0 });

// Rotate (in radians)
player.setRotation({ y: Math.PI / 2 }); // 90 degrees

// Scale
player.setScale({ x: 2, y: 2, z: 2 }); // Double size
```

::: tip
All transform methods accept partial objects. `setPosition({ y: 5 })` only changes Y, keeping X and Z unchanged.
:::

### Smooth Animations with Tweening

Move entities smoothly over time:

```javascript
// Move to position over 2 seconds
await player.goTo({ x: 100, y: 0, z: 0 }, 2000);

// Rotate to angle over 1 second
await enemy.rotateTo({ y: Math.PI }, 1000);

// Scale up over 500ms
await powerup.scaleTo({ x: 2, y: 2, z: 2 }, 500);

// Chain animations
await door.rotateTo({ y: Math.PI / 2 }, 1000);
await door.goTo({ x: -2 }, 500);
```

::: tip
All tween methods return Promises, making it easy to sequence animations with `await`.
:::

### Parent-Child Relationships

Build complex objects from simpler parts:

```javascript
// Create a character with attached weapon
const character = Models.get('character');
const sword = Models.get('sword');

character.add(sword);
sword.setPosition({ x: 0.5, y: 0, z: 0 }); // Position relative to character

// Now when character moves, sword moves with it
character.setPosition({ x: 10, y: 0, z: 0 });
```

### Adding Behaviors with Scripts

```javascript
import { Scripts } from 'mage-engine';

// Attach behavior to an entity
enemy.addScript('patrol', { 
    waypoints: [point1, point2, point3],
    speed: 5
});

player.addScript('playerControls');
```

### Listening to Events

```javascript
import { ENTITY_EVENTS } from 'mage-engine';

// When entity is disposed
entity.addEventListener(ENTITY_EVENTS.DISPOSE, () => {
    console.log('Entity was removed');
});

// Animation events
character.addEventListener(ENTITY_EVENTS.ANIMATION.FINISHED, () => {
    console.log('Animation completed');
});
```

---

## Transform Methods

### Position

| Method | Description |
|--------|-------------|
| `getPosition()` | Returns current position as Vector3 |
| `setPosition({ x?, y?, z? })` | Sets position (partial updates ok) |
| `translate({ x, y, z })` | Moves relative to current position |
| `goTo(target, time, easing)` | Smoothly animates to position |

### Rotation

| Method | Description |
|--------|-------------|
| `getRotation()` | Returns current rotation as Vector3 |
| `setRotation({ x?, y?, z? })` | Sets rotation in radians |
| `getQuaternion()` | Returns rotation as Quaternion |
| `setQuaternion({ x?, y?, z?, w? })` | Sets quaternion rotation |
| `rotateTo(target, time, easing)` | Smoothly animates rotation |

### Scale

| Method | Description |
|--------|-------------|
| `getScale()` | Returns current scale as Vector3 |
| `setScale({ x?, y?, z? })` | Sets scale (partial updates ok) |
| `scaleTo(target, time, easing)` | Smoothly animates scale |

### World vs Local Transforms

When an Entity is a child of another Entity, its transforms are **relative to the parent**:

```javascript
parent.setPosition({ x: 10, y: 0, z: 0 });
child.setPosition({ x: 5, y: 0, z: 0 });  // World position is 15, 0, 0

// Get world (absolute) transform
const worldTransform = child.getWorldTransform();
console.log(worldTransform.position); // { x: 15, y: 0, z: 0 }
```

---

## Hierarchy Methods

| Method | Description |
|--------|-------------|
| `add(child)` | Add Entity as a child |
| `remove(child)` | Remove child from hierarchy |
| `hasParent()` | Check if this Entity has a parent |
| `getParent()` | Get parent Entity |
| `hasChildren()` | Check if Entity has children |
| `isParentOf(entity)` | Check if this is parent of entity |
| `getHierarchy()` | Get tree structure of children |

---

## Tags

Tags help you organize and query entities:

```javascript
// Tag entities
enemy.addTag('hostile');
enemy.addTags(['spawnable', 'boss']);

// Query by tag later
const allEnemies = Scene.getByTag('hostile');

// Check tags
if (entity.hasTag('hostile')) {
    player.takeDamage(10);
}
```

| Method | Description |
|--------|-------------|
| `addTag(tag)` | Add a single tag |
| `addTags(tags)` | Add multiple tags |
| `removeTag(tag)` | Remove a tag |
| `removeAllTags()` | Remove all tags (keeps 'all') |
| `hasTag(tag)` | Check if entity has tag |
| `getTags()` | Get all tags |

::: tip
All entities automatically have the `'all'` tag, which cannot be removed.
:::

---

## Scripts

Attach reusable behaviors to entities:

```javascript
// Add scripts
player.addScript('movement', { speed: 10 });
player.addScript('shooting', { fireRate: 0.5 });

// Check for scripts
if (player.hasScripts()) {
    const movement = player.getScript('movement');
    movement.setSpeed(15);
}

// Enable/disable
player.disableScripts();  // Pause all behaviors
player.enableScripts();   // Resume
```

| Method | Description |
|--------|-------------|
| `addScript(name, options)` | Attach a script |
| `getScript(name)` | Get attached script by name |
| `hasScripts()` | Check if entity has scripts |
| `enableScripts()` | Enable all scripts |
| `disableScripts()` | Disable all scripts |

::: tip
See [Scripts documentation](/engine/advanced/scripting/scripts) for creating custom scripts.
:::

---

## Body Access

The "body" is the underlying Three.js object:

```javascript
// Get the Three.js object directly
const mesh = entity.getBody();

// Access materials, geometry, etc.
mesh.material.color.set(0xff0000);

// Find nested objects by name
const wheel = car.getBodyByName('front_wheel_left');
```

| Method | Description |
|--------|-------------|
| `getBody()` | Get the Three.js object |
| `setBody({ body })` | Set the Three.js object |
| `hasBody()` | Check if body exists |
| `getBodyByName(name)` | Find child in body hierarchy |

---

## Data Storage

Store arbitrary data on entities:

```javascript
// Store data
enemy.setData('health', 100);
enemy.setData('lootTable', ['gold', 'potion', 'sword']);

// Retrieve later
const health = enemy.getData('health');
enemy.setData('health', health - 25);
```

---

## Entity Events

| Event | When Fired |
|-------|------------|
| `ENTITY_EVENTS.DISPOSE` | Entity is removed from scene |
| `ENTITY_EVENTS.ANIMATION.LOOP` | Animation loops |
| `ENTITY_EVENTS.ANIMATION.FINISHED` | Animation completes |
| `ENTITY_EVENTS.STATE_MACHINE.CHANGE` | State machine changes state |

---

## Lifecycle

```
Created → Added to Scene → Active → Disposed
              │                      │
              ├── Scripts start      ├── Scripts disposed
              ├── Update loop runs   ├── Children disposed
              └── Events dispatched  └── DISPOSE event fired
```

**Cleaning up:**

```javascript
// Remove entity from scene
entity.dispose();

// This automatically:
// 1. Disposes all children
// 2. Disposes all scripts
// 3. Removes from parent
// 4. Fires DISPOSE event
```
