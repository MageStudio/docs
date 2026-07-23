# Inspector

The inspector panel displays the properties of the currently selected entity. It changes dynamically based on the type of entity you have selected — a mesh shows material and physics options, a light shows intensity and shadow settings, and so on.

## Global Properties

All entities share a common set of global properties displayed at the top of the inspector:

| Property | Description |
|----------|-------------|
| **Name** | The display name of the entity |
| **UUID** | Unique identifier (read-only) |
| **Type** | The entity type, e.g. Mesh, Light, Camera (read-only) |
| **Position** | X, Y, Z coordinates in world or local space |
| **Rotation** | X, Y, Z rotation in radians |
| **Quaternion** | X, Y, Z, W quaternion rotation |
| **Scale** | X, Y, Z scale factors |
| **Tags** | Labels for organizing and querying entities |

::: tip
Position, rotation, and scale can be edited both in the inspector and with the [viewport gizmos](/editor/scene/viewport). Changes in one are reflected in the other in real time.
:::

## Entity-Specific Tabs

Depending on the selected entity type, the inspector displays additional tabs:

### Meshes and Models

| Tab | Contents |
|-----|----------|
| **Global** | Position, rotation, scale, tags, name |
| **Material** | Material type and settings — see [Materials](/editor/inspector/materials) |
| **Physics** | Velocity, direction, mass, collider type — see [Physics](/editor/inspector/physics) |
| **Scripts** | Attached scripts and behaviors |
| **Animations** | Animation playback and control |

### Lights

Light properties vary by type. See [Lights](/editor/inspector/lights) for full details.

### Cameras

| Property | Description |
|----------|-------------|
| **FOV** | Field of view angle in degrees |
| **Near** | Near clipping plane distance |
| **Far** | Far clipping plane distance |

### Audio

Audio entities provide playback controls for the attached sound file.

### Scene

When the scene root is selected, the inspector shows level-wide settings and configuration.

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
