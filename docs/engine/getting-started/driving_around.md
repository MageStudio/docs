# Driving around


First of all, let's import a car model into the scene.

## Imported vehicles

Let's download the two `.gltf` files linked to this page. One if for a base buggy model, the second for the wheel model.

<a href="/engine/getting-started/assets/buggy.gltf" download>Buggy model</a>
<br/>
<a href="/engine/getting-started/assets/wheel.gltf" download>Wheel model</a>

once you have both downloaded, you need to let the engine know where to find them. Update the assets configuration like so:

```js
const assets = {
    textures: {
        // previous textures
    },
    models: {
        buggy: '/path/to/the/buggy.gltf',
        wheel: 'path/to/the/wheel.gltf'
    }
}
```

Similarly to textures, the engine will preload the models and will make them available to use in your levels.


## Configuring the car