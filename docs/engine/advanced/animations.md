# Animations

Mage provides a comprehensive animation system for playing skeletal animations from models (FBX, GLTF) and programmatic animations.

## Import

```javascript
import { ENTITY_EVENTS, THREE } from 'mage-engine';
```

## Animation Events

```javascript
ENTITY_EVENTS.ANIMATION.LOOP       // Fired when animation loops
ENTITY_EVENTS.ANIMATION.FINISHED   // Fired when animation completes
```

---

## Element Methods

```javascript
element.hasAnimationHandler()       // Check if has animation handler
element.hasAnimations()             // Check if has animation clips
element.getAvailableAnimations()    // Get list of animation names
element.playAnimation(id, options)  // Play animation by name or index
element.stopAnimation()             // Stop current animation
element.stopAllAnimations()         // Stop all animations
```

---

## Loading Animated Models

Animations are automatically extracted from FBX and GLTF models:

```javascript
// In your assets configuration
const assets = {
    models: {
        'character': 'models/character.fbx',  // Contains embedded animations
        'robot': 'models/robot.gltf'          // GLTF with animations
    }
};
```

---

## Basic Example

```javascript
import { Level, Models, ENTITY_EVENTS } from 'mage-engine';

class AnimatedCharacter extends Level {
    onCreate() {
        // Create animated model
        this.character = Models.create('character');
        
        // List available animations
        const animations = this.character.getAvailableAnimations();
        console.log('Available animations:', animations);
        // e.g., ['idle', 'walk', 'run', 'jump']
        
        // Play idle animation
        this.character.playAnimation('idle');
    }
}
```

---

## Play Options

```javascript
element.playAnimation(id, {
    loop: THREE.LoopRepeat,    // Loop mode
    duration: 0.2              // Crossfade duration (seconds)
});
```

### Loop Modes

| Mode | Description |
|------|-------------|
| `THREE.LoopOnce` | Play once and stop |
| `THREE.LoopRepeat` | Loop continuously (default) |
| `THREE.LoopPingPong` | Play forward then backward |

---

## Animation Transitions

```javascript
class CharacterController extends Level {
    onCreate() {
        this.character = Models.create('character');
        this.character.playAnimation('idle');
    }
    
    startWalking() {
        // Smooth transition from current to walk
        this.character.playAnimation('walk', { 
            duration: 0.3  // 300ms crossfade
        });
    }
    
    startRunning() {
        this.character.playAnimation('run', { 
            duration: 0.2 
        });
    }
    
    stopMoving() {
        this.character.playAnimation('idle', { 
            duration: 0.4 
        });
    }
}
```

---

## Animation Events

```javascript
import { Models, ENTITY_EVENTS, THREE } from 'mage-engine';

class AttackSystem extends Level {
    onCreate() {
        this.character = Models.create('character');
        
        // Listen for animation loop
        this.character.addEventListener(ENTITY_EVENTS.ANIMATION.LOOP, (event) => {
            console.log('Animation looped:', event.action);
        });
        
        // Listen for animation complete
        this.character.addEventListener(ENTITY_EVENTS.ANIMATION.FINISHED, (event) => {
            console.log('Animation finished:', event.action);
            this.onAttackComplete();
        });
    }
    
    attack() {
        // Play attack animation once
        this.character.playAnimation('attack', {
            loop: THREE.LoopOnce,
            duration: 0.1
        });
    }
    
    onAttackComplete() {
        // Return to idle after attack
        this.character.playAnimation('idle');
    }
}
```

---

## State-Based Animation

```javascript
class AnimatedEnemy extends Models {
    constructor() {
        super();
        this.currentState = 'idle';
    }
    
    setState(newState) {
        if (this.currentState === newState) return;
        
        this.currentState = newState;
        
        // Map states to animations
        const animationMap = {
            'idle': 'idle',
            'patrol': 'walk',
            'chase': 'run',
            'attack': 'attack',
            'die': 'death'
        };
        
        const animation = animationMap[newState];
        
        if (newState === 'attack' || newState === 'die') {
            this.playAnimation(animation, { 
                loop: THREE.LoopOnce,
                duration: 0.15
            });
        } else {
            this.playAnimation(animation, { duration: 0.25 });
        }
    }
}
```

---

## Blending Multiple Animations

```javascript
class BlendedCharacter extends Level {
    onCreate() {
        this.character = Models.create('character');
        
        // Play base idle
        this.character.playAnimation('idle');
    }
    
    // Example: Blend upper body aim with lower body walk
    // Note: Requires custom animation setup in model
    update(dt) {
        // Animation blending is handled automatically
        // during transitions via the duration option
    }
}
```

---

## Animation by Index

```javascript
// Play by index instead of name
character.playAnimation(0);  // First animation
character.playAnimation(2);  // Third animation
```

---

## Complete Example

```javascript
import { Level, Models, Input, ENTITY_EVENTS, THREE } from 'mage-engine';

class PlayerCharacter extends Level {
    onCreate() {
        this.player = Models.create('character');
        this.player.setPosition({ x: 0, y: 0, z: 0 });
        
        this.isMoving = false;
        this.isRunning = false;
        
        // Start with idle
        this.player.playAnimation('idle');
        
        // Setup input
        this.setupControls();
        
        // Handle animation events
        this.player.addEventListener(ENTITY_EVENTS.ANIMATION.FINISHED, (e) => {
            // Return to idle after one-shot animations
            if (!this.isMoving) {
                this.player.playAnimation('idle');
            }
        });
    }
    
    setupControls() {
        Input.keyboard.on('w', () => {
            this.isMoving = true;
            this.updateAnimation();
        });
        
        Input.keyboard.on('w', () => {
            this.isMoving = false;
            this.updateAnimation();
        }, 'up');
        
        Input.keyboard.on('shift', () => {
            this.isRunning = true;
            this.updateAnimation();
        });
        
        Input.keyboard.on('shift', () => {
            this.isRunning = false;
            this.updateAnimation();
        }, 'up');
        
        Input.keyboard.on('space', () => {
            this.jump();
        });
    }
    
    updateAnimation() {
        if (this.isMoving) {
            if (this.isRunning) {
                this.player.playAnimation('run', { duration: 0.2 });
            } else {
                this.player.playAnimation('walk', { duration: 0.2 });
            }
        } else {
            this.player.playAnimation('idle', { duration: 0.3 });
        }
    }
    
    jump() {
        this.player.playAnimation('jump', {
            loop: THREE.LoopOnce,
            duration: 0.1
        });
    }
}
```

---

## See Also

- [Models](/engine/advanced/assets/models.md) - Loading animated models
- [State Machines](/engine/advanced/state_machines.md) - State-based animation control
- [Entity](/engine/advanced/core/entity.md) - Base entity methods