# Models

The Models module handles loading, storing, and creating instances of 3D models in various formats.

## Import

```javascript
import { Models } from 'mage-engine';
```

## Supported Formats

| Format | Extension | Features |
|--------|-----------|----------|
| glTF | `.gltf` | Modern, recommended, supports animations |
| glTF Binary | `.glb` | Compressed single-file glTF |
| FBX | `.fbx` | Autodesk format, good animation support |
| OBJ | `.obj` | Simple geometry, no animations |
| JSON | `.json` | Three.js JSON format |

---

## Asset Configuration

Define models in your assets configuration:

```javascript
const assets = {
    models: {
        'car': 'models/car.gltf',
        'character': 'models/character.fbx',
        'rock': 'models/rock.obj'
    },
    // Level-specific models
    '/forest': {
        models: {
            'tree': 'models/tree.glb'
        }
    }
};
```

---

## Creating Model Instances

### `Models.create(name, options)`

Create an element from a loaded model.

```javascript
const car = Models.create('car');
car.setPosition({ x: 0, y: 0, z: 0 });
```

### Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Unique name for this instance |

```javascript
const car1 = Models.create('car', { name: 'playerCar' });
const car2 = Models.create('car', { name: 'enemyCar' });
```

---

## Basic Example

```javascript
import { Level, Models } from 'mage-engine';

class GameLevel extends Level {
    onCreate() {
        // Create player car
        this.player = Models.create('car', { name: 'player' });
        this.player.setPosition({ x: 0, y: 1, z: 0 });
        this.player.setRotation({ y: Math.PI / 2 });
        this.player.setScale(2);
    }
}
```

---

## Animated Models

FBX and glTF models can contain animations:

```javascript
const character = Models.create('character');

// List available animations
const animations = character.getAvailableAnimations();
console.log(animations);  // ['idle', 'walk', 'run', 'jump']

// Play animation
character.playAnimation('idle');

// Play with options
character.playAnimation('walk', {
    loop: THREE.LoopRepeat,
    duration: 0.3  // Crossfade duration
});

// Stop animation
character.stopAnimation();
```

---

## Model Hierarchy

Access child objects within models:

```javascript
const car = Models.create('car');

// Get wheel by name (defined in modeling software)
const frontLeftWheel = car.getObjectByName('wheel_FL');

// Traverse all children
car.traverse((child) => {
    if (child.isMesh) {
        console.log('Found mesh:', child.name);
    }
});
```

---

## Materials

Modify model materials:

```javascript
const car = Models.create('car');

// Set color on all meshes
car.setColor(0xff0000);

// Set opacity
car.setOpacity(0.5);

// Apply texture
car.setTexture('map', 'carTexture');

// Access specific material
car.traverse((child) => {
    if (child.isMesh && child.name === 'body') {
        child.material.metalness = 0.9;
        child.material.roughness = 0.1;
    }
});
```

---

## Multiple Instances

```javascript
class ForestLevel extends Level {
    onCreate() {
        // Create many trees
        for (let i = 0; i < 100; i++) {
            const tree = Models.create('tree', { name: `tree_${i}` });
            tree.setPosition({
                x: Math.random() * 100 - 50,
                y: 0,
                z: Math.random() * 100 - 50
            });
            tree.setScale(0.8 + Math.random() * 0.4);
            tree.setRotation({ y: Math.random() * Math.PI * 2 });
        }
    }
}
```

---

## Physics Integration

Add physics to models:

```javascript
import { Models, Physics, PHYSICS_TYPES } from 'mage-engine';

const crate = Models.create('crate');
crate.setPosition({ x: 0, y: 10, z: 0 });

// Add physics body
Physics.add(crate, {
    mass: 10,
    type: PHYSICS_TYPES.BOX
});
```

---

## Loading States

```javascript
class LoadingLevel extends Level {
    onCreate() {
        // Check if model loaded
        if (Models.has('character')) {
            this.createCharacter();
        } else {
            // Handle missing model
            console.error('Character model not loaded');
        }
    }
}
```

---

## Complete Example

```javascript
import { Level, Models, Scene, ENTITY_EVENTS } from 'mage-engine';

class CharacterLevel extends Level {
    onCreate() {
        // Create animated character
        this.character = Models.create('character', { name: 'hero' });
        this.character.setPosition({ x: 0, y: 0, z: 0 });
        this.character.setScale(0.01);  // Scale down if needed
        
        // Start idle animation
        this.character.playAnimation('idle');
        
        // Listen for animation events
        this.character.addEventListener(ENTITY_EVENTS.ANIMATION.FINISHED, () => {
            this.character.playAnimation('idle');
        });
        
        // Setup camera to follow
        Scene.getCamera().addScript('SmoothFollow', {
            target: this.character
        });
    }
    
    update(dt) {
        // Update character logic
    }
}
```

---

## Best Practices

1. **Use glTF/GLB** for best compatibility and features
2. **Optimize models** before export (reduce polygons, bake textures)
3. **Name objects** in your modeling software for easy access
4. **Use instancing** for many identical objects (handled automatically)
5. **Preload models** in asset configuration for seamless gameplay

---

## See Also

- [Loading Assets](/engine/advanced/assets/loading.md) - Asset loading system
- [Animations](/engine/advanced/animations.md) - Model animations
- [Physics](/engine/advanced/physics.md) - Adding physics to models
- [Element](/engine/advanced/core/element.md) - Element methods