# Fly Controls

Fly Controls provide free-flying camera movement in any direction, useful for exploration, debugging, and cinematic cameras.

## Import

```javascript
import { Controls } from 'mage-engine';
```

## Setup

```javascript
const fly = Controls.setFlyControls();
```

## Properties

```javascript
fly.movementSpeed = 100;           // Movement speed
fly.rollSpeed = Math.PI / 24;      // Roll rotation speed
fly.dragToLook = true;             // Require drag to rotate
fly.autoForward = false;           // Automatically move forward
```

## Default Controls

| Key | Action |
|-----|--------|
| W / Up Arrow | Move forward |
| S / Down Arrow | Move backward |
| A / Left Arrow | Move left |
| D / Right Arrow | Move right |
| R | Move up |
| F | Move down |
| Q | Roll left |
| E | Roll right |
| Mouse Drag | Look around |

## Basic Example

```javascript
import { Level, Controls } from 'mage-engine';

class FlyLevel extends Level {
    onCreate() {
        // Setup fly controls
        this.fly = Controls.setFlyControls();
        this.fly.movementSpeed = 50;
    }
}
```

## Exploration Mode

```javascript
class ExplorationLevel extends Level {
    onCreate() {
        const fly = Controls.setFlyControls();
        
        // Slower, more controlled movement
        fly.movementSpeed = 20;
        fly.rollSpeed = Math.PI / 48;  // Slower roll
        fly.dragToLook = true;          // Click and drag to look
    }
}
```

## Cinematic Camera

```javascript
class CinematicLevel extends Level {
    onCreate() {
        const fly = Controls.setFlyControls();
        
        // Smooth, slow movement for cinematics
        fly.movementSpeed = 5;
        fly.autoForward = true;  // Constant forward motion
    }
}
```

## Debug Camera

```javascript
class GameLevel extends Level {
    onCreate() {
        this.gameCamera = Scene.getCamera();
        this.debugMode = false;
    }
    
    toggleDebugCamera() {
        this.debugMode = !this.debugMode;
        
        if (this.debugMode) {
            // Switch to fly controls for debugging
            this.fly = Controls.setFlyControls();
            this.fly.movementSpeed = 100;
        } else {
            // Return to game camera
            Controls.dispose();
            // Restore game controls
        }
    }
}
```

## See Also

- [First Person Controls](/engine/advanced/controls/first.md)
- [Orbit Controls](/engine/advanced/controls/orbit.md)
- [Keyboard Input](/engine/advanced/input/keyboard.md)