# Visual Scripts

Visual scripts let you build game logic using a node-based editor — no code required. You connect nodes together to define behaviors, reactions to events, and game flow. Behind the scenes, visual scripts are compiled to JavaScript.

## The Visual Editor

The visual editor is built on React Flow and provides a canvas where you create and connect nodes:

- **Drag nodes** from the node palette onto the canvas
- **Connect nodes** by dragging from an output port to an input port
- **Pan and zoom** the canvas to navigate large graphs (the zoom range accommodates very large graphs)
- **Minimap** in the corner provides an overview of the entire graph
- **Color-coded edges** help trace data flow between nodes
- **Alignment guides** — while dragging a node, blue helper lines appear when its edges align with another node, and the node snaps into alignment
- **Auto-save** — changes are saved automatically a couple of seconds after you stop editing, with a brief "Saved" indicator

## Creating a Visual Script

1. Open the **Scripts** tab in the assets panel
2. Click the **create** button and choose to create a visual script
3. Provide a name for the script
4. The visual editor opens with an empty canvas

## Script Scope

Visual scripts have two scope options:

| Scope | Description |
|-------|-------------|
| **Entity** | Attached to a specific entity. The `start(entity)` method runs when the entity loads. Use for entity-specific behaviors like movement, reactions, and animations |
| **Level** | Attached to the level itself. The `onCreate()` method runs when the level loads. Use for global game logic, initialization, and level-wide event handling |

## Node Palette

The node palette is a searchable, categorized list of all available nodes. Drag any node from the palette onto the canvas to add it to your graph. The palette is filtered by script scope — level scripts see level lifecycle events (On Create / On Start / On Update), entity scripts see entity lifecycle events (On Start / On Update).

### Event Nodes

Event nodes trigger the connected logic when a specific event occurs:

| Node | Description |
|------|-------------|
| **Keyboard Listener** | Fires on key press/release |
| **Is Key Pressed** | Query whether a key is currently held |
| **Mouse Click / Down / Up / Move** | Fires on mouse interaction |
| **Get Mouse Position** | Read the current mouse position |
| **Element Click** | Fires when a specific entity is clicked |
| **Gamepad Button / Axis / Connected** | Fires on gamepad input |
| **Touch Start / End / Move** | Fires on touch screen input |

### Entity Nodes

| Node | Description |
|------|-------------|
| **Entity** | Reference to a specific entity (use entity picker to select) |
| **Self** | Reference to the entity this script is attached to |
| **Get Position / Rotation / Scale** | Read the entity's current transform |
| **Get Name** | Get the entity's name |
| **Find Entity By Name** | Look an entity up at runtime |
| **Clone Entity** | Create a copy of an entity |
| **Destroy Entity** | Remove an entity from the scene |
| **Set Data / Get Data** | Store and read arbitrary values on an entity |

### Transform Nodes

| Node | Description |
|------|-------------|
| **Set Position / Rotation / Scale** | Set absolute transform values |
| **Translate** | Move relative to current position |
| **Look At** | Orient entity to face a target |

### Transition Nodes

| Node | Description |
|------|-------------|
| **Go To / Rotate To / Scale To** | Smoothly animate to a target value |
| **Fade To** | Smoothly animate opacity |

### Material Nodes

| Node | Description |
|------|-------------|
| **Set Color** | Change material color |
| **Set Opacity** | Change transparency |
| **Set Visible** | Show or hide entity |
| **Set Wireframe** | Toggle wireframe rendering |
| **Set Metalness / Roughness** | Adjust PBR material properties |
| **Set Emissive / Emissive Intensity** | Control self-illumination |

### Animation Nodes

| Node | Description |
|------|-------------|
| **Play Animation** | Start an animation by name |
| **Stop Animation** | Stop a specific animation |
| **Stop All Animations** | Stop all running animations |
| **Crossfade To** | Smoothly blend to another animation |
| **Set Animation Speed** | Change an animation's playback speed |
| **Set Animation Weight** | Set an animation's blend weight |

