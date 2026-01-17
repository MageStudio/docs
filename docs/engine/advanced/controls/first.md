# First Person Controls

First Person Controls allow you to create immersive first-person experiences with WASD movement, mouse look, and optional physics-based collision.

## Import

```javascript
import { Controls } from 'mage-engine';
```

## Setup

```javascript
const fps = Controls.setFirstPersonControls(options);
```

## Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `close` | `number` | `0` | Near clipping plane |
| `far` | `number` | `1` | Far clipping plane |
| `position` | `Vector3` | camera position | Starting position |
| `jumpSpeed` | `number` | `2` | Jump velocity |
| `speed` | `number` | `2` | Movement speed |
| `slowDownFactor` | `number` | `20` | Deceleration factor |
| `mass` | `number` | `100` | Character mass (physics) |
| `height` | `number` | `1.8` | Character height |
| `sensitivity` | `number` | `0.002` | Mouse sensitivity |
| `target` | `Entity` | `null` | Entity to control |
| `physicsEnabled` | `boolean` | `false` | Enable physics collision |

## Methods

```javascript
fps.lock()                  // Lock pointer (enter FPS mode)
fps.unlock()                // Unlock pointer (exit FPS mode)
fps.getDirection(vector)    // Get look direction into vector
fps.getCharacter()          // Get controlled entity
fps.moveForward(distance)   // Move forward/backward
fps.moveRight(distance)     // Move left/right
```

## Basic Example

```javascript
import { Level, Controls } from 'mage-engine';

class FPSLevel extends Level {
    onCreate() {
        // Setup first person controls
        this.fps = Controls.setFirstPersonControls({
            speed: 3,
            height: 1.8,
            sensitivity: 0.002
        });
        
        // Click to enter FPS mode
        document.addEventListener('click', () => {
            this.fps.lock();
        });
    }
}
```

## Physics-Enabled Example

```javascript
class PhysicsFPSLevel extends Level {
    onCreate() {
        // Enable physics for collision
        this.fps = Controls.setFirstPersonControls({
            speed: 5,
            jumpSpeed: 8,
            height: 1.8,
            mass: 80,
            physicsEnabled: true
        });
        
        // Jump with spacebar
        Input.keyboard.on('space', () => {
            // Jump handled automatically when physics enabled
        });
    }
}
```

## Pointer Lock

First person controls use the Pointer Lock API:

```javascript
// Lock pointer on click
document.addEventListener('click', () => {
    fps.lock();
});

// Listen for lock state changes
document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement) {
        console.log('Pointer locked');
    } else {
        console.log('Pointer unlocked');
    }
});
```

## Custom Movement

```javascript
class CustomFPSLevel extends Level {
    onCreate() {
        this.fps = Controls.setFirstPersonControls({ speed: 5 });
    }
    
    update(dt) {
        // Custom movement logic
        const direction = new Vector3();
        this.fps.getDirection(direction);
        
        // Use direction for raycasting, projectiles, etc.
    }
}
```

## See Also

- [Third Person Controls](/engine/advanced/controls/third.md)
- [Keyboard Input](/engine/advanced/input/keyboard.md)
- [Mouse Input](/engine/advanced/input/mouse.md)
- [Physics](/engine/advanced/physics.md)