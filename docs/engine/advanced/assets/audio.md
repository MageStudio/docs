# Audio

The Audio module provides a comprehensive system for loading and playing sounds in your game, including both ambient (non-positional) and directional (3D positional) audio.

## Import

```javascript
import Audio, { AUDIO_RAMPS } from "mage-engine";
import AmbientSound from "mage-engine/audio/ambientSound";
import DirectionalSound from "mage-engine/audio/directionalSound";
```

## Audio Ramps

```javascript
const AUDIO_RAMPS = {
  LINEAR: "LINEAR",
  EXPONENTIAL: "EXPONENTIAL",
};
```

## Loading Audio

### Using Configuration

```javascript
// In your level config
const config = {
  audio: {
    background_music: "audio/music.mp3",
    explosion: "audio/explosion.wav",
    footsteps: "audio/footsteps.mp3",
  },
};
```

### Programmatic Loading

```javascript
await Audio.load(
  {
    background_music: "/audio/music.mp3",
    explosion: "/audio/explosion.wav",
    footsteps: "/audio/footsteps.mp3",
  },
  "level1"
);
```

## Master Volume

```javascript
// Set master volume (affects all sounds)
Audio.setVolume(1.5);

// Get current master volume
const volume = Audio.getVolume();
```

## AmbientSound

Non-positional sound that plays equally from all directions. Perfect for background music and UI sounds.

### Constructor

```javascript
new AmbientSound(assetId, options);
```

### Options

| Option                | Type      | Default | Description           |
| --------------------- | --------- | ------- | --------------------- |
| `loop`                | `boolean` | `false` | Loop the sound        |
| `loopStart`           | `number`  | -       | Loop start time       |
| `loopEnd`             | `number`  | -       | Loop end time         |
| `autoplay`            | `boolean` | `false` | Auto-play on creation |
| `reconnectAfterReset` | `boolean` | `false` | Reconnect after reset |
| `name`                | `string`  | -       | Sound instance name   |

### Example

```javascript
import AmbientSound from "mage-engine/audio/ambientSound";

// Background music
const music = new AmbientSound("background_music", {
  loop: true,
  autoplay: true,
  name: "bgm",
});

// UI click sound
const click = new AmbientSound("ui_click", {
  name: "click_sfx",
});
click.play();
```

## DirectionalSound

3D positional sound with spatial audio properties. Perfect for sound effects in the game world.

### Constructor

```javascript
new DirectionalSound(assetId, options);
```

### Options

| Option          | Type      | Default | Description               |
| --------------- | --------- | ------- | ------------------------- |
| `innerAngle`    | `number`  | `360`   | Inner cone angle          |
| `outerAngle`    | `number`  | `0`     | Outer cone angle          |
| `outerVolume`   | `number`  | `0`     | Volume outside outer cone |
| `maxDistance`   | `number`  | `10000` | Maximum hearing distance  |
| `rolloffFactor` | `number`  | `1`     | Distance rolloff rate     |
| `refDistance`   | `number`  | `1`     | Reference distance        |
| `loop`          | `boolean` | `false` | Loop the sound            |
| `name`          | `string`  | -       | Sound instance name       |

### Example

```javascript
import DirectionalSound from "mage-engine/audio/directionalSound";

// Explosion sound
const explosion = new DirectionalSound("explosion", {
  maxDistance: 100,
  rolloffFactor: 2,
  refDistance: 5,
  name: "explosion_sfx",
});

// Position and play
explosion.setPosition({ x: 10, y: 0, z: 5 });
explosion.play();
```

## Sound Methods

### Playback

```javascript
// Play with fade-in
sound.play(volume, fadeTime, rampType);
sound.play(1, 500, AUDIO_RAMPS.EXPONENTIAL);

// Stop with fade-out
sound.stop(fadeTime, rampType);
sound.stop(1000, AUDIO_RAMPS.LINEAR);
```

### Volume

```javascript
// Set volume
sound.setVolume(0.5);

// Get volume
const vol = sound.getVolume();
```

### Pitch

```javascript
// Adjust pitch (playback rate)
sound.setPitch(1.5); // Higher pitch
sound.setPitch(0.5); // Lower pitch
```

### Position (DirectionalSound only)

```javascript
// Set 3D position
sound.setPosition({ x: 10, y: 5, z: -3 });
```

### Effects

```javascript
// Add reverb effect
sound.addConvolver(convolverNode);
```

### Lifecycle

```javascript
// Connect to audio graph
sound.connect();

// Disconnect from audio graph
sound.disconnect();

// Reset sound state
sound.reset();

// Clean up resources
sound.dispose();
```

## Sound Properties

```javascript
// Get sound duration in milliseconds
const duration = sound.duration;

// Get sample rate
const sampleRate = sound.sampleRate;

// Get number of channels
const channels = sound.channels;
```

## Complete Example

```javascript
import Audio, { AUDIO_RAMPS } from "mage-engine";
import AmbientSound from "mage-engine/audio/ambientSound";
import DirectionalSound from "mage-engine/audio/directionalSound";

class GameAudio {
  constructor() {
    this.sounds = {};
  }

  async init() {
    // Load all audio assets
    await Audio.load(
      {
        music: "/audio/background.mp3",
        jump: "/audio/jump.wav",
        coin: "/audio/coin.wav",
        explosion: "/audio/explosion.wav",
      },
      "game"
    );

    // Set master volume
    Audio.setVolume(1.0);

    // Create background music
    this.sounds.music = new AmbientSound("music", {
      loop: true,
      name: "background_music",
    });
  }

  playMusic() {
    this.sounds.music.play(0.8, 2000, AUDIO_RAMPS.EXPONENTIAL);
  }

  stopMusic() {
    this.sounds.music.stop(2000, AUDIO_RAMPS.EXPONENTIAL);
  }

  playJump() {
    const jump = new AmbientSound("jump", { name: "jump_sfx" });
    jump.play(0.5);
  }

  playCoin(position) {
    const coin = new DirectionalSound("coin", {
      maxDistance: 50,
      name: "coin_sfx",
    });
    coin.setPosition(position);
    coin.play(0.7);
  }

  playExplosion(position) {
    const explosion = new DirectionalSound("explosion", {
      maxDistance: 100,
      rolloffFactor: 2,
      name: "explosion_sfx",
    });
    explosion.setPosition(position);
    explosion.play(1.0);
  }
}
```

## Audio Listener

The audio listener position is automatically updated based on the camera position to ensure 3D audio works correctly.

```javascript
// Update listener position (called automatically)
Audio.updateListenerPosition();

// Update listener orientation (called automatically)
Audio.updateListenerOrientation();
```

## Checking Audio State

```javascript
// Check if audio context exists
if (Audio.hasContext()) {
  // Audio is initialized
}

// Check if sounds are loaded
if (Audio.hasSounds()) {
  // Sounds are ready to play
}
```

## See Also

- [Loading Assets](/engine/advanced/assets/loading.md) - Asset loading
- [Images and Textures](/engine/advanced/assets/images_and_textures.md) - Loading images
