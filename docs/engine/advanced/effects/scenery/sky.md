# Sky

The Sky module provides two ways to create sky backgrounds: procedural atmospheric sky and cubemap skyboxes.

## Import

```javascript
import { Sky, Skybox } from 'mage-engine';
```

---

## Procedural Sky

The `Sky` class creates a realistic atmospheric sky with dynamic sun positioning.

### Constructor

```javascript
const sky = new Sky(options);
```

### Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `scale` | `number` | `10000` | Sky sphere scale |
| `turbidity` | `number` | `10` | Atmospheric turbidity (haziness) |
| `rayleigh` | `number` | `0.8` | Rayleigh scattering coefficient |
| `mieCoefficient` | `number` | `0.005` | Mie scattering coefficient |
| `mieDirectionalG` | `number` | `0.8` | Mie directional scattering |
| `sunInclination` | `number` | `0.49` | Sun vertical position (0-1) |
| `sunAzimuth` | `number` | `0.205` | Sun horizontal position (0-1) |
| `sunDistance` | `number` | `100` | Distance to sun |

### Methods

```javascript
sky.setTurbidity(value)           // Set haziness (2-10)
sky.setRayleigh(value)            // Set scattering (0-4)
sky.setLuminance(value)           // Set brightness
sky.setMieCoefficient(value)      // Set Mie coefficient
sky.setMieDirectionalG(value)     // Set Mie directionality
sky.setSun(inclination, azimuth, distance)  // Position sun
```

### Example: Basic Sky

```javascript
import { Sky, Level } from 'mage-engine';

class OutdoorLevel extends Level {
    onCreate() {
        const sky = new Sky({
            turbidity: 10,
            rayleigh: 2,
            sunInclination: 0.4,
            sunAzimuth: 0.25
        });
    }
}
```

### Example: Day/Night Cycle

```javascript
class DayNightLevel extends Level {
    onCreate() {
        this.sky = new Sky();
        this.timeOfDay = 0.3;  // Start at morning
    }
    
    update(dt) {
        // Advance time
        this.timeOfDay += dt * 0.01;
        if (this.timeOfDay > 1) this.timeOfDay = 0;
        
        // Update sun position
        const inclination = Math.sin(this.timeOfDay * Math.PI);
        this.sky.setSun(inclination, 0.25, 100);
        
        // Adjust atmosphere based on time
        if (this.timeOfDay < 0.2 || this.timeOfDay > 0.8) {
            // Dawn/dusk - more colorful
            this.sky.setRayleigh(3);
            this.sky.setTurbidity(10);
        } else {
            // Midday - clearer
            this.sky.setRayleigh(1);
            this.sky.setTurbidity(5);
        }
    }
}
```

### Sun Position Guide

| Time | Inclination | Effect |
|------|-------------|--------|
| 0.0 | Night | Below horizon |
| 0.25 | Sunrise | Golden hour |
| 0.5 | Noon | High sun |
| 0.75 | Sunset | Golden hour |
| 1.0 | Night | Below horizon |

---

## Skybox

The `Skybox` class creates a sky using a cubemap texture (6 images).

### Constructor

```javascript
const skybox = new Skybox(options);
```

### Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | auto-generated | Unique identifier |
| `texture` | `string` | `'skybox'` | Cubemap texture name from assets |

### Loading Skybox Textures

Cubemap textures require 6 images for each face:

```javascript
// In your assets configuration
const assets = {
    cubetextures: {
        'skybox': [
            'skybox/px.jpg',  // Positive X (right)
            'skybox/nx.jpg',  // Negative X (left)
            'skybox/py.jpg',  // Positive Y (top)
            'skybox/ny.jpg',  // Negative Y (bottom)
            'skybox/pz.jpg',  // Positive Z (front)
            'skybox/nz.jpg'   // Negative Z (back)
        ]
    }
};
```

### Example: Basic Skybox

```javascript
import { Skybox, Level } from 'mage-engine';

class SpaceLevel extends Level {
    onCreate() {
        const skybox = new Skybox({ 
            texture: 'spaceSkybox' 
        });
    }
}
```

### Example: Multiple Skyboxes

```javascript
const assets = {
    cubetextures: {
        'daySky': ['day/px.jpg', 'day/nx.jpg', 'day/py.jpg', 'day/ny.jpg', 'day/pz.jpg', 'day/nz.jpg'],
        'nightSky': ['night/px.jpg', 'night/nx.jpg', 'night/py.jpg', 'night/ny.jpg', 'night/pz.jpg', 'night/nz.jpg']
    }
};

class EnvironmentLevel extends Level {
    onCreate() {
        // Start with day skybox
        this.currentSkybox = new Skybox({ texture: 'daySky' });
    }
    
    switchToNight() {
        this.currentSkybox.dispose();
        this.currentSkybox = new Skybox({ texture: 'nightSky' });
    }
}
```

---

## Choosing Between Sky Types

| Feature | Procedural Sky | Skybox |
|---------|---------------|--------|
| Dynamic sun | ✅ | ❌ |
| Day/night cycle | ✅ | Manual swap |
| Performance | Slightly heavier | Lighter |
| Customization | Parameters | Fixed image |
| Realism | Atmospheric | Depends on art |
| Best for | Outdoor, realistic | Space, stylized |

---

## Complete Example

```javascript
import { Level, Sky, SunLight, AmbientLight } from 'mage-engine';

class RealisticOutdoor extends Level {
    onCreate() {
        // Create procedural sky
        this.sky = new Sky({
            turbidity: 8,
            rayleigh: 2.5,
            sunInclination: 0.4,
            sunAzimuth: 0.25
        });
        
        // Add matching sun light
        const sun = new SunLight({
            color: 0xffffcc,
            intensity: 1.0,
            position: { x: 100, y: 100, z: 50 },
            castShadow: true
        });
        
        // Add ambient for fill
        const ambient = new AmbientLight({
            color: 0x404080,
            intensity: 0.3
        });
    }
}
```

---

## See Also

- [Images and Textures](/engine/advanced/assets/images_and_textures.md) - Loading cubemap textures
- [SunLight](/engine/advanced/lights/sunlight.md) - Directional sun lighting
- [AmbientLight](/engine/advanced/lights/ambientlight.md) - Ambient lighting
- [Configuration](/engine/advanced/configuration.md) - Asset configuration
