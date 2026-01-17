# PostProcessing

PostProcessing allows you to apply visual effects to your rendered scene, such as bloom, depth of field, color adjustments, and more.

## Import

```javascript
import { PostProcessing, constants } from 'mage-engine';

const { EFFECTS } = constants;
```

## Enabling PostProcessing

PostProcessing must be enabled in your configuration:

```javascript
const config = {
    screen: {
        ratio: window.innerWidth / window.innerHeight,
        frameLimit: 60
    },
    postprocessing: {
        enabled: true
    }
};

Router.on('/', Level);
Router.start(config, assets);
```

## Available Effects

```javascript
export const EFFECTS = {
    SEPIA: "SEPIAEFFECT",
    HUE_SATURATION: "HUESATURATIONEFFECT",
    BLOOM: "BLOOM",
    DEPTH_OF_FIELD: "DOF",
    SELECTIVE_OUTLINE: "SELECTIVEOUTLINE",
    OUTLINE: "OUTLINE",
    GLITCH: "GLITCH",
    PIXEL: "PIXEL"
};
```

## Methods

### `PostProcessing.add(effect, options)`

Add an effect to the postprocessing pipeline.

| Parameter | Type | Description |
|-----------|------|-------------|
| `effect` | `string` | Effect type from `EFFECTS` constant |
| `options` | `object` | Effect-specific options |

### `PostProcessing.isEnabled()`

Returns `true` if postprocessing is enabled.

### `PostProcessing.dispose()`

Cleanup and remove all postprocessing effects.

---

## Effect Options

### Bloom

Creates a glow effect around bright areas.

```javascript
PostProcessing.add(EFFECTS.BLOOM, {
    strength: 1.5,      // Glow intensity (default: 1)
    kernelSize: 25,     // Blur kernel size (default: 25)
    sigma: 4.0,         // Blur sigma (default: 4.0)
    resolution: 512     // Render resolution (default: 256)
});
```

### Depth of Field

Simulates camera focus with blur for out-of-focus areas.

```javascript
PostProcessing.add(EFFECTS.DEPTH_OF_FIELD, {
    focus: 1.0,         // Focus distance
    aperture: 0.025,    // Aperture size
    maxblur: 1.0        // Maximum blur amount
});
```

### Hue/Saturation

Adjust color hue and saturation.

```javascript
PostProcessing.add(EFFECTS.HUE_SATURATION, {
    hue: 0,             // Hue shift (-1 to 1, default: 0)
    saturation: 0.4     // Saturation (-1 to 1, default: 0)
});
```

### Sepia

Apply a sepia tone effect.

```javascript
PostProcessing.add(EFFECTS.SEPIA, {
    value: 0.8          // Sepia intensity (0 to 1, default: 1.0)
});
```

### Glitch

Creates a digital glitch distortion effect.

```javascript
const glitch = PostProcessing.add(EFFECTS.GLITCH, {
    dt_size: 64         // Distortion texture size (default: 64)
});

// Enable wild/intense mode
glitch.shouldGoWild(true);
```

### Pixel

Pixelates the image for a retro effect.

```javascript
const pixel = PostProcessing.add(EFFECTS.PIXEL, {
    pixelSize: 16       // Size of pixels (default: 16)
});

// Change pixel size dynamically
pixel.setPixelSize(8);
```

### Outline

Adds outlines to objects.

```javascript
PostProcessing.add(EFFECTS.OUTLINE, {
    defaultThickness: 0.003,    // Line thickness (default: 0.003)
    defaultColor: 0x000000,     // Outline color (default: black)
    defaultAlpha: 1.0,          // Outline opacity (default: 1.0)
    defaultKeepAlive: false     // Keep outline when deselected
});
```

---

## Examples

### Cinematic Look

```javascript
import { Level, PostProcessing, constants } from 'mage-engine';

const { EFFECTS } = constants;

class CinematicLevel extends Level {
    onCreate() {
        // Add bloom for highlights
        PostProcessing.add(EFFECTS.BLOOM, {
            strength: 0.8,
            resolution: 512
        });
        
        // Adjust colors
        PostProcessing.add(EFFECTS.HUE_SATURATION, {
            saturation: -0.2  // Slightly desaturated
        });
    }
}
```

### Retro Game Effect

```javascript
class RetroLevel extends Level {
    onCreate() {
        // Pixelate the scene
        PostProcessing.add(EFFECTS.PIXEL, {
            pixelSize: 4
        });
        
        // Optional sepia for aged look
        PostProcessing.add(EFFECTS.SEPIA, {
            value: 0.3
        });
    }
}
```

### Dynamic Damage Effect

```javascript
class GameLevel extends Level {
    onCreate() {
        this.glitchEffect = null;
    }
    
    onPlayerDamaged() {
        // Add glitch when damaged
        if (!this.glitchEffect) {
            this.glitchEffect = PostProcessing.add(EFFECTS.GLITCH, {
                dt_size: 64
            });
        }
        this.glitchEffect.shouldGoWild(true);
        
        // Remove after delay
        setTimeout(() => {
            this.glitchEffect.shouldGoWild(false);
        }, 500);
    }
}
```

### Multiple Effects Chain

```javascript
class StylizedLevel extends Level {
    onCreate() {
        // Effects are applied in order added
        PostProcessing.add(EFFECTS.BLOOM, { strength: 1.2 });
        PostProcessing.add(EFFECTS.HUE_SATURATION, { saturation: 0.3 });
        PostProcessing.add(EFFECTS.DEPTH_OF_FIELD, {
            focus: 10.0,
            aperture: 0.02
        });
    }
}
```

---

## Performance Considerations

- Each effect adds to render time
- Lower `resolution` values improve performance for bloom
- Use `dispose()` to clean up effects when switching levels
- Consider disabling effects on lower-end devices:

```javascript
import { Features } from 'mage-engine';

if (Features.isMobile()) {
    // Skip heavy postprocessing on mobile
} else {
    PostProcessing.add(EFFECTS.BLOOM, { strength: 1.0 });
}
```

## See Also

- [Configuration](/engine/advanced/configuration.md) - Enable postprocessing in config
- [Level](/engine/advanced/core/level.md) - Level lifecycle
- [Features](/engine/utilities/features.md) - Device detection