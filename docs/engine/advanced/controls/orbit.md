# Orbit Controls

Orbit Controls allow the camera to orbit around a target point, commonly used for model viewers, editors, and strategy games.

## Import

```javascript
import { Controls } from 'mage-engine';
```

## Setup

```javascript
const orbit = Controls.setOrbitControls(options);
```

## Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `target` | `Vector3` | `{0,0,0}` | Point to orbit around |

## Properties

```javascript
orbit.enabled = true;              // Enable/disable controls
orbit.target = new Vector3();      // Orbit target point
orbit.minDistance = 0;             // Minimum zoom distance
orbit.maxDistance = Infinity;      // Maximum zoom distance
orbit.minPolarAngle = 0;           // Minimum vertical angle (radians)
orbit.maxPolarAngle = Math.PI;     // Maximum vertical angle (radians)
orbit.enableDamping = false;       // Smooth camera movement
orbit.dampingFactor = 0.25;        // Damping amount
orbit.enableZoom = true;           // Allow zoom
orbit.enableRotate = true;         // Allow rotation
orbit.enablePan = true;            // Allow panning
orbit.autoRotate = false;          // Auto-rotate around target
orbit.autoRotateSpeed = 2.0;       // Auto-rotation speed
```

## Methods

```javascript
orbit.setTarget({ x, y, z })       // Set orbit target
orbit.setMinDistance(distance)     // Set minimum zoom
orbit.setMaxDistance(distance)     // Set maximum zoom
orbit.setMinPolarAngle(angle)      // Set minimum vertical angle
orbit.setMaxPolarAngle(angle)      // Set maximum vertical angle
orbit.saveState()                  // Save current state
orbit.reset()                      // Reset to saved state
```

## Basic Example

```javascript
import { Level, Controls, Cube } from 'mage-engine';

class ModelViewer extends Level {
    onCreate() {
        // Create object to view
        const cube = new Cube(10, 0x00ff00);
        
        // Setup orbit controls
        this.orbit = Controls.setOrbitControls({
            target: { x: 0, y: 0, z: 0 }
        });
        
        // Enable smooth movement
        this.orbit.enableDamping = true;
        this.orbit.dampingFactor = 0.1;
    }
}
```

## Constrained Orbit

```javascript
class ConstrainedViewer extends Level {
    onCreate() {
        const orbit = Controls.setOrbitControls();
        
        // Limit zoom range
        orbit.minDistance = 5;
        orbit.maxDistance = 50;
        
        // Limit vertical rotation (prevent going under ground)
        orbit.minPolarAngle = 0.1;           // Slightly above horizontal
        orbit.maxPolarAngle = Math.PI / 2;   // Stop at horizontal
        
        // Disable panning
        orbit.enablePan = false;
    }
}
```

## Auto-Rotate Showcase

```javascript
class ShowcaseLevel extends Level {
    onCreate() {
        const model = Models.create('product');
        
        const orbit = Controls.setOrbitControls({
            target: { x: 0, y: 1, z: 0 }
        });
        
        // Enable auto-rotation for showcase
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 1.0;
        
        // Stop auto-rotate on interaction
        document.addEventListener('mousedown', () => {
            orbit.autoRotate = false;
        });
    }
}
```

## Dynamic Target

```javascript
class GameLevel extends Level {
    onCreate() {
        this.selectedObject = null;
        this.orbit = Controls.setOrbitControls();
    }
    
    onObjectSelected(object) {
        // Focus camera on selected object
        const position = object.getPosition();
        this.orbit.setTarget(position);
        this.selectedObject = object;
    }
}
```

## See Also

- [Transform Controls](/engine/advanced/controls/transform.md)
- [First Person Controls](/engine/advanced/controls/first.md)
- [Mouse Input](/engine/advanced/input/mouse.md)