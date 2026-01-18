# Physics

Mage engine relies on Ammo.js for its physics simulation. For the purpose of this guide, we're going to create an interesting demo: a fully controllable and physically simulated vehicle surrounded by obstacles.

::: tip
There is an entire section of this documentation dedicated to physics. Please head [here](/engine/advanced/physics.md) when you're ready to find out more.
:::
:::



## Enabling physics

In order to have physics in our level, we need to enable it first. We will only need a couple steps to achieve that:

### Updating configuration:

We need to update the configuration to look like this:

```js
const config = {
    // previous configuration
    physics: {
        enabled: true,
        path: 'path/to/ammo.js',
        gravity: { x: 0, y: -9.8, z: 0}
    },
    // rest of configuration
};
```

Mage engine comes with the Ammo distributable included. Just head over to `node_modules/mage-engine/dist/ammo.js` , and copy the file to any destination in your project.

::: warning
Remember to make sure the path to the `ammo.js` file is publicly reachable and defined in your configuration.
:::

::: tip
Once physics is enabled, the engine will automatically import `ammo.js` and start using it
:::
:::



The physics configuration object also allows you to set the gravity value for your game. You can tweak this value at any point during the lifecycle of your game using the [Physics API](/engine/advanced/physics.md) .

### Enabling phyisics on our elements:

So far, we added only a couple elements to our scene, a floor and a cube. Let's enable physics for both of them:

```js
// inside the level class
createFloor() {
    // same code as before
    floor.enablePhysics({ mass: 0 });
}

onUpdate(dt) {
    if (cameraTarget) {
        Scene.getCamera().lookAt(this.cameraTarget.getPosition());
    }
}

onCreate() {
    // same code as before
    cube.setPosition({ y : 50 });
    cube.setRotation({ x: Math.random(), y: Math.random(), z: Math.random() });
    cube.enablePhysics({ mass: 0.1 });

    this.cameraTarget = cube;
}
```

- `floor.enablePhysics()` and `cube.enablePhysics()` are all that's needed to enable physics for these two elements. The method requires a set of options:
  - `mass`: this is the most important value. When set to `0`, will make the element static. Any value above `0` will make the element dynamic.
- We increased the cube `y` position to `50`.
- We set a random rotation for the cube using `cube.setRotation()`.

- `onUpdate` : this is a level lifecycle method. It will be invoked at every frame, and it will receive the elapsed delta time as parameter. In here, we're telling the camera to look at the camera target (the cube).

::: tip
More information on the `onUpdate` and other lifecycle methods can be found [here](/engine/advanced/core/level.md).
:::
:::



If everything has gone right, this is what you should be able to see now:

<video controls height="480" width="640" style="display: block; margin: auto; ">
     <source src="/engine/getting-started/img/falling_purple_cube.mp4"
            type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

### From one to many
Sure, one falling cube looks nice, but what about 50 small ones? We can have something like this:

```js
    import {
        // previous imports
        math
    } from 'mage-engine';

    // inside our level
    generateCubes() {
        for (let i=0; i<50; i++) {
            const cube = new Cube(1);
            cube.setName(`${i}`);
            cube.setTextureMap('purple');
            cube.setPosition({
                x: math.randomIntFromInterval(-10, 10),
                y: Math.random() * 5 + 10,
                z: math.randomIntFromInterval(-10, 10)
            });
            cube.setRotation({
                x: Math.random(),
                y: Math.random(),
                z: Math.random()
            });

            cube.setMaterialFromName(constants.MATERIALS.STANDARD);

            cube.enablePhysics({ mass: .1 });
        }
    }

    onUpdate() {
        // if (cameraTarget) {
        //     Scene.getCamera().lookAt(this.cameraTarget.getPosition());
        // }
    }

    onCreate() {
        // same as before
        this.generateCubes();
    }
```

## Let's go for a drive now

We created a platform, we created 50 "obstacles". What's the best way to proceed? Drive through the obstacles and watch them flying! Let's start [driving around](/engine/getting-started/driving-around.md).