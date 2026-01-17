# BaseCar Script

The `BaseCar` script provides a complete vehicle controller with physics-based driving, supporting keyboard input for acceleration, braking, and steering.

## Import

```javascript
import { Scripts, BUILTIN_SCRIPTS } from 'mage-engine';
```

## Usage

```javascript
car.addScript(BUILTIN_SCRIPTS.BASECAR, options);
```

---

## Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `wheels` | `Element[]` | required | Array of 4 wheel elements |
| `accelerationKey` | `string` | `'w'` | Key for acceleration |
| `brakingKey` | `string` | `'s'` | Key for braking/reverse |
| `rightKey` | `string` | `'d'` | Key for steering right |
| `leftKey` | `string` | `'a'` | Key for steering left |
| `debug` | `boolean` | `false` | Show debug visualization |
| `autostart` | `boolean` | `true` | Start engine automatically |
| `mass` | `number` | `800` | Vehicle mass (kg) |
| `wheelsOptions` | `object` | - | Wheel configuration |
| `suspensions` | `object` | - | Suspension settings |

### Wheel Options

```javascript
wheelsOptions: {
    back: {
        axisPosition: -1.25,   // Distance from center (negative = back)
        radius: 0.35,          // Wheel radius
        halfTrack: 1,          // Half of track width
        axisHeight: 0          // Height of wheel axis
    },
    front: {
        axisPosition: 1.2,     // Distance from center (positive = front)
        radius: 0.35,
        halfTrack: 1,
        axisHeight: 0
    }
}
```

### Suspension Options

```javascript
suspensions: {
    stiffness: 20.0,       // Spring stiffness
    damping: 2.3,          // Damping coefficient
    compression: 4.4,      // Compression force
    restLength: 0.6        // Rest length of suspension
}
```

---

## Methods

```javascript
const baseCar = car.getScript(BUILTIN_SCRIPTS.BASECAR);

baseCar.startEngine()     // Start the engine
baseCar.stopEngine()      // Stop the engine
```

---

## Basic Example

```javascript
import { Level, Models, Scripts, BUILTIN_SCRIPTS } from 'mage-engine';

class RacingLevel extends Level {
    onCreate() {
        // Create car body
        const car = Models.create('car', { name: 'playerCar' });
        car.setPosition({ x: 0, y: 2, z: 0 });
        
        // Create wheels
        const wheels = [
            Models.create('wheel', { name: 'wheel_FL' }),
            Models.create('wheel', { name: 'wheel_FR' }),
            Models.create('wheel', { name: 'wheel_BL' }),
            Models.create('wheel', { name: 'wheel_BR' })
        ];
        
        // Add BaseCar script
        car.addScript(BUILTIN_SCRIPTS.BASECAR, {
            wheels,
            mass: 1000,
            wheelsOptions: {
                back: {
                    axisPosition: -1.25,
                    radius: 0.35,
                    halfTrack: 1,
                    axisHeight: 0
                },
                front: {
                    axisPosition: 1.2,
                    radius: 0.35,
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
    }
}
```

---

## Complete Racing Setup

```javascript
import { 
    Level, 
    Models, 
    Scene,
    Scripts, 
    BUILTIN_SCRIPTS,
    AmbientLight,
    SunLight
} from 'mage-engine';

class CompleteRacingLevel extends Level {
    onCreate() {
        // Lighting
        new AmbientLight({ intensity: 0.4 });
        new SunLight({ 
            intensity: 1,
            position: { x: 50, y: 100, z: 50 },
            castShadow: true
        });
        
        // Create ground/track
        const track = Models.create('racetrack');
        
        // Create car
        this.car = Models.create('car', { name: 'playerCar' });
        this.car.setPosition({ x: 0, y: 2, z: 0 });
        
        // Create wheels
        const wheels = this.createWheels();
        
        // Add driving physics
        this.car.addScript(BUILTIN_SCRIPTS.BASECAR, {
            wheels,
            mass: 1200,
            debug: false,
            wheelsOptions: {
                back: { axisPosition: -1.5, radius: 0.4, halfTrack: 0.9, axisHeight: 0 },
                front: { axisPosition: 1.3, radius: 0.4, halfTrack: 0.9, axisHeight: 0 }
            },
            suspensions: {
                stiffness: 25.0,
                damping: 2.5,
                compression: 4.0,
                restLength: 0.5
            }
        });
        
        // Add camera follow
        Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
            target: this.car,
            distance: 10,
            height: 4
        });
        
        // Add trail effects
        this.car.addScript(BUILTIN_SCRIPTS.TRAILS, {
            texture: 'smoke',
            size: 1
        });
    }
    
    createWheels() {
        return [
            Models.create('wheel', { name: 'wheel_FL' }),
            Models.create('wheel', { name: 'wheel_FR' }),
            Models.create('wheel', { name: 'wheel_BL' }),
            Models.create('wheel', { name: 'wheel_BR' })
        ];
    }
}
```

---

## Custom Controls

```javascript
// Use arrow keys instead of WASD
car.addScript(BUILTIN_SCRIPTS.BASECAR, {
    wheels,
    accelerationKey: 'up',
    brakingKey: 'down',
    leftKey: 'left',
    rightKey: 'right'
});
```

---

## Tuning Guide

### Sporty Feel
```javascript
suspensions: {
    stiffness: 30.0,     // Stiffer
    damping: 3.0,        // More damping
    compression: 5.0,
    restLength: 0.4      // Lower ride height
}
```

### Off-Road Feel
```javascript
suspensions: {
    stiffness: 15.0,     // Softer
    damping: 2.0,        // Less damping
    compression: 3.0,
    restLength: 0.8      // Higher ride height
}
```

---

## See Also

- [SmoothCarFollow](/engine/advanced/scripting/builtin/smoothcarfollow.md) - Camera follow script
- [Trails](/engine/advanced/scripting/builtin/trails.md) - Trail effects
- [Physics](/engine/advanced/physics.md) - Physics system
- [Scripts](/engine/advanced/scripting/scripts.md) - Script system