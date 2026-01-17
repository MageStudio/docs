# Loading Assets

Mage provides a unified asset loading system that handles models, textures, audio, and more. Assets are defined in configuration and loaded automatically when levels start.

## Asset Configuration

Define assets in your Router configuration:

```javascript
import { Router } from 'mage-engine';

const assets = {
    // Global assets (always loaded)
    models: {
        'player': 'models/player.gltf'
    },
    textures: {
        'ground': 'textures/ground.png'
    },
    audio: {
        'music': 'audio/background.mp3'
    },
    
    // Level-specific assets
    '/game': {
        models: {
            'enemy': 'models/enemy.fbx'
        }
    }
};

Router.on('/', MenuLevel);
Router.on('/game', GameLevel);
Router.start(config, assets);
```

---

## Asset Types

| Type | Key | Description |
|------|-----|-------------|
| Models | `models` | 3D models (GLTF, FBX, OBJ) |
| Textures | `textures` | Image textures |
| Images | `images` | 2D images for sprites/UI |
| Cube Textures | `cubetextures` | Skybox cubemaps (6 images) |
| Audio | `audio` | Sound effects and music |
| Video | `video` | Video files |

---

## Global vs Level Assets

### Global Assets

Loaded once at startup, available in all levels:

```javascript
const assets = {
    models: {
        'player': 'models/player.gltf'  // Always available
    }
};
```

### Level-Specific Assets

Loaded when entering a specific level:

```javascript
const assets = {
    // Global
    models: { 'player': 'models/player.gltf' },
    
    // Only for /forest level
    '/forest': {
        models: {
            'tree': 'models/tree.glb',
            'rock': 'models/rock.glb'
        },
        textures: {
            'grass': 'textures/grass.png'
        }
    },
    
    // Only for /desert level
    '/desert': {
        models: {
            'cactus': 'models/cactus.glb'
        },
        textures: {
            'sand': 'textures/sand.png'
        }
    }
};
```

---

## Texture Loading

```javascript
const assets = {
    textures: {
        'wood': 'textures/wood.jpg',
        'metal': 'textures/metal.png',
        'normal_map': 'textures/normal.png'
    },
    images: {
        'logo': 'images/logo.png',
        'icon': 'images/icon.svg'
    }
};
```

### Using Textures

```javascript
import { Images, Cube } from 'mage-engine';

// Get loaded texture
const texture = Images.get('wood');

// Apply to element
const cube = new Cube(10, 0xffffff);
cube.setTexture('map', 'wood');
cube.setTexture('normalMap', 'normal_map');
```

---

## Cubemap Textures

For skyboxes and environment maps:

```javascript
const assets = {
    cubetextures: {
        'skybox': [
            'skybox/px.jpg',  // Positive X (right)
            'skybox/nx.jpg',  // Negative X (left)
            'skybox/py.jpg',  // Positive Y (top)
            'skybox/ny.jpg',  // Negative Y (bottom)
            'skybox/pz.jpg',  // Positive Z (front)
            'skybox/nz.jpg'   // Negative Z (back)
        ]
    }
};
```

### Using Cubemaps

```javascript
import { Skybox } from 'mage-engine';

const skybox = new Skybox({ texture: 'skybox' });
```

---

## Audio Loading

```javascript
const assets = {
    audio: {
        'bgMusic': 'audio/music.mp3',
        'jump': 'audio/jump.wav',
        'explosion': 'audio/explosion.ogg'
    }
};
```

### Using Audio

```javascript
import { Audio } from 'mage-engine';

// Play sound
Audio.play('jump');

// Play with options
Audio.play('bgMusic', { loop: true, volume: 0.5 });
```

---

## Loading Progress

Mage automatically shows a loading screen while assets load. Customize it in configuration:

```javascript
const config = {
    // Loading screen options
    loader: {
        backgroundColor: '#000000',
        textColor: '#ffffff',
        progressColor: '#f1c40f'
    }
};
```

---

## Asset Paths

### Relative Paths

```javascript
models: {
    'car': 'models/car.gltf'  // Relative to your app root
}
```

### Absolute Paths

```javascript
models: {
    'car': '/assets/models/car.gltf'  // From server root
}
```

### External URLs

```javascript
models: {
    'car': 'https://cdn.example.com/models/car.gltf'
}
```

---

## Complete Example

```javascript
import { Router } from 'mage-engine';
import { MenuLevel, GameLevel, BossLevel } from './levels';

const config = {
    screen: {
        ratio: window.innerWidth / window.innerHeight
    }
};

const assets = {
    // Global assets
    models: {
        'player': 'models/player.gltf'
    },
    textures: {
        'ui_button': 'textures/button.png'
    },
    audio: {
        'click': 'audio/click.wav',
        'music': 'audio/menu_music.mp3'
    },
    
    // Menu level
    '/': {
        images: {
            'logo': 'images/logo.png'
        }
    },
    
    // Game level
    '/game': {
        models: {
            'enemy': 'models/enemy.fbx',
            'powerup': 'models/powerup.glb'
        },
        textures: {
            'ground': 'textures/ground.png'
        },
        audio: {
            'game_music': 'audio/game.mp3',
            'hit': 'audio/hit.wav'
        },
        cubetextures: {
            'skybox': ['sky/px.jpg', 'sky/nx.jpg', 'sky/py.jpg', 'sky/ny.jpg', 'sky/pz.jpg', 'sky/nz.jpg']
        }
    },
    
    // Boss level
    '/boss': {
        models: {
            'boss': 'models/boss.gltf'
        },
        audio: {
            'boss_music': 'audio/boss.mp3'
        }
    }
};

Router.on('/', MenuLevel);
Router.on('/game', GameLevel);
Router.on('/boss', BossLevel);
Router.start(config, assets);
```

---

## Best Practices

1. **Organize by type**: Keep models, textures, audio in separate folders
2. **Use level-specific loading**: Don't load everything globally
3. **Optimize file sizes**: Compress models and textures
4. **Use appropriate formats**: GLB for models, compressed images
5. **Preload critical assets**: Put essential assets in global config

---

## See Also

- [Models](/engine/advanced/assets/models.md) - 3D model loading
- [Images and Textures](/engine/advanced/assets/images_and_textures.md) - Texture loading
- [Audio](/engine/advanced/assets/audio.md) - Sound loading
- [Configuration](/engine/advanced/configuration.md) - App configuration