# Images and Textures

The Images module handles loading and managing textures and images for use on 3D objects, sprites, and UI elements.

## Import

```javascript
import { Images } from 'mage-engine';
```

## Asset Configuration

```javascript
const assets = {
    // Standard textures
    textures: {
        'wood': 'textures/wood.jpg',
        'metal': 'textures/metal.png',
        'brick': 'textures/brick.jpg'
    },
    
    // 2D images for sprites/UI
    images: {
        'logo': 'images/logo.png',
        'icon': 'images/icon.svg'
    },
    
    // Cubemap textures (skybox)
    cubetextures: {
        'skybox': [
            'skybox/px.jpg', 'skybox/nx.jpg',
            'skybox/py.jpg', 'skybox/ny.jpg',
            'skybox/pz.jpg', 'skybox/nz.jpg'
        ]
    }
};
```

---

## Getting Textures

```javascript
// Get loaded texture
const texture = Images.get('wood');

// Check if texture exists
if (Images.get('wood')) {
    // Use texture
}
```

---

## Applying Textures

### Basic Texture

```javascript
import { Cube, Images } from 'mage-engine';

const cube = new Cube(10, 0xffffff);
cube.setTexture('map', 'wood');
```

### Material Texture Maps

| Map Type | Description |
|----------|-------------|
| `map` | Color/diffuse texture |
| `normalMap` | Normal map for surface detail |
| `roughnessMap` | Roughness map for PBR |
| `metalnessMap` | Metalness map for PBR |
| `emissiveMap` | Emissive/glow map |
| `aoMap` | Ambient occlusion map |
| `displacementMap` | Displacement/height map |
| `alphaMap` | Transparency map |
| `envMap` | Environment reflection map |

```javascript
const cube = new Cube(10, 0xffffff);
cube.setTexture('map', 'brick');
cube.setTexture('normalMap', 'brick_normal');
cube.setTexture('roughnessMap', 'brick_rough');
```

---

## Texture Properties

Access and modify texture properties:

```javascript
const texture = Images.get('wood');

// Repeat texture
texture.repeat.set(4, 4);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// Offset texture
texture.offset.set(0.5, 0.5);

// Rotation
texture.rotation = Math.PI / 4;
texture.center.set(0.5, 0.5);
```

---

## Texture Repeat Example

```javascript
import { Plane, Images, THREE } from 'mage-engine';

class FloorLevel extends Level {
    onCreate() {
        // Create large floor
        const floor = new Plane(100, 100, 0xffffff);
        floor.setRotation({ x: -Math.PI / 2 });
        
        // Get texture and configure repeat
        const texture = Images.get('grass');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);  // Tile 20x20 times
        
        // Apply texture
        floor.setTexture('map', 'grass');
    }
}
```

---

## Sprites and Images

Use images for 2D sprites:

```javascript
import { Sprite } from 'mage-engine';

// Create sprite from image
const sprite = new Sprite({ image: 'logo' });
sprite.setPosition({ x: 0, y: 5, z: 0 });
sprite.setScale(2);
```

---

## Animated Sprites

```javascript
import { AnimatedSprite } from 'mage-engine';

const animated = new AnimatedSprite({
    image: 'explosion_sheet',
    columns: 8,
    rows: 4,
    fps: 24
});
```

---

## Cubemap Textures

For skyboxes and reflections:

```javascript
const assets = {
    cubetextures: {
        'skybox': [
            'sky/px.jpg',  // Right (+X)
            'sky/nx.jpg',  // Left (-X)
            'sky/py.jpg',  // Top (+Y)
            'sky/ny.jpg',  // Bottom (-Y)
            'sky/pz.jpg',  // Front (+Z)
            'sky/nz.jpg'   // Back (-Z)
        ]
    }
};
```

### Using Cubemaps

```javascript
import { Skybox, Sphere, Images } from 'mage-engine';

// Create skybox
const skybox = new Skybox({ texture: 'skybox' });

// Use as environment map on reflective object
const sphere = new Sphere(5, 0xffffff);
const envMap = Images.get('skybox');
sphere.getBody().material.envMap = envMap;
sphere.getBody().material.metalness = 1.0;
sphere.getBody().material.roughness = 0.0;
```

---

## Dynamic Textures

Create textures from canvas:

```javascript
class DynamicTextureLevel extends Level {
    onCreate() {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Draw on canvas
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 512, 512);
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.fillText('Hello!', 100, 256);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        
        // Apply to element
        const plane = new Plane(10, 10, 0xffffff);
        plane.getBody().material.map = texture;
    }
    
    updateTexture() {
        // Update canvas and refresh texture
        ctx.clearRect(0, 0, 512, 512);
        ctx.fillText('Updated!', 100, 256);
        texture.needsUpdate = true;
    }
}
```

---

## Supported Formats

| Format | Extension | Notes |
|--------|-----------|-------|
| JPEG | `.jpg`, `.jpeg` | Good for photos, no transparency |
| PNG | `.png` | Supports transparency |
| WebP | `.webp` | Modern, good compression |
| SVG | `.svg` | Vector, scalable |
| GIF | `.gif` | Animated (static in 3D) |

---

## Best Practices

1. **Use power-of-two sizes**: 256×256, 512×512, 1024×1024
2. **Compress images**: Use tools like TinyPNG
3. **Choose appropriate formats**: JPEG for photos, PNG for transparency
4. **Use mipmaps**: Enabled by default for better quality at distance
5. **Consider texture atlases**: Combine small textures into one

---

## See Also

- [Sprite](/engine/advanced/core/base/sprite.md) - Sprite elements
- [AnimatedSprite](/engine/advanced/core/base/animatedsprite.md) - Animated sprites
- [Loading Assets](/engine/advanced/assets/loading.md) - Asset loading
- [Models](/engine/advanced/assets/models.md) - Applying textures to models