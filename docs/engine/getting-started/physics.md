# Physics

Mage engine relies on Ammo.js for its physics simulation. For the purpose of this guide, we're going to create an interesting demo: a fully controllable and physically simulated vehicle surrounded by obstacles.

?> There is an entire section of this documentation dedicated to physics. Please head [here](/engine/advanced/physics.md) when you're ready to find out more.

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

!> Remember to make sure the path to the `ammo.js` file is publicly reachable and defined in your configuration.

?> Once physics is enabled, the engine will automatically import `ammo.js` and start using it

The physics configuration object also allows you to set the gravity value for your game. You can tweak this value at any point during the lifecycle of your game using the [Physics API](/engine/advanced/physics.md) .

### Enabling phyisics on our elements:

So far, we added only a couple elements to our scene, a floor and a cube. Let's enable physics for both of them:

```js
// inside the level class
createFloor() {
    // same code as before
    floor.enablePhysics({ mass: 0 });
}

onCreate() {
    // same code as before
    cube.setPosition({y : 20 });
    cube.enablePhysics({ mass: 1 });
}
```

- `floor.enablePhysics()` and `cube.enablePhysics()` are all that's needed to enable physics for these two elements. The method requires a set of options:
  - `mass`: this is the most important value. When set to `0`, will make the element static. Any value above `0` will make the element dynamic.
- We increased the cube `y` position to `20`.

If everything has gone right, this is what you should be able to see now
