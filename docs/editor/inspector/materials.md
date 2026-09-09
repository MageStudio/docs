# Materials

The material tab in the inspector controls how a mesh or model is rendered. You can change the material type, adjust its properties, and apply textures.

## Material Types

Select a material type from the dropdown at the top of the material tab:

| Type | Description |
|------|-------------|
| **Basic** | Flat-colored material, not affected by lighting |
| **Lambert** | Diffuse material with simple lighting (non-glossy) |
| **Phong** | Glossy material with specular highlights |
| **Standard** | PBR material with metalness and roughness (most realistic) |
| **Toon** | Cartoon-style cel shading |
| **Depth** | Renders depth information (useful for effects) |

## Common Properties

These properties are available across all material types:

| Property | Description |
|----------|-------------|
| **Color** | Base color of the material |
| **Wireframe** | Render as wireframe instead of solid |
| **Transparent** | Enable transparency |
| **Opacity** | Transparency level (0 = invisible, 1 = fully opaque) |
| **Fog** | Whether the material is affected by scene fog |
| **Side** | Which face to render: Front, Back, or Double |

## Phong Properties

Additional properties when using the Phong material:

| Property | Description |
|----------|-------------|
| **Shininess** | How shiny the specular highlight is |
| **Emissive** | Self-illumination color |
| **Reflectivity** | Environment reflection amount |
| **Flat Shading** | Use flat shading instead of smooth |

## Standard (PBR) Properties

Additional properties when using the Standard material:

| Property | Description |
|----------|-------------|
| **Metalness** | How metallic the surface appears (0 = non-metal, 1 = fully metallic) |
| **Roughness** | Surface roughness (0 = mirror-smooth, 1 = fully rough) |
| **Emissive** | Self-illumination color |
| **Flat Shading** | Use flat shading instead of smooth |

## Texture Maps

Textures can be applied to standard and phong materials to add surface detail:

| Map | Description |
|-----|-------------|
| **Color Map** | Base color texture (albedo) |
| **Normal Map** | Surface detail without extra geometry |
| **Roughness Map** | Per-pixel roughness variation |
| **Metallic Map** | Per-pixel metalness variation |
| **AO Map** | Ambient occlusion for soft shadows in crevices |
| **Bump Map** | Height-based surface detail |

To apply a texture:

1. Upload an image via the [Assets Panel](/editor/assets/)
2. In the material tab, drop the image onto the texture slot you want to fill (or pick it from the asset picker)

### Texture Options

Once a texture is applied, its card expands to reveal per-texture options:

| Option | Description |
|--------|-------------|
| **Repeat X / Y** | How many times the texture tiles on each axis |
| **Offset X / Y** | Shifts the texture on each axis |
| **Wrapping** | What happens beyond the texture's edge: **Repeat**, **Clamp to edge**, or **Mirrored repeat** |
| **Mapping** | How the texture is projected: UV, Cube, or Equirectangular |

Wrapping is linked across both axes by default — use the link/unlink toggle to set the horizontal (S) and vertical (T) wrapping modes independently.

::: tip
The Standard material type provides the most realistic results and is recommended for most use cases. It uses physically-based rendering (PBR) which produces consistent, predictable lighting.
:::
