# 3D Viewport

The 3D viewport is the central area of the editor where you view and interact with your scene in real time. It renders your scene using the Mage Engine (built on THREE.js) and provides tools for selecting and transforming entities.

## Navigation

Use standard orbit controls to navigate the viewport:

- **Rotate** — Click and drag with the middle mouse button (or right mouse button) to orbit around the scene
- **Pan** — Hold `Shift` + middle mouse button to pan the camera
- **Zoom** — Scroll the mouse wheel to zoom in and out

## Selecting Entities

Click on any entity in the viewport to select it. When an entity is selected:

- A transform gizmo appears on the entity
- The entity is highlighted in the [Hierarchy Panel](/editor/scene/hierarchy)
- Its properties are displayed in the [Inspector](/editor/inspector/properties)

To deselect, click on empty space in the viewport.

## Transform Gizmos

Transform gizmos let you manipulate the selected entity directly in the viewport. Switch between modes using the left toolbar or keyboard shortcuts:

| Mode | Shortcut | Description |
|------|----------|-------------|
| **Translate** | `T` | Move the entity along one or more axes |
| **Rotate** | `R` | Rotate the entity around one or more axes |
| **Scale** | `S` | Scale the entity along one or more axes |

### Coordinate Space

Toggle between **Global** and **Local** coordinate space using the space toggle button in the left toolbar:

- **Global** — Gizmo axes align with the world coordinate system
- **Local** — Gizmo axes align with the entity's own orientation

### Snap to Grid

Enable the **Snap** toggle in the left toolbar to constrain transforms to 10-unit increments. This is useful for precise placement and alignment.

## Drag and Drop

You can drag files directly from your file system into the viewport to import them as assets. Supported file types include 3D models (GLTF, FBX, OBJ), images, audio files, and more.

## Camera Preview

When your scene contains a camera entity, a small preview overlay appears in the bottom-right corner of the viewport (200x150 pixels). This preview shows the scene from the camera's perspective in real time, giving you a quick look at how the game will appear to the player without leaving the editor.

## Loading Feedback

When assets are loading (e.g. after adding a large model), the viewport displays a loading indicator with a progress message so you know the editor is working.

## Entity Picker Mode

When working with [visual scripts](/editor/scripting/visual-scripts), the viewport can enter **entity picker mode**. In this mode, clicking on an entity in the viewport selects it as a reference for the script node you're editing, rather than selecting it for normal editing.
