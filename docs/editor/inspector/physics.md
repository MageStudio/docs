# Physics

The physics tab in the inspector lets you configure physics properties for mesh and model entities. These properties control how the entity behaves in the physics simulation at runtime.

::: warning
Physics simulation is disabled in the editor viewport. Physics properties configured here will take effect when the game is built and run.
:::

## Properties

| Property | Description |
|----------|-------------|
| **Mass** | The mass of the entity. A mass of 0 makes the entity static (immovable) |
| **Velocity** | Initial linear velocity vector (X, Y, Z) |
| **Direction** | Direction vector for the velocity |
| **Collider Type** | The shape used for collision detection |

## Collider Types

The collider type determines the shape used for physics collision calculations:

| Collider | Description |
|----------|-------------|
| **Box** | Axis-aligned bounding box |
| **Sphere** | Bounding sphere |
| **Cylinder** | Cylindrical collider |
| **Mesh** | Uses the actual mesh geometry (most accurate but most expensive) |

::: tip
For best performance, use simple collider shapes (box, sphere) whenever possible. Mesh colliders provide the most accurate collision detection but are significantly more expensive to compute.
:::

## Static vs Dynamic Entities

- **Static** (mass = 0): The entity does not move in response to forces. Use this for floors, walls, and other fixed objects.
- **Dynamic** (mass > 0): The entity is affected by gravity and forces. Use this for objects that should fall, bounce, or be pushed around.
