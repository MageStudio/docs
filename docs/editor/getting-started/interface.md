# Interface Overview

The Mage Editor interface is organized into distinct areas, each serving a specific purpose. This page walks through each section of the workspace.

## Top Toolbar

The top toolbar provides access to high-level actions:

| Element | Description |
|---------|-------------|
| **Project Selector** | Switch between your projects |
| **Level Selector** | Switch between levels within the current project |
| **Build Button** | Trigger a build of your game. Shows the time since the last build |
| **Publish Button** | Deploy your game to the cloud |

## 3D Viewport

The central area of the editor is the 3D viewport where you interact with your scene. This is where entities are displayed, selected, and manipulated using transform gizmos.

Key capabilities:
- Click entities to select them
- Use transform gizmos to move, rotate, or scale the selected entity
- Drag and drop files from your system to import assets directly into the scene
- A **camera preview** overlay (bottom-right) shows the scene from the perspective of any camera entity in the scene

## Left Toolbar

Located on the left side of the viewport, this toolbar contains:

| Tool | Shortcut | Description |
|------|----------|-------------|
| **Add Element** | — | Dropdown to add primitives, lights, cameras, and sounds to the scene |
| **Translate** | `T` | Move the selected entity |
| **Rotate** | `R` | Rotate the selected entity |
| **Scale** | `S` | Scale the selected entity |
| **Space Toggle** | — | Switch between Global and Local coordinate space |
| **Snap Toggle** | — | Enable grid snapping (10-unit increments) |

## Hierarchy Panel

The hierarchy panel displays a tree view of all entities in the current scene. Each entity is shown with an icon indicating its type:

| Icon | Entity Type |
|------|-------------|
| Globe | Scene (root) |
| Gateway | Mesh / Model |
| Video Camera | Camera |
| Lightbulb | Light |
| Folder | Group |

Click any entity in the hierarchy to select it in the viewport and open its properties in the inspector.

## Inspector Panel

The inspector panel shows the properties of the currently selected entity. Its contents change dynamically based on what is selected:

- **Mesh / Model** — Position, rotation, scale, materials, physics, scripts, animations
- **Light** — Type-specific settings (color, intensity, shadows, decay)
- **Camera** — Field of view, near/far clipping planes
- **Audio** — Playback controls
- **Scene** — Level-wide settings

See the [Inspector](/editor/inspector/properties) documentation for details on each property type.

## Assets Panel

Located below the viewport, the assets panel organizes all assets in the current level across tabs:

| Tab | Contents |
|-----|----------|
| **Models** | 3D models (GLTF, FBX, etc.) |
| **Images** | Textures and sprites |
| **Audio** | Sound files |
| **Video** | Video assets |
| **Scripts** | Text and visual scripts |

You can upload assets via drag-and-drop or the upload button on each tab.

See [Assets](/editor/assets/) for more details.

## Resizable Layout

All panels are connected by draggable splitters. You can resize any panel by dragging the divider between adjacent areas to customize the workspace to your needs.
