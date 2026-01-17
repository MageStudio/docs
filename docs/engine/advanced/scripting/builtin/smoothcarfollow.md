# SmoothCarFollow Script

The `SmoothCarFollow` script creates a smooth third-person camera that follows a target element, ideal for racing games and vehicle simulations.

## Import

```javascript
import { Scene, Scripts, BUILTIN_SCRIPTS } from 'mage-engine';
```

## Usage

```javascript
Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, options);
```

---

## Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `target` | `Element` | required | Element to follow |
| `height` | `number` | `3.0` | Camera height above target |
| `heightDamping` | `number` | `2.0` | Height smoothing factor |
| `lookAtHeight` | `number` | `1.0` | Look-at point height offset |
| `distance` | `number` | `5.0` | Distance behind target |
| `rotationSnapTime` | `number` | `0.3` | Rotation smoothing time |
| `distanceSnapTime` | `number` | `0.5` | Distance smoothing time |
| `distanceMultiplier` | `number` | `1` | Distance scale factor |
| `lerpFactor` | `number` | - | Optional interpolation factor |

---

## Basic Example

```javascript
import { Level, Scene, Models, BUILTIN_SCRIPTS } from 'mage-engine';

class RacingLevel extends Level {
    onCreate() {
        // Create car
        this.car = Models.create('car');
        this.car.setPosition({ x: 0, y: 1, z: 0 });
        
        // Setup camera follow
        Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
            target: this.car,
            distance: 8,
            height: 3
        });
    }
}
```

---

## Racing Camera Setup

```javascript
// Fast, responsive camera for racing
Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
    target: car,
    distance: 10,
    height: 3,
    heightDamping: 3.0,         // Faster height adjustment
    rotationSnapTime: 0.15,     // Quick rotation response
    distanceSnapTime: 0.3,      // Quick distance adjustment
    lookAtHeight: 1.0
});
```

---

## Cinematic Camera Setup

```javascript
// Smooth, cinematic following
Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
    target: car,
    distance: 15,
    height: 5,
    heightDamping: 1.0,         // Slower, smoother
    rotationSnapTime: 0.6,      // Lazy rotation
    distanceSnapTime: 0.8,      // Gradual distance changes
    lookAtHeight: 2.0
});
```

---

## Close Follow

```javascript
// Close, action-packed view
Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
    target: car,
    distance: 4,
    height: 1.5,
    heightDamping: 4.0,
    rotationSnapTime: 0.1,
    lookAtHeight: 0.5
});
```

---

## Dynamic Camera Switching

```javascript
class RacingLevel extends Level {
    onCreate() {
        this.car = Models.create('car');
        this.camera = Scene.getCamera();
        
        // Start with default view
        this.setCameraView('normal');
        
        // Switch views with number keys
        Input.keyboard.on('1', () => this.setCameraView('normal'));
        Input.keyboard.on('2', () => this.setCameraView('close'));
        Input.keyboard.on('3', () => this.setCameraView('far'));
    }
    
    setCameraView(view) {
        // Remove existing script
        this.camera.removeScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW);
        
        const views = {
            normal: { distance: 8, height: 3, rotationSnapTime: 0.2 },
            close: { distance: 4, height: 1.5, rotationSnapTime: 0.1 },
            far: { distance: 15, height: 6, rotationSnapTime: 0.4 }
        };
        
        this.camera.addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
            target: this.car,
            ...views[view]
        });
    }
}
```

---

## Complete Racing Example

```javascript
import { 
    Level, 
    Scene, 
    Models, 
    BUILTIN_SCRIPTS,
    SunLight,
    AmbientLight
} from 'mage-engine';

class CompleteRacing extends Level {
    onCreate() {
        // Setup lighting
        new AmbientLight({ intensity: 0.5 });
        new SunLight({ intensity: 1, castShadow: true });
        
        // Create track
        const track = Models.create('racetrack');
        
        // Create car with physics
        this.car = Models.create('car', { name: 'player' });
        this.car.setPosition({ x: 0, y: 2, z: 0 });
        
        // Create wheels
        const wheels = [
            Models.create('wheel'),
            Models.create('wheel'),
            Models.create('wheel'),
            Models.create('wheel')
        ];
        
        // Add car controller
        this.car.addScript(BUILTIN_SCRIPTS.BASECAR, {
            wheels,
            mass: 1000,
            wheelsOptions: {
                back: { axisPosition: -1.2, radius: 0.35, halfTrack: 0.8, axisHeight: 0 },
                front: { axisPosition: 1.2, radius: 0.35, halfTrack: 0.8, axisHeight: 0 }
            },
            suspensions: {
                stiffness: 20,
                damping: 2.3,
                compression: 4.4,
                restLength: 0.6
            }
        });
        
        // Add camera follow
        Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
            target: this.car,
            distance: 10,
            height: 4,
            heightDamping: 2.5,
            rotationSnapTime: 0.2,
            distanceSnapTime: 0.4,
            lookAtHeight: 1.0
        });
    }
}
```

---

## Tuning Tips

| Effect | Adjustment |
|--------|------------|
| More responsive | Lower `rotationSnapTime` and `distanceSnapTime` |
| Smoother | Higher damping values and snap times |
| Closer feel | Reduce `distance`, lower `height` |
| Epic/cinematic | Increase `distance`, higher `height` |
| Less bouncy | Increase `heightDamping` |

---

## See Also

- [BaseCar](/engine/advanced/scripting/builtin/basecar.md) - Vehicle controller
- [Third Person Controls](/engine/advanced/controls/third.md) - Third person camera
- [Scripts](/engine/advanced/scripting/scripts.md) - Script system