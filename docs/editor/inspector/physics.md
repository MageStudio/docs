# Physics

The physics tab in the inspector lets you configure physics properties for mesh and model entities. These properties control how the entity behaves in the physics simulation at runtime.

::: tip
Physics does not simulate while editing the scene, but it **runs in the [Game Preview](/editor/scene/preview)** — press Play to test your physics setup without leaving the editor.
:::

## Configuration

| Property | Description |
|----------|-------------|
| **Mass** | The mass of the entity. A mass of 0 makes the entity static (immovable) |
| **Collider Type** | The shape used for collision detection |
| **Apply Physics Update** | Sync the physics simulation back to the entity's transform |
| **Kinematic** | Makes a mass-0 collider movable: it can be driven by scripts and carries bodies resting on it — ideal for moving platforms |

## Collider Types

The collider type determines the shape used for physics collision calculations:

| Collider | Description |
|----------|-------------|
| **Box** | Axis-aligned bounding box |
| **Sphere** | Bounding sphere |
| **Player** | Capsule collider designed for characters |

::: tip
Collider sizes are computed automatically from the entity's bounding box. Keep colliders simple — box and sphere are the cheapest to simulate.
:::

## Collider Size

The **Collider Size** section lets you override the automatically computed collider dimensions:

- Per-axis inputs (Width/Height/Length for Box, Radius for Sphere, Width/Height for Player) show `AUTO` when using the computed size
- A reset button restores the computed value for each axis
- The **Show Collider** toggle displays this entity's collider outline in the viewport (there's also a scene-wide collider toggle in the floating toolbar)

## State

The collapsed **State** section shows read-only runtime values — the entity's current velocity and direction from the physics simulation.

## Static vs Dynamic vs Kinematic

- **Static** (mass = 0): The entity does not move in response to forces. Use this for floors, walls, and other fixed objects.
- **Dynamic** (mass > 0): The entity is affected by gravity and forces. Use this for objects that should fall, bounce, or be pushed around.
- **Kinematic** (mass = 0 + Kinematic toggle): The entity is moved by your scripts but still pushes and carries dynamic bodies. Use this for moving platforms and doors.

## Compound Bodies

When a physics-enabled entity has physics-enabled children attached to it, their colliders are welded into a single **compound body** at runtime. Moving the parent carries every child collider with it — rotate a kinematic platform and its attached bumpers move as one rigid object.

## Per-Level Physics

Gravity and simulation settings are configured per level: select the root **Level** node in the hierarchy and open the **Simulation** tab in the inspector.

- **Gravity** — direction (X/Y/Z, auto-normalized) and magnitude in m/s², with game-feel presets from *Floaty* (9.8) to *Crushing* (60) and *Zero-G* (0)
- **Tick rate** — simulation frequency in Hz (30 / 60 / 120 / 144 presets) with a derived ms-per-step readout
- **Max substeps** — how many catch-up steps the simulation may take per frame (default 3)

Each level stores its own physics configuration, so your moon level can have different gravity from your earth level.
