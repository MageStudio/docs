# Particles

The Particles system allows you to create dynamic visual effects like fire, explosions, rain, snow, and custom particle emitters.

## Import

```javascript
import { Particles, PARTICLES, Proton } from 'mage-engine';
```

## Built-in Particle Types

```javascript
export const PARTICLES = {
    RAIN: "rain",
    EXPLOSION: "explosion",
    FOUNTAIN: "fountain",
    FIRE: "fire",
    SNOW: "snow",
    TRAIL: "trail"
};
```

---

## Adding Particles

### `Particles.add(type, options)`

Add a particle emitter to the scene.

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `string` | Particle type from `PARTICLES` constant or custom emitter name |
| `options` | `object` | Emitter-specific options |

**Returns:** `ParticleEmitter` instance

---

## Emitter Methods

```javascript
emitter.emit(duration, life)    // Start emitting
emitter.stop()                  // Stop emitting
emitter.setPosition(position)   // Move emitter { x, y, z }
emitter.dispose()               // Remove and cleanup
emitter.uuid()                  // Get unique ID
emitter.isSystemDead()          // Check if finished
```

### Emit Duration

- `'once'` - Emit once and stop
- `Infinity` - Emit continuously
- `number` - Emit for specified milliseconds

---

## Fire Effect

Creates a flame effect with rising particles.

```javascript
const fire = Particles.add(PARTICLES.FIRE, {
    texture: 'fireTexture',     // Optional texture name
    direction: { x: 0, y: 1, z: 0 },  // Direction (default: up)
    size: 20,                   // Particle size (default: 20)
    strength: 100,              // Emission rate (default: 100)
    colors: ['#ff4500', '#ffd700'],   // Color gradient
    name: 'campfire'            // Optional name
});

fire.emit(Infinity);
fire.setPosition({ x: 0, y: 0, z: 0 });
```

### Example: Campfire

```javascript
import { Particles, PARTICLES, PALETTES } from 'mage-engine';

class CampfireLevel extends Level {
    onCreate() {
        const fire = Particles.add(PARTICLES.FIRE, {
            texture: 'flame',
            strength: 50,
            size: 5,
            colors: [
                PALETTES.FRENCH.WATERFALL,
                PALETTES.FRENCH.PARADISE_GREEN
            ]
        });
        
        fire.emit(Infinity);
        fire.setPosition({ x: 0, y: 0, z: 0 });
    }
}
```

---

## Explosion Effect

Creates a burst of particles for impacts and explosions.

```javascript
const explosion = Particles.add(PARTICLES.EXPLOSION, {
    texture: 'sparkTexture',    // Optional texture
    hasDebris: true,            // Add debris particles (default: false)
    size: 4                     // Particle size (default: 4)
});

// Fire once
explosion.emit('once');
explosion.setPosition({ x: 10, y: 0, z: 5 });
```

### Example: Impact Effect

```javascript
onBulletHit(position) {
    const impact = Particles.add(PARTICLES.EXPLOSION, {
        texture: 'spark',
        hasDebris: true,
        size: 2
    });
    
    impact.setPosition(position);
    impact.emit('once');
    
    // Cleanup after animation
    setTimeout(() => impact.dispose(), 2000);
}
```

---

## Trail Effect

Creates particles that follow a moving object.

```javascript
const trail = Particles.add(PARTICLES.TRAIL, {
    texture: 'smokeTexture',    // Optional texture
    size: 4                     // Particle size (default: 4)
});

trail.emit(Infinity);
```

### Example: Projectile Trail

```javascript
class Projectile extends Sphere {
    constructor() {
        super(0.5, 0xff0000);
        
        this.trail = Particles.add(PARTICLES.TRAIL, {
            texture: 'smoke',
            size: 2
        });
        this.trail.emit(Infinity);
    }
    
    update(dt) {
        // Move projectile
        const pos = this.getPosition();
        pos.x += this.velocity.x * dt;
        this.setPosition(pos);
        
        // Update trail position
        this.trail.setPosition(pos);
    }
    
    dispose() {
        this.trail.dispose();
        super.dispose();
    }
}
```

---

## Rain Effect

Creates falling rain particles.

