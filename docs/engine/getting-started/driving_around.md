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

In order to create our car, we're going to do a few things:
- Import the chassis
- Import the wheels
- Use one of the engine builtin scripts, called `BaseCar`. This will handle everything that's needed for the car to work just fine (Input handling, initial setup) and it's fully customisable.

?> The engine has a number of builtin scripts, and `BaseCar` is just one of them. Please head over to the dedicated page [here](/engine/advanced/scripting/scripts.md).

Let's create a couple new functions for this in our level:

?> Why are we creating a bunch of functions in the same file? For simplicity's sake.

```js
import {
    // previous imports
    Models
} from 'mage-engine';

// inside our level once again
createWheel(wheelNo) {
    return Models.get('wheel', { name: `wheel_${wheelNo}` });
}

createCar() {
    const car = Models.get('car', { name: 'mycar' });
    car.setPosition({ y: 14 });

    const wheels = [
        this.createWheel(1),
        this.createWheel(2),
        this.createWheel(3),
        this.createWheel(4),
    ];

    car.addScript(Scripts.BUILTIN.BASECAR, {
        wheels,
        mass: 100,
        wheelsOptions: {
            back: {
                axisPosition: -1.25,
                radius: .35,
                halfTrack: 1,
                axisHeight: 0
            },
            front: {
                axisPosition: 1.2,
                radius: .35,
                halfTrack: 1,
                axisHeight: 0
            }
        },
        suspensions: {
            stiffness: 20.0,
            damping: 2.3,
            compression: 4.4,
            restLength: 0.6
        }
    });

    return car;
}

onCreate() {
    // what we had before
    const car = this.createCar();
    
    // moving camera a bit further
    const camera = Scene.getCamera();
    camera.setPosition({ x: -10, y: 15, z: -10 });
    camera.lookAt({ x: 0, y: 0, z: 0 });
}
```

The creation process is pretty straightforward. Invoking `this.createCar` will import the chassis model into the scene, import 4 wheels, then assign the `BASECAR` builtin script to the car itself.

?> The `BASECAR` script is not very complicated, but it allows you to define a vehicle, its mass, suspensions and wheels in a very easy way. More information on that in its dedicated page [here](/engine/advanced/scripting/builtin/basecar.md).

?> For the purpose of this example, we moved the camera to be in `{ x: -10, y: 15, z: -10 }`, focused on the origin. This will allow us to watch the action a bit better. In the next guide the three lines setting the camera position will not be needed.

### How does this look like?

Run your application, and use `w`,`s`, `a`, and `d` to control the car. Hopefully, something like this: 

<video controls height="480" width="640" style="display: block; margin: auto; ">
     <source src="engine/getting-started/img/falling_car.mp4"
            type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

!> Quick note: we are spawning cubes in random positions with random rotations. This means that they might spawn underneath the car, making it flip. Just reload the page until everything runs fine! This is just a demo, so edge cases like this one are not covered.

## Follow that car!

This is looking quite nice, right? it would be even nicer if the camera was able to follow the car around! Luckily, this is easily obtainable using another builtin script, called `SMOOTH_CAR_FOLLOW`. Remember the few lines of code we just wrote where we placed the camera at a fixed position? Let's remove those and replace them with the following:

```js
Scene.getCamera().addScript(Scripts.BUILTIN.SMOOTH_CAMERA_FOLLOW, { target: car });
```

The script options must include a target, which is the car we just created.

?> The `SMOOTH_CAR_FOLLOW` script is configurable, and its API is fully described [here](/engine/advanced/scripting/builtin/smooth_car_follow.md).

Let's have a look at how it is now!

<video controls height="480" width="640" style="display: block; margin: auto; ">
     <source src="engine/getting-started/img/following_car.mp4"
            type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

In case you're wondering, jumping off the platform is not needed.

### What happens now?

We covered a lot of information over the past guides. We now know how to handle lights, scripts, user input, cameras and textures, as well as loading up models into the scene. There is one thing left to do, show the player a nice [UI](/engine/getting-started/ui.md);