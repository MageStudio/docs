# Interface Overview

The Mage Editor interface is organized into distinct areas, each serving a specific purpose. This page walks through each section of the workspace.

## Header

The header spans the top of the editor and provides access to high-level actions:

| Element | Description |
|---------|-------------|
| **Project / Level breadcrumb** | Dropdown selectors to switch project and level. Each entry has a context menu with **Rename** and **Delete**, plus an option to create a new project or level |
| **Save indicator** | Shows the level's save state — "Saving…", "✓ Saved", or how long ago the last save happened |
| **Preview controls** | Play, Pause, Stop and Select Element buttons to run your game inside the editor — see [Game Preview](/editor/scene/preview) |
| **Level / Code toggle** | Switch between the 3D level editor and the code editor |
| **Build button** | Trigger a build of your game |
| **Publish button** | Deploy your game to the cloud |
| **Help menu** | Getting Started tutorial, Documentation, Report issue, About Mage Studio |
| **User avatar** | Account dropdown with your username, **Usage** (storage and deployment limits), and **Sign out** |

## 3D Viewport

The central area of the editor is the 3D viewport where you interact with your scene. This is where entities are displayed, selected, and manipulated using transform gizmos.

Key capabilities:
- Click entities to select them
- Use transform gizmos to move, rotate, or scale the selected entity
- Drag and drop files from your system to import assets directly into the scene
- A **camera preview** overlay shows the scene from the perspective of any camera entity in the scene
- An **FPS counter** displays viewport rendering performance

## Floating Toolbar

A floating toolbar sits over the viewport (hidden while a preview is running):

| Tool | Shortcut | Description |
|------|----------|-------------|
| **Add** | — | Menu to add entities, grouped into **Element** (Cube, Sphere, Cylinder, Cone, Box, Plane, Mirror), **Sound**, **Light**, and **FX** (Fire, Explosion, Trail, Rain, Snow, Fountain, Sky, Skybox, Water) |
| **Move** | `W` | Move the selected entity |
| **Rotate** | `E` | Rotate the selected entity |
| **Scale** | `R` | Scale the selected entity |
| **World / Local** | — | Switch between world and local coordinate space (also affects inspector transform fields) |
| **Snap** | — | Toggle grid snapping. The caret opens snap settings: position step presets (0.1 / 0.25 / 0.5 / 1 / 5 units, or custom) and a grid toggle |
| **Toggle helpers** | `H` | Show/hide light and camera helpers |
| **Toggle colliders** | — | Show/hide physics collider outlines |
| **Frame selected** | `F` | Center the camera on the selected entity |
| **Maximize viewport** | — | Expand the viewport to fullscreen |

## Hierarchy Panel

The hierarchy panel displays a tree view of all entities in the current scene, rooted at the **Level** node, with a live entity count badge and a search bar to filter the tree.

Click any entity in the hierarchy to select it in the viewport and open its properties in the inspector. You can also rename (double-click), delete, copy/paste, and reparent entities via drag-and-drop — see [Hierarchy](/editor/scene/hierarchy).

## Inspector Panel

The inspector panel shows the properties of the currently selected entity, organized in vertical icon tabs. Its contents change dynamically based on what is selected:

- **Mesh / Model** — Global (transform), Physics, Scripts, Material, Animations
- **Light** — Global, Scripts, Light (type-specific settings)
- **Particles / FX** — Emitter settings, emit mode, and per-effect parameters
- **Level** (root node) — General, Scripts, and **Simulation** (per-level physics such as gravity and tick rate)

See the [Inspector](/editor/inspector/properties) documentation for details on each property type.

## Assets Panel

Located below the viewport, the assets panel organizes all assets in the current level across tabs, each showing an item count, with a search bar and an upload button:

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

## Getting Started Tutorial

On your first visit, a **Getting Started** tutorial walks you through the basics — the scene, entities and hierarchy, visual coding, and build & publish. You can reopen it at any time from **Help → Getting Started**.
