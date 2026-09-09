# Adding Elements

You can add new entities to your scene using the **Add** menu in the floating toolbar or by dragging assets from the assets panel into the viewport.

## Element Types

The Add menu is organized into four categories:

### Element

Basic geometric shapes and special surfaces:

| Element | Description |
|---------|-------------|
| **Cube** | A unit cube mesh |
| **Sphere** | A sphere mesh |
| **Cylinder** | A cylinder mesh |
| **Cone** | A cone mesh |
| **Box** | A box mesh (similar to cube with separate dimensions) |
| **Plane** | A flat plane mesh |
| **Mirror** | A reflective planar surface |

### Light

Light sources that illuminate the scene:

| Element | Description |
|---------|-------------|
| **Ambient Light** | Uniform light that affects all objects equally |
| **Sun** | Directional light with shadow support (like sunlight) |
| **Spot Light** | Cone-shaped light with angle and penumbra controls |
| **Point Light** | Light that radiates in all directions from a point |
| **Hemisphere Light** | Gradient light from sky color to ground color |

### Sound

Sound sources placed in the scene:

| Element | Description |
|---------|-------------|
| **Ambient Sound** | Non-directional background audio |
| **Directional Sound** | Positional audio that changes with listener distance |

### FX

Particle effects and scenery:

| Element | Description |
|---------|-------------|
| **Fire / Explosion / Trail / Rain / Snow / Fountain** | Particle emitters, fully configurable in the inspector |
| **Sky** | Procedural sky |
| **Skybox** | Cube-mapped sky |
| **Water** | Animated water surface |

## Adding Models

To add imported 3D models to the scene:

1. Upload the model file (GLTF, FBX, OBJ, etc.) via the [Assets Panel](/editor/assets/)
2. Drag the model from the assets panel into the viewport, or select it from the available models

## Drag and Drop Import

You can also drag files directly from your file system into the 3D viewport. The editor will automatically upload the file as an asset and add it to the scene.

::: tip
After adding an element, it appears at the scene origin (0, 0, 0). Use the [transform gizmos](/editor/scene/viewport) to move it to the desired position.
:::
