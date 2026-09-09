# Element

Every physical object you add to your level is an instance of the Element class. This class extends the Entity class, which is described in its own page [here](/engine/advanced/core/entity.md).

By "physical object", we mean Models and each of the Base Elements. Each base element is described in its page.

- [Cube](/engine/advanced/core/base/cube.md)
- [Box](/engine/advanced/core/base/box.md)
- [Sphere](/engine/advanced/core/base/sphere.md)
- [Cylinder](/engine/advanced/core/base/cylinder.md)
- [Plane](/engine/advanced/core/base/plane.md)
- [Line](/engine/advanced/core/base/line.md)
- [CurvedLine](/engine/advanced/core/base/curvedline.md)
- [Grid](/engine/advanced/core/base/grid.md)
- [Sprite](/engine/advanced/core/base/sprite.md)
- [AnimatedSprite](/engine/advanced/core/base/animatedsprite.md)

::: tip
For Models documentation, please refer to this page [here](/engine/advanced/assets/models.md).
:::
:::



---

## Methods

#### constructor({ geometry: ThreeGeometry, material: ThreeMaterial, body: ThreeMesh, ...options: Object })

The Element constructor will set the body if:
- either both geometry and material are provided.
- or a body is provided.

::: tip
Element extends Entity, so refer to the the Entity constructor for additional information ([here](/engine/advanced/core/entity.md?id=constructor)).
:::
:::



- `options` gives the Element constructor additional information. Here are the currently supported values:
  - `name: string`: If not provided, Mage will create one by default.
  - `addUniverse: boolean`: (default: `true`). This flag determines whether the element will receive updates or not. When set to `false`, the element will be rendered on the screen, but it will not receive updates.
  - `tags: string[]`: A list of initial tags for this element.

::: tip
For more information about tags, please refer to the Entity document page [here](/engine/advanced/core/entity.md).
:::
:::



#### setName(name: string, options?: object)

This method sets the name of this element.

- `options` is optional, and only supports one value:
  - `replace` (default: `false`): if this value is set to `true`, the current ThreeMesh will be disposed and replaced.

#### setColor(color: string|number)

- `color` can be a string representation of a color (e.g. 'black', '#fefefe'), or its hex value (e.g. 0x000000 for black).

#### setTexture(textureId: string, textureType?: string, options?: Object)

This method sets a texture on one of the element's material slots.

- `textureId: string`: This represents the texture you want to map on this element. It has to be a valid textureId, defined in your `assets` definition.
- `textureType: string` (default: `'map'`): The material slot to set — one of `map`, `alphaMap`, `aoMap`, `envMap`, `lightMap`, `specularMap`, `emissiveMap`, `bumpMap`, `displacementMap`, `normalMap`, `metalnessMap`, `roughnessMap`, `gradientMap`.
- `options: Object`:
  - `repeat: { x, y }` (default: `{ x: 1, y: 1 }`): how many times the texture repeats on each axis.
  - `offset: { x, y }` (default: `{ x: 0, y: 0 }`, since `v3.27.2`): texture offset on each axis.
  - `wrapS` / `wrapT` (since `v3.27.3`): per-axis wrapping mode (THREE wrapping constants). The legacy single `wrap` option is still supported as a fallback for both axes (default: `RepeatWrapping`).

```javascript
box.setTexture('crate', 'map', {
    repeat: { x: 4, y: 4 },
    offset: { x: 0.5, y: 0 }
});
```

::: tip
Please refer to the page explaining how to load textures in your applications [here](/engine/advanced/assets/images_and_textures.md)
:::

#### setTextureOptions(textureType?: string, options?: Object)

Since `v3.27.2`. Updates the options of an **already-set** texture without changing the texture itself. The options are merged over the current ones — only the keys you pass are replaced.

```javascript
// Tweak just the repeat — offset and wrapping are preserved:
box.setTextureOptions('map', { repeat: { x: 8, y: 8 } });
```

#### setTextureMap(textureId: string, options: Object)

::: warning Deprecated
`setTextureMap` forwards to `setTexture(textureId, 'map', options)`. Use `setTexture` instead.
:::



#### setMaterialFromName(materialName: MaterialType, options; Object)`

This method changes the type of material used for this element. 

- `materialName` can be one of the following values:
```js
const MATERIALS = {
    LAMBERT: 0,
    PHONG: 1,
    DEPTH: 2,
    STANDARD: 3,
    BASIC: 4
};
```
- `options: object`: These options will be passed to the Material.

#### setOpacity(value: number)

- `value` (default: `1`): This value sets the opacity of this element. Value can only assume values between `0` and `1`.

#### setWireframe(flag: boolean)

- `flag`: when it's set to true, this element will be rendered as wireframe.

#### setWireframeLineWidth(width: number)

- `width` will set the width of the wireframe lines. In order for this to work, you need to call `element.setWireframe(true)` first.

#### toJSON()

This will return a JSON representation of this element.

#### boundingBox

Since `v3.25.7`, `element.boundingBox` (a THREE `Box3`) is auto-computed from the element's geometry — or, for models, the largest bounding box across children — and can be **overridden** with your own `Box3`. Physics collider sizing uses it when computing collider dimensions:

```javascript
import { Box3, Vector3 } from 'three';

element.boundingBox = new Box3(
    new Vector3(-1, 0, -1),
    new Vector3(1, 2, 1)
);
```

---

### Animations

Since `v3.24.4`, skinned models and their skeletons are handled correctly, and animations support smooth crossfading.

#### playAnimation(id: string, options?: Object)

If this element has animations and the required `id` is a valid animation identifier, that animation will be played. If another animation is already playing, the engine automatically crossfades to the new one.

- `options: { loop, blendDuration = 0.3, timeScale = 1, weight = 1, clampWhenFinished = true }`

#### crossFadeTo(id: string, options?: Object)

Smoothly blends from the currently playing animation to `id`.

- `options: { blendDuration = 0.3, loop, timeScale = 1, warp = false, clampWhenFinished = true }`
- `warp: true` synchronises time scales during the fade — useful for walk → run transitions.

```javascript
model.playAnimation('Idle');
model.crossFadeTo('Run', { blendDuration: 0.25 });
```

#### stopAnimation(id?: string, fadeOutDuration?: number)

Stops the given animation (or the current one when `id` is omitted), optionally fading it out.

#### stopAllAnimations()

#### setAnimationWeight(id: string, weight: number, fadeDuration?: number)

Sets an animation's blend weight (`0`–`1`) for layered blending.

#### setAnimationTimeScale(id: string, timeScale: number)

#### getAnimationDuration(id: string): number

#### isAnimationPlaying(id: string): boolean

#### getAvailableAnimations(): string[]

If this element has animations, this method will return a list of their names.

---

### Physics

#### enablePhysics(options: object)

If physics are enabled, this will add this element to the Physics Engine.

::: tip
For a better description of the `options` object, have a look at the Physics page [here](/engine/advanced/physics.md).
:::
:::



#### setLinearVelocity(velocity: Object) / getLinearVelocity()

#### setAngularVelocity(velocity: Object) / getAngularVelocity()

#### getPhysicsState(key?: string)

#### setColliders(vectors: array, options: array)

#### checkCollisions()

#### isCollidingOnDirection(direction: string)
