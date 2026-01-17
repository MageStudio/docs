# Third Person Controls

Third Person Controls position the camera behind a target entity, commonly used for character-based games.

## Import

```javascript
import { Controls, Scripts, BUILTIN_SCRIPTS } from 'mage-engine';
```

## Using SmoothCarFollow Script

The recommended way to create third-person camera following is using the `SmoothCarFollow` script:

```javascript
import { Scene, Scripts, BUILTIN_SCRIPTS } from 'mage-engine';

// Add follow script to camera
Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
    target: playerEntity,
    distance: 8,
    height: 4
});
```

## SmoothCarFollow Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `target` | `Element` | required | Entity to follow |
| `height` | `number` | `3.0` | Camera height above target |
| `heightDamping` | `number` | `2.0` | Height smoothing |
| `lookAtHeight` | `number` | `1.0` | Look-at point height offset |
| `distance` | `number` | `5.0` | Distance behind target |
| `rotationSnapTime` | `number` | `0.3` | Rotation smoothing time |
| `distanceSnapTime` | `number` | `0.5` | Distance smoothing time |
| `distanceMultiplier` | `number` | `1` | Distance scale factor |

## Basic Example

```javascript
import { Level, Scene, Models, Scripts, BUILTIN_SCRIPTS } from 'mage-engine';

class ThirdPersonLevel extends Level {
    onCreate() {
        // Create player character
        this.player = Models.create('character');
        this.player.setPosition({ x: 0, y: 0, z: 0 });
        
        // Setup third person camera
        Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
            target: this.player,
            distance: 10,
            height: 5,
            lookAtHeight: 1.5
        });
    }
}
```

## Vehicle Following

```javascript
class RacingLevel extends Level {
    onCreate() {
        // Setup car with BaseCar script
        this.car = Models.create('car');
        this.car.addScript(BUILTIN_SCRIPTS.BASECAR, { /* options */ });
        
        // Camera follows car
        Scene.getCamera().addScript(BUILTIN_SCRIPTS.SMOOTH_CAR_FOLLOW, {
            target: this.car,
            distance: 12,
            height: 4,
            rotationSnapTime: 0.2  // Faster rotation for racing
        });
    }
}
```

## Custom Third Person Camera

For custom behavior, create your own follow script:

```javascript
import { BaseScript, Scene } from 'mage-engine';

class CustomThirdPerson extends BaseScript {
    constructor() {
        super('CustomThirdPerson');
    }
    
    start(camera, { target, offset }) {
        this.camera = camera;
        this.target = target;
        this.offset = offset || { x: 0, y: 5, z: -10 };
    }
    
    update(dt) {
        const targetPos = this.target.getPosition();
        
        // Position camera relative to target
        this.camera.setPosition({
            x: targetPos.x + this.offset.x,
            y: targetPos.y + this.offset.y,
            z: targetPos.z + this.offset.z
        });
        
        // Look at target
        this.camera.lookAt(targetPos);
    }
}

// Register and use
Scripts.register('CustomThirdPerson', CustomThirdPerson);
Scene.getCamera().addScript('CustomThirdPerson', {
    target: player,
    offset: { x: 0, y: 3, z: -8 }
});
```

## See Also

- [SmoothCarFollow Script](/engine/advanced/scripting/builtin/smoothcarfollow.md)
- [First Person Controls](/engine/advanced/controls/first.md)
- [Orbit Controls](/engine/advanced/controls/orbit.md)
- [Scripts](/engine/advanced/scripting/scripts.md)