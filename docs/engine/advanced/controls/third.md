# Third Person Controls

Third Person Controls position the camera behind a target entity, commonly used for character-based games.

## Import

```javascript
import { Controls, Scripts, BUILTIN_SCRIPTS } from 'mage-engine';
```

## ThirdPersonControl

Since `v3.25.0`, the engine ships a full third-person character controller. It orbits the camera around a target, handles WASD/arrow movement, jumping, and (optionally) drives the character through the physics simulation with a `PLAYER` capsule body.

```javascript
import { Controls } from 'mage-engine';

const control = await Controls.setThirdPersonControls({
    target: character,       // required — the Element to control
    physicsEnabled: true,
    distance: 5,
    cameraHeight: 2,
    speed: 2,
    jumpSpeed: 2
});
// Click the canvas to acquire pointer lock; WASD/arrows to move, Space to jump.
```

`setThirdPersonControls` is async and returns the control instance. It is stored under the `CONTROLS.TPS` constant and can be retrieved later via `Controls.getControl(CONTROLS.TPS)`. Setting third person controls disposes any active first person, fly, or orbit controls.

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `target` | `Element` | required | The element to control |
| `physicsEnabled` | `boolean` | `false` | Drive the character through the physics simulation |
| `distance` | `number` | `5` | Camera orbit distance from the character |
| `cameraHeight` | `number` | `2` | Camera height above the character |
| `sensitivity` | `number` | `0.002` | Mouse look sensitivity |
| `speed` | `number` | `2` | Walk speed |
| `jumpSpeed` | `number` | `2` | Jump impulse |
| `mass` | `number` | `100` | Mass used for the character's physics body |
| `groundLevel` | `number` | `0.5` | Floor Y coordinate (non-physics mode only) |
| `slowDownFactor` | `number` | `20` | How quickly the character decelerates |
| `minPolarAngle` | `number` | `0.1` | Camera pitch clamp (lower) |
| `maxPolarAngle` | `number` | `π/2 - 0.1` | Camera pitch clamp (upper) |
| `originOffset` | `object` | `{ x: 0, y: 0, z: 0 }` | Offset from model origin to capsule centre |

::: tip On-demand physics — since v3.25.3
If `physicsEnabled` is `true` and physics is not enabled in your configuration, the engine enables it automatically and registers every physics-enabled element — no upfront physics configuration required.
:::

## Using SmoothCarFollow Script

For simple camera-follow behaviour without a character controller (e.g. vehicle cameras), use the `SmoothCarFollow` script:

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