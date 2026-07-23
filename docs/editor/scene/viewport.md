# 3D Viewport

The 3D viewport is the central area of the editor where you view and interact with your scene in real time. It renders your scene using the Mage Engine (built on THREE.js) and provides tools for selecting and transforming entities.

## Navigation

Use standard orbit controls to navigate the viewport:

- **Rotate** — Right-click and drag to orbit around the scene
- **Pan** — Middle-click and drag to pan the camera
- **Zoom** — Scroll the mouse wheel to zoom in and out

## Selecting Entities

Click on any entity in the viewport to select it. When an entity is selected:

- A transform gizmo appears on the entity
- The entity is highlighted in the [Hierarchy Panel](/editor/scene/hierarchy)
- Its properties are displayed in the [Inspector](/editor/inspector/properties)

To deselect, press `Esc` or click on empty space in the viewport. Press `F` to frame the camera on the selected entity.

## Transform Gizmos

Transform gizmos let you manipulate the selected entity directly in the viewport. Switch between modes using the floating toolbar or keyboard shortcuts:

| Mode | Shortcut | Description |
|------|----------|-------------|
| **Move** | `W` | Move the entity along one or more axes |
| **Rotate** | `E` | Rotate the entity around one or more axes |
| **Scale** | `R` | Scale the entity along one or more axes |

Transform edits made with gizmos (and in the inspector) can be undone with `Ctrl/Cmd+Z` and redone with `Ctrl/Cmd+Shift+Z`.

### Coordinate Space

Toggle between **World** and **Local** coordinate space using the space toggle in the floating toolbar:

- **World** — Gizmo axes align with the world coordinate system. Inspector position/rotation fields show world values for child entities
- **Local** — Gizmo axes align with the entity's own orientation

### Snap to Grid

Enable the **Snap** toggle in the floating toolbar to constrain transforms to a fixed step. Open the snap settings (caret next to the toggle) to pick a position step — presets of 0.1, 0.25, 0.5, 1 or 5 units, or a custom value — and to toggle the reference grid.

## View Helpers

The floating toolbar also provides view options:

- **Toggle helpers** (`H`) — show/hide light and camera helper gizmos
- **Toggle colliders** — show/hide physics collider outlines for the whole scene
- **Maximize viewport** — expand the viewport to fullscreen

## Drag and Drop

You can drag files directly from your file system into the viewport to import them as assets. Supported file types include 3D models (GLTF, FBX, OBJ), images, audio files, and more.

## Camera Preview

When your scene contains a camera entity, a small preview overlay appears in the corner of the viewport. This preview shows the scene from the camera's perspective in real time, giving you a quick look at how the game will appear to the player without leaving the editor. To actually play the game inside the editor, use the [Game Preview](/editor/scene/preview).

## Loading Feedback

When assets are loading (e.g. after adding a large model), the viewport displays a loading indicator with a progress message so you know the editor is working. An FPS counter shows viewport rendering performance.

## Entity Picker Mode

When working with [visual scripts](/editor/scripting/visual-scripts), the viewport can enter **entity picker mode**. In this mode, clicking on an entity in the viewport selects it as a reference for the script node you're editing, rather than selecting it for normal editing.
