# Configuration

## Understanding Mage Configuration

Mage applications are configured through two main objects that you pass to `Router.start()`:

1. **config** - Controls rendering, physics, camera, and visual settings
2. **assets** - Defines what resources (models, textures, audio) to load

This approach keeps configuration centralized and makes it easy to adjust settings without digging through code.

---

## Quick Start Example

Here's a complete configuration for a typical 3D game:

```javascript
import { Router } from 'mage-engine';
import MenuLevel from './levels/Menu';
import GameLevel from './levels/Game';

// What resources to load
const assets = {
    models: {
        player: 'assets/models/player.gltf',
        enemy: 'assets/models/enemy.gltf'
    },
    textures: {
        ground: 'assets/textures/grass.png',
        sky: 'assets/textures/sky.jpg'
    }
};

// How the engine behaves
const config = {
    screen: {
        h: window.innerHeight,
        w: window.innerWidth,
        ratio: window.innerWidth / window.innerHeight,
        frameRate: 60,
        alpha: false
    },
    
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000
    },
    
    lights: {
        shadows: true,
        shadowType: 'SOFT'
    },
    
    physics: {
        enabled: true,
        path: './mage.physics.js'
    },
    
    postprocessing: {
        enabled: true
    }
};

// Start the app
window.addEventListener('load', () => {
    Router.on('/', MenuLevel);
    Router.on('/game', GameLevel);
    Router.start(config, assets, '#gameContainer');
});
```

---

## Configuration Blocks

### screen

Controls the rendering canvas and frame rate.

```javascript
screen: {
    h: window.innerHeight,      // Canvas height
    w: window.innerWidth,       // Canvas width  
    ratio: window.innerWidth / window.innerHeight,
    frameRate: 60,              // Target FPS
    alpha: true                 // Transparent background?
}
```

**When to adjust:**
- **alpha: true** - When overlaying the game on HTML content
- **frameRate** - Lower for mobile/performance, higher for smooth animation

### camera

Configures the default perspective camera.

```javascript
camera: {
    fov: 75,     // Field of view (degrees)
    near: 0.1,   // Closest visible distance
    far: 1000    // Farthest visible distance
}
```

**Understanding these values:**
- **fov** (Field of View): Higher = wider view, more distortion. 75° is a good default.
- **near/far** (Clipping planes): Objects outside this range aren't rendered. Keep `near` small and `far` as small as practical for better depth precision.

::: tip
For large open worlds, increase `far`. For detailed indoor scenes, keep it smaller for better visual quality.
:::

### lights

Controls global lighting and shadow behavior.

```javascript
lights: {
    shadows: true,            // Enable shadows globally
    shadowType: 'SOFT',       // 'BASIC', 'SOFT', or 'HARD'
    textureAnisotropy: 16     // Texture quality (1-16)
}
```

**Shadow types:**
- **BASIC** - Fastest, blocky shadows
- **SOFT** - Best looking, smoothed edges (recommended)
- **HARD** - Sharp, defined shadows

::: warning
Shadows are expensive. On mobile, consider `shadows: false` or `shadowType: 'BASIC'`.
:::

### physics

Enables the physics simulation powered by Ammo.js.

```javascript
physics: {
    enabled: true,
    path: './mage.physics.js'   // Path to physics worker
}
```

**Why a separate path?** Mage runs physics in a Web Worker for performance. The `path` tells Mage where to find this worker script.

::: tip
See the [Physics guide](/engine/advanced/physics) for detailed physics configuration.
:::

### postprocessing

Enables visual effects pipeline (bloom, blur, color grading, etc.).

```javascript
postprocessing: {
    enabled: true
}
```

::: warning
When `enabled: false`, any effects you add in code will be silently ignored. This is useful for quick performance testing.
:::

### tween

Enables smooth value interpolation for animations.

```javascript
tween: {
    enabled: true
}
```

Used for smooth camera movements, UI transitions, and any value that needs to animate from A to B.

### fog

Adds atmospheric depth fog to the scene.

```javascript
fog: {
    enabled: true,
    density: 0.01,
    color: '#a0a0a0'
}
```

**Use fog for:**
- Hiding the far clipping plane
- Creating atmosphere (mist, haze)
- Guiding player attention

---

## Assets Configuration

Assets define what resources Mage should load. The structure supports both global assets (available everywhere) and level-specific assets.

### Global Assets

Loaded once, available in all levels:

```javascript
const assets = {
    models: {
        player: 'assets/models/player.gltf'
    },
    textures: {
        ui_button: 'assets/textures/button.png'
    },
    audio: {
        click: 'assets/audio/click.mp3'
    }
};
```

### Level-Specific Assets

Loaded only when entering a specific level, unloaded when leaving:

```javascript
const assets = {
    // Global assets
    models: {
        player: 'assets/models/player.gltf'
    },
    
    // Only loaded for the '/' route
    '/': {
        textures: {
            menu_bg: 'assets/textures/menu.jpg'
        }
    },
    
    // Only loaded for '/game' route
    '/game': {
        models: {
            enemy: 'assets/models/enemy.gltf',
            powerup: 'assets/models/powerup.gltf'
        },
        textures: {
            level1_ground: 'assets/textures/grass.png'
        }
    }
};
```

**Why level-specific assets?** Loading everything upfront takes time and memory. By specifying per-level assets, Mage only loads what's needed, improving startup time and memory usage.

---

## Asset Types

| Type | Description | Formats |
|------|-------------|---------|
| `models` | 3D objects | GLTF, GLB |
| `textures` | Images for materials | PNG, JPG, WebP |
| `audio` | Sound effects & music | MP3, WAV, OGG |
| `videos` | Video textures | MP4, WebM |

::: tip
For detailed asset loading patterns, see the [Assets documentation](/engine/advanced/assets/loading).
:::

---

## Router Integration

The Router uses your configuration to:

1. Set up the rendering engine
2. Configure physics (if enabled)
3. Load global assets
4. Match URL paths to levels
5. Load level-specific assets when navigating

```javascript
Router.on('/', MenuLevel);
Router.on('/game', GameLevel);
Router.on('/game/:levelId', GameLevel);  // Dynamic routes

Router.start(config, assets, '#container');
```

The third parameter (`#container`) is a CSS selector for the DOM element where the game canvas will be inserted.

::: tip
Learn more about routing in the [Router documentation](/engine/advanced/router).
:::