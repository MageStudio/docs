# Features

The Features module provides browser feature detection utilities to check for WebGL, Web Audio API, Web Workers, and other capabilities before using them.

## Import

```javascript
import Features, { FEATURES } from "mage-engine";
```

## Feature Constants

```javascript
const FEATURES = {
  WEBGL: "webgl",
  WEBAUDIOAPI: "webaudioapi",
  WEBWORKER: "webworker",
  LOCALSTORAGE: "localStorage",
  AJAX: "ajax",
  OFFSCREENCANVAS: "offscreenCanvas",
  GAMEPADAPI: "gamepadapi",
  MEMORY: "memory",
};
```

## Methods

### `isFeatureSupported(feature)`

Check if a specific feature is supported.

```javascript
if (Features.isFeatureSupported(FEATURES.WEBGL)) {
  console.log("WebGL is supported!");
}

if (Features.isFeatureSupported(FEATURES.GAMEPADAPI)) {
  // Enable gamepad controls
}
```

### `checkSupportedFeatures()`

Check all configured features. Returns a Promise that resolves if all pass, or rejects with an array of failures.

```javascript
Features.checkSupportedFeatures()
  .then(() => {
    console.log("All features supported!");
    // Start the game
  })
  .catch((failures) => {
    console.error("Missing features:", failures);
    // Show compatibility warning
  });
```

### `setUpPolyfills()`

Sets up `requestAnimationFrame` polyfill.

```javascript
Features.setUpPolyfills();
```

## Individual Feature Tests

Each test returns an object: `{ success: boolean }`

### `Features.webgl()`

Test WebGL support.

```javascript
const result = Features.webgl();
if (result.success) {
  console.log("WebGL is available");
}
```

### `Features.webaudioapi()`

Test Web Audio API support.

```javascript
const result = Features.webaudioapi();
if (result.success) {
  // Initialize audio system
}
```

### `Features.webworker()`

Test Web Worker support.

```javascript
const result = Features.webworker();
if (result.success) {
  // Use workers for heavy computation
}
```

### `Features.localStorage()`

Test localStorage availability.

```javascript
const result = Features.localStorage();
if (result.success) {
  // Save game progress locally
}
```

### `Features.ajax()`

Test XMLHttpRequest support.

```javascript
const result = Features.ajax();
if (result.success) {
  // Make network requests
}
```

### `Features.offscreenCanvas()`

Test OffscreenCanvas support.

```javascript
const result = Features.offscreenCanvas();
if (result.success) {
  // Use offscreen canvas for rendering
}
```

### `Features.gamepadapi()`

Test Gamepad API support.

```javascript
const result = Features.gamepadapi();
if (result.success) {
  // Enable gamepad controls
}
```

### `Features.memory()`

Test performance.memory availability.

```javascript
const result = Features.memory();
if (result.success) {
  // Monitor memory usage
}
```

## Default Tests

The following features are tested by default when calling `checkSupportedFeatures()`:

- WebGL
- Web Audio API
- Web Worker
- LocalStorage
- AJAX

## Examples

### Game Initialization

```javascript
import Features, { FEATURES } from "mage-engine";

async function initGame() {
  // Set up polyfills first
  Features.setUpPolyfills();

  try {
    // Check all required features
    await Features.checkSupportedFeatures();

    // All features supported, start the game
    startGame();
  } catch (failures) {
    // Show error to user
    showCompatibilityError(failures);
  }
}
```

### Optional Feature Check

```javascript
// Check for gamepad support (optional feature)
if (Features.isFeatureSupported(FEATURES.GAMEPADAPI)) {
  initGamepadControls();
} else {
  console.log("Gamepad not supported, using keyboard only");
}
```

### Feature-Dependent Loading

```javascript
// Load high-quality assets only if memory API is available
if (Features.memory().success) {
  const memory = performance.memory;
  if (memory.jsHeapSizeLimit > 1000000000) {
    // 1GB
    loadHighQualityAssets();
  } else {
    loadLowQualityAssets();
  }
} else {
  // Default to standard quality
  loadStandardAssets();
}
```

### Graceful Degradation

```javascript
class AudioManager {
  constructor() {
    if (Features.webaudioapi().success) {
      this.useWebAudio = true;
      this.initWebAudio();
    } else {
      this.useWebAudio = false;
      console.warn("Web Audio not supported, audio disabled");
    }
  }

  play(soundId) {
    if (!this.useWebAudio) return;
    // Play sound...
  }
}
```

## See Also

- [Math Utilities](/engine/utilities/math.md) - Math functions
- [Workers](/engine/utilities/workers.md) - Web worker utilities
