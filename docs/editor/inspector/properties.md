# Inspector

The inspector panel displays the properties of the currently selected entity, organized in vertical icon tabs. It changes dynamically based on the type of entity you have selected — a mesh shows material and physics options, a light shows intensity and shadow settings, and so on.

## Global Properties

The **Global** tab is shared by all entities:

| Property | Description |
|----------|-------------|
| **Name** | The display name of the entity |
| **Position** | X, Y, Z coordinates |
| **Rotation** | X, Y, Z rotation in degrees |
| **Scale** | X, Y, Z scale factors |
| **Tags** | Labels for organizing and querying entities |

::: tip
Position, rotation, and scale can be edited both in the inspector and with the [viewport gizmos](/editor/scene/viewport). Changes in one are reflected in the other in real time, and transform edits are undoable with `Ctrl/Cmd+Z`.
:::

### World vs Local Values

When the **World** space toggle (floating toolbar) is active and the entity has a parent, the Position and Rotation fields show and edit **world-space** values — the editor converts them to local values relative to the parent when applied. **Scale always stays local.** With **Local** active, all fields show values relative to the parent.

## Entity-Specific Tabs

Depending on the selected entity type, the inspector displays different tabs:

### Meshes and Models

| Tab | Contents |
|-----|----------|
| **Global** | Position, rotation, scale, tags, name |
| **Physics** | Mass, collider type and size, kinematic — see [Physics](/editor/inspector/physics) |
| **Scripts** | Attached scripts and behaviors |
| **Material** | Material type, properties, and textures — see [Materials](/editor/inspector/materials) |
| **Animations** | Animation playback: per-clip play/stop, loop toggle, crossfade, speed and weight sliders |

### Lights

Tabs: **Global**, **Scripts**, and **Light** — properties vary by light type. See [Lights](/editor/inspector/lights) for full details.

### Particles & Effects

Fire, Explosion, Trail, Rain, Snow, and Fountain emitters expose an **emit mode** (Continuous / Burst / Timed), test play/stop controls, per-effect parameters, and a texture slot. Scenery entities (Sky, Skybox, Water, Mirror) have their own settings.

### Audio

Audio entities provide playback controls for the attached sound file.

### Level

When the root **Level** node is selected, the inspector shows level-wide tabs: **General**, **Scripts**, and **Simulation** — the per-level physics configuration (gravity, tick rate, substeps). See [Per-Level Physics](/editor/inspector/physics#per-level-physics).

## Input Types

The inspector uses specialized input components for different property types:

| Input | Used For |
|-------|----------|
| **Vector Input** | Position, rotation, scale (X, Y, Z fields) |
| **Color Picker** | Material colors, light colors |
| **Range Slider** | Opacity, intensity, roughness, metalness |
| **Toggle** | Booleans like wireframe, cast shadow, fog |
| **Dropdown** | Material type, collider type |
| **Asset Picker** | Selecting textures, models, scripts |