```javascript
const rain = Particles.add(PARTICLES.RAIN, {
    texture: 'raindrop',
    size: 1,
    strength: 500,
    area: { x: 100, z: 100 }    // Coverage area
});

rain.emit(Infinity);
rain.setPosition({ x: 0, y: 50, z: 0 });
```

---

## Snow Effect

Creates falling snow particles.

```javascript
const snow = Particles.add(PARTICLES.SNOW, {
    texture: 'snowflake',
    size: 2,
    strength: 200,
    area: { x: 100, z: 100 }
});

snow.emit(Infinity);
```

---

## Fountain Effect

Creates upward spraying particles that fall back down.

```javascript
const fountain = Particles.add(PARTICLES.FOUNTAIN, {
    texture: 'water',
    size: 3,
    strength: 80,
    height: 10,
    colors: ['#0077be', '#87ceeb']
});

fountain.emit(Infinity);
fountain.setPosition({ x: 0, y: 0, z: 0 });
```

---

## Custom Particle Emitters

Create custom emitters using Proton for full control.

```javascript
import { ProtonParticleEmitter, Proton } from 'mage-engine';

class CustomEmitter extends ProtonParticleEmitter {
    constructor(options) {
        super({
            rate: new Proton.Rate(
                new Proton.Span(10, 15),    // Particles per emission
                new Proton.Span(0.05, 0.1)  // Time between emissions
            ),
            texture: options.texture,
            color: options.color || '#ffffff',
            initializers: [
                new Proton.Mass(1),
                new Proton.Life(1, 2),
                new Proton.Radius(10, 20),
                new Proton.Position(new Proton.SphereZone(10)),
                new Proton.Velocity(
                    new Proton.Span(2, 4),
                    new Proton.Vector3D(0, 1, 0)
                )
            ],
            behaviours: [
                new Proton.Scale(new Proton.Span(2, 2.5), 0),
                new Proton.G(1),  // Gravity
                new Proton.Color('#ff0000', '#0000ff'),  // Color over life
                new Proton.Alpha(1, 0)  // Fade out
            ]
        });
    }
}

// Register custom emitter
Particles.registerEmitter('myCustomEmitter', CustomEmitter);

// Use it
const custom = Particles.add('myCustomEmitter', { 
    texture: 'particle',
    color: '#ff00ff'
});
custom.emit(Infinity);
```

---

## Proton Initializers

Control particle starting properties:

| Initializer | Description |
|------------|-------------|
| `Proton.Mass(min, max)` | Particle mass |
| `Proton.Life(min, max)` | Lifetime in seconds |
| `Proton.Radius(min, max)` | Starting size |
| `Proton.Position(zone)` | Spawn area |
| `Proton.Velocity(speed, direction)` | Initial velocity |

## Proton Behaviours

Control particle changes over lifetime:

| Behaviour | Description |
|-----------|-------------|
| `Proton.Scale(start, end)` | Size change |
| `Proton.Alpha(start, end)` | Opacity change |
| `Proton.Color(start, end)` | Color change |
| `Proton.G(gravity)` | Gravity effect |
| `Proton.Force(x, y, z)` | Constant force |

---

## Complete Example

```javascript
import { 
    Level, 
    Particles, 
    PARTICLES, 
    Cube 
} from 'mage-engine';

class ParticleDemo extends Level {
    onCreate() {
        // Create a torch
        const torch = new Cube(1, 0x8b4513);
        torch.setPosition({ x: 0, y: 0, z: 0 });
        
        // Add fire to torch
        this.fire = Particles.add(PARTICLES.FIRE, {
            texture: 'flame',
            size: 3,
            strength: 30
        });
        this.fire.setPosition({ x: 0, y: 1, z: 0 });
        this.fire.emit(Infinity);
    }
    
    onDestroy() {
        this.fire.dispose();
    }
}
```

---

## Performance Tips

- Limit particle count for mobile devices
- Use smaller textures for particles
- Dispose emitters when not needed
- Use `'once'` emission for one-shot effects
- Consider pooling for frequently spawned effects

## See Also

- [Trails Script](/engine/advanced/scripting/builtin/trails.md) - Attach trails to elements
- [PostProcessing](/engine/advanced/effects/postprocessing.md) - Visual effects
- [Images and Textures](/engine/advanced/assets/images_and_textures.md) - Loading particle textures
