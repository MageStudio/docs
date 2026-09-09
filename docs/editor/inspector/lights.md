# Lights

The inspector displays different properties depending on the type of light selected. This page covers the settings available for each light type.

## Common Light Properties

All lights share these base properties:

| Property | Description |
|----------|-------------|
| **Color** | The color of the emitted light |
| **Intensity** | Brightness of the light |

## Ambient Light

Ambient light provides uniform illumination to all objects in the scene regardless of their position or orientation. It has no direction and does not cast shadows.

| Property | Description |
|----------|-------------|
| **Color** | Light color |
| **Intensity** | Brightness |

::: tip
Use ambient light to set a base illumination level so that objects in shadow are not completely black.
:::

## Sun Light (Directional)

Sun light emits parallel rays in a single direction, simulating distant light sources like the sun. It supports shadow casting.

| Property | Description |
|----------|-------------|
| **Color** | Light color |
| **Intensity** | Brightness |
| **Cast Shadow** | Enable/disable shadow casting |
| **Shadow Map Size** | Resolution of the shadow map (higher = sharper shadows) |
| **Shadow Bias** | Offset to reduce shadow artifacts (shadow acne) |
| **Shadow Camera** | Near, far, and FOV settings for the shadow camera frustum |

## Spotlight

Spotlight emits light in a cone shape from a point, like a stage light or flashlight.

| Property | Description |
|----------|-------------|
| **Color** | Light color |
| **Intensity** | Brightness |
| **Distance** | Maximum range of the light (0 = infinite) |
| **Decay** | How the light fades with distance |
| **Angle** | Width of the light cone (in radians) |
| **Penumbra** | Softness of the cone edge (0 = hard, 1 = fully soft) |
| **Cast Shadow** | Enable/disable shadow casting |
| **Shadow Map Size** | Shadow resolution |
| **Shadow Bias** | Shadow offset to reduce artifacts |

## Point Light

Point light radiates equally in all directions from a single point, like a light bulb.

| Property | Description |
|----------|-------------|
| **Color** | Light color |
| **Intensity** | Brightness |
| **Distance** | Maximum range (0 = infinite) |
| **Decay** | Rate of falloff with distance |
| **Cast Shadow** | Enable/disable shadow casting |
| **Shadow Map Size / Bias / Camera Near & Far** | Shadow quality and artifact controls |

## Hemisphere Light

Hemisphere light simulates outdoor lighting with a sky color above and a ground color below, creating a natural gradient.

| Property | Description |
|----------|-------------|
| **Sky Color** | Color from above |
| **Ground Color** | Color from below |
| **Intensity** | Brightness |
