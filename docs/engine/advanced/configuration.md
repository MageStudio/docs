# Configuration

In order to configure your Mage application, you don't need to create specific config files. The only thing you need to do is to instruct Router how to start your application: for this to happen properly, you need to provide a basic configuration (for lights, physics, screen and camera configuration) as well as your assets definition.

An example configuration would look like this:

```js
import { Router } from 'mage-engine';
import Intro from './intro';
import First from './first';

const assets = {
    'models': {
        'player': 'assets/models/player.gltf'
    },
    'textures': {
        'playerTexture': 'assets/textures/player.png'
    },

    '/': {
        'models': {
            'modelForThisLevel': 'assets/models/box.gltf'
        }
    },
    '/2dlevel': {
        'textures': {
            'spriteTexture': 'assets/textures/sprite.png'
        }
    }
};

const config = {
    screen: {
        h : window ? window.innerHeight : 800,
        w : window ? window.innerWidth : 600,
        ratio : window ? (window.innerWidth / window.innerHeight) : (600/800),
        frameRate : 60,
        alpha: true
    },

    postprocessing: {
        enabled: true
    },

    lights: {
        shadows: true
    },

    physics: {
        enabled: false,
        path: './mage.physics.js'
    },

    tween: {
        enabled: false
    },

    camera: {
        fov: 75,
        near: 0.1,
        far: 3000000
    },

    fog: {
        enabled: false,
        density: 0,
        color: '#ffffff'
    },
};

window.addEventListener('load', function() {
    Router.on('/', Intro);
    Router.on('/level', First);

    Router.start(config, assets, '#gameContainer');
});
```

Let's break it down: we're going to see how to configure your app, define your assets and provide these data to the Router module.

> A full explanation of the Router module is available [here](/engine/advanced/router.md).

---

## Configuration

Mage configuration is split in a few different blocks.

### screen

```json
screen: {
    h,
    w,
    ratio,
    frameRate,
    alpha
}
```
- `h: number`: is the height of the area you're using to display your application. If fullscreen, you can use `window.innerHeight`.
- `w: number`: is the width of the area you're using to display your application. If fullscreen, you can use `window.innerWidth`.
- `ratio: number`: is the ratio between `width` and `height`.
- `frameRate: number`: this value will be used in one of the callbacks.
- `alpha: boolean`: This boolean toggles transparency.

### postprocessing

The postprocessing block is only meant to either enable or disable postprocessing in your levels. Adding or removing effects can be done via code in your Level.

```json
postprocessing: {
    enabled
}
```
- `enabled: boolean`: This toggles Postprocessing for your level.

!> If `enabled=false`, adding effects to the postprocessing pipeline will resul in no effects being displayed on the screen.

### lights

```json
 lights: {
    shadows,
    shadowType,
    textureAnisotropy
}
```
- `shadows: boolean`: This boolean toggles shadows.
- `shadowType: string`: This option sets the type of shadows to be used in your application. Possible options are:

```js
const SHADOW_TYPES = {
    BASIC: 'BASIC',
    SOFT: 'SOFT',
    HARD: 'HARD',
};
```
- `textureAnisotropy: number`: This will determine the anisotropy for textures.