### Physics Nodes

| Node | Description |
|------|-------------|
| **Enable / Disable Physics** | Turn the physics body on or off at runtime |
| **Set / Get Linear Velocity** | Control linear movement speed |
| **Set / Get Angular Velocity** | Control rotational speed |
| **Get Physics State** | Read the body's simulation state |
| **On Collision** | Fires when the entity collides |
| **Set Physics Position / Rotation** | Teleport the physics body |

### Controls Nodes

| Node | Description |
|------|-------------|
| **First Person Control** | Enable first person controls |
| **Third Person Control** | Enable the third person character controller |
| **Disable Controls** | Turn active controls off |

### Audio Nodes

| Node | Description |
|------|-------------|
| **Play / Stop / Pause Sound** | Control audio playback |
| **Set Volume** | Adjust audio volume |

### Light Nodes

| Node | Description |
|------|-------------|
| **Set Light Color** | Change light color |
| **Set Light Intensity** | Change light brightness |
| **Set Light Shadow** | Toggle shadow casting |

### Camera Nodes

| Node | Description |
|------|-------------|
| **Set Camera Position** | Move the camera |
| **Set Camera Look At** | Point the camera at a target |
| **Set Orbit Enabled** | Enable/disable orbit controls |

### Variable Nodes

| Node | Description |
|------|-------------|
| **Number** | A numeric constant |
| **String** | A text constant |
| **Vector2** | A 2D vector (X, Y) |
| **Vector3** | A 3D vector (X, Y, Z) |
| **Quaternion** | A quaternion rotation (X, Y, Z, W) |
| **Variable Reference** | Reuse another variable anywhere in the graph without a long edge — pick any named variable node and its outputs are mirrored |

### Logic Nodes

| Node | Description |
|------|-------------|
| **Branch (If/Else)** | Route execution based on a condition |
| **Lower Than / Greater Than** | Numeric comparison |
| **Equal / Not Equal** | Equality comparison |
| **And / Or / Not** | Boolean operators |
| **Has Tag** | Check if an entity has a specific tag |

### Math Nodes

| Node | Description |
|------|-------------|
| **Add / Subtract / Multiply / Divide / Modulo** | Arithmetic |
| **Negate** | Invert a value's sign |
| **Clamp** | Constrain a value to a range |
| **Lerp** | Linear interpolation between two values |
| **Random Float / Random Int** | Random number generation |
| **Get Distance** | Distance between two positions |
| **Deg to Rad** | Convert degrees to radians |

### Tag Nodes

| Node | Description |
|------|-------------|
| **Add Tag** | Add a tag to an entity |
| **Remove Tag** | Remove a tag from an entity |

### Debug Nodes

| Node | Description |
|------|-------------|
| **Console Log** | Print a value to the console (visible in the [preview console](/editor/scene/preview#console)) |

## Action Nodes

Action nodes are special container nodes. You can drag other nodes inside them to group related logic. This helps organize complex graphs into clear, logical blocks.

## Entity Picker

When working with **Entity** nodes, you can click "Pick from Scene" to enter entity picker mode. The 3D viewport then lets you click on any entity to select it as the reference for that node — no need to type entity names manually.

## Compiling

Visual scripts are compiled to JavaScript before they can be used in a build. The compilation:

1. Performs a topological sort of the graph
2. Generates JavaScript code for each node
3. Assembles everything into a class that extends `BaseScript` (entity scope) or `Level` (level scope)

You can preview the compiled code at any time by opening the **compiled code preview** modal. Any compilation errors are displayed here as well.

## Code Preview

The editor includes a **read-only code view** that shows the compiled JavaScript output of your visual script. This is useful for understanding what the graph produces and for debugging.

::: tip
You can switch between the visual editor and the compiled code view using the mode toggle at the top of the editor.
:::