?> For more information about texture anisotropy, please refer to the official Three.js documentation [here](https://threejs.org/docs/?q=texture#api/en/textures/Texture.anisotropy).

### physics

```json
physics: {
    enabled,
    path
},
```

- `enabled: boolean`: This boolean toggles physics.
- `path: string`: This property refers to the position of the physics worker.

?> Mage uses a WebWorker for Physics handling, thanks to [AmmoJS](https://github.com/kripken/ammo.js/). For more information about enabling and working with Physics, refer to its page [here](/engine/advanced/physics.md).

### tween

Mage uses a tweening library to handle smooth transitions from one state tom another. You can enable/disable it using this property.

```json
tween: {
    enabled
}
```

- `enabled: boolean`: This boolean toggles the tweening library.

### camera

```json
camera: {
    fov,
    near,
    far
}
```

- `fov: number`: This represents the field of view for your camera.
- `near: number`: This value represents the distance of the `near` plane from the camera.
- `far: number`: This value represents the distance of the `far` plane from the camera.

### fog

```json
fog: {
    enabled,
    density,
    color
}
```

- `enabled: boolean`: This boolean toggles fog in your levels.
- `density: number`: this value changes the density of the fog.
- `color: string`: This is the hex string of the fog color.

----

## Assets Definition

Mage assets definition is a Javascript object that describes which assets your application needs. Mage handles a specific set of assets: `Textures`, `Images`, `Models` and `Audio` (for now...). You can also define level specific assets as well as application specific ones. Mage will take care of your assets loading automatically, and will provide an easy access to them once they're ready to be used.

### The structure

Here is how a sample assets definition would look like:

```javascript
const assets = {
    'models': {
        'player': 'assets/models/player.gltf'
    },
    'textures': {
        'playerTexture': 'assets/textures/player.png'
    },
    'audio': {
        'rain': 'assets/audio/rain.mp3'
    },
    'images': {
        'poster1': 'assets/images/poster1.png'
    }
};
```

?> Each entry of this object is a key value pair. The key represents the id of the asset, and will be used to retrieve it in your code. The value is the path there the asset is located in your project.

As said before, here are the allowed assets types:

```js
const ASSETS_TYPES = [
    'textures',
    'images',
    'models'
    'audio'
];
```

### Application assets

The root level of the assets definition object is where you will define assets that are being shared across levels. This means you can follow the structure defined above and just add more entries to each category of asset. This changes a bit when it comes to level specific assets.

### Level assets

Mage allows you to define assets that will only be loaded when their level is loaded. This allows you to load only what you need, when you need it. The definition of these assets is very similar and follow the same structure, but you need to proceed like follow:

```js
const assets = {
    // general assets
    'models': {
        'player': 'assets/models/player.gltf'
    },
    'textures': {
        'playerTexture': 'assets/textures/player.png'
    },
    'audio': {
        'rain': 'assets/audio/rain.mp3'
    },
    'images': {
        'poster1': 'assets/images/poster1.png'
    }


    // assets for the root level
    '/': {
        'models': {
            'modelForThisLevel': 'assets/models/box.gltf'
        },
        'audio': {
            'modelSteps': 'assets/audio/steps.mp3',
            'thunder': 'assets/audio/thunder.mp3'
        }
    },

    // assets for the level "2dlevel"
    '/2dlevel': {
        'textures': {
            'spriteTexture': 'assets/textures/sprite.png'
        }
    }
};
```

as you can see, we now a deeper structure: we are defining assets for the root level `/` and for `/2dlevel`. For each level, the structure is the same as above.

---

## Router initialisation

This is one of the most important steps of your application, the one that starts the engine and loads the configuration. In the example above, we're pretending to have an application with two levels.

```js
window.addEventListener('load', function() {
    Router.on('/', Intro);
    Router.on('/2dlevel', First);

    Router.start(config, assets, '#gameContainer');
});
```
In this example, we're using the `load` even on the window object to initialise Router. We're not going to explain what the `Router.on(..)` method does here, since there is a detailed explanation in the Router module page. What we care about is the next line:

```js
Router.start(config, assets, '#gameContainer');
```

This line is calling the `start()` method on Router, which is currently accepting three parameters:
- `config`: this is the configuration object we defined earlier.
- `assets`: this is the assets definition object, which we just explained.
- `'#gameContainer'`: this is the DOM selector for the container of your application. If Mage fails to find the given selector, it will generate a container automatically.

After calling the `.start` method, your application will start (hopefully).

?> A more in depth explanation of how the Router module works, how it handles levels and which methods exposes can be found [here](/engine/advanced/router.md).