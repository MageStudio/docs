# Router

## What is the Router?

The Router is Mage's navigation system. It connects URL paths to your Levels, making your game feel like a web application where different "pages" are actually different game states or scenes.

**Why URL-based routing?**
- **Shareable links** - Players can share direct links to specific levels
- **Browser navigation** - Back/forward buttons work naturally
- **Deep linking** - Start at any level, not just the beginning
- **Developer convenience** - Jump directly to the level you're working on

---

## How Navigation Works

Mage uses hash-based URLs to track the current level:

```
https://mygame.com/#/           → Root level (menu)
https://mygame.com/#/game       → Game level
https://mygame.com/#/boss       → Boss level
```

When the URL hash changes (user clicks a link, presses back, or you call `goTo()`), the Router:

1. Parses the new path from the hash
2. Cleans up the current level
3. Loads assets for the new level (if any)
4. Creates and starts the new level

---

## Setting Up Routes

Define routes before starting your application:

```javascript
import { Router } from 'mage-engine';
import MenuLevel from './levels/Menu';
import GameLevel from './levels/Game';
import BossLevel from './levels/Boss';

window.addEventListener('load', () => {
    // Map paths to level classes
    Router.on('/', MenuLevel);        // Root level (required)
    Router.on('/game', GameLevel);
    Router.on('/boss', BossLevel);
    
    // Start the engine
    Router.start(config, assets, '#container');
});
```

::: warning
The root path (`/`) is required. If a user visits an undefined path, Mage falls back to the root level.
:::

---

## Dynamic Routes with Parameters

Pass data to levels via URL query parameters:

```
https://mygame.com/?levelId=5&difficulty=hard#/game
```

The Router extracts these and passes them to your level:

```javascript
class GameLevel extends Level {
    onCreate(options) {
        console.log(options.levelId);    // "5"
        console.log(options.difficulty); // "hard"
        
        // Load the appropriate level data
        this.loadLevelData(options.levelId);
    }
}
```

---

## Common Workflows

### Navigating Between Levels

```javascript
import { Router } from 'mage-engine';

class MenuLevel extends Level {
    onCreate() {
        // When player clicks "Start Game"
        this.onStartClick = () => {
            Router.goTo('/game', { 
                difficulty: 'normal',
                characterId: this.selectedCharacter 
            });
        };
    }
}
```

### Checking Current Location

```javascript
const currentPath = Router.getCurrentLevel();

if (currentPath === '/boss') {
    // Show boss-specific UI
}
```

### Level Transitions Flow

```
Menu ──────► Game ──────► Boss ──────► Victory
  │            │            │
  │            ▼            ▼
  └──────── Settings    Game Over
               │            │
               └────────────┘
                    │
                    ▼
                  Menu
```

---

## API Reference

### on(path, LevelClass)

Registers a level for a path. Call this before `start()`.

| Parameter | Type | Description |
|-----------|------|-------------|
| path | string | URL path (e.g., `/`, `/game`, `/level/boss`) |
| LevelClass | class | A class extending Level |

```javascript
Router.on('/game', GameLevel);
Router.on('/settings', SettingsLevel);
```

### start(config, assets, container?)

Starts the application. Call this after registering all routes.

| Parameter | Type | Description |
|-----------|------|-------------|
| config | object | Engine configuration |
| assets | object | Asset definitions |
| container | string | CSS selector for game container (optional) |

```javascript
Router.start(config, assets, '#gameContainer');
```

### goTo(path, options?)

Navigates to a different level programmatically.

| Parameter | Type | Description |
|-----------|------|-------------|
| path | string | Target path |
| options | object | Query parameters to pass (optional) |

```javascript
// Simple navigation
Router.goTo('/game');

// With parameters
Router.goTo('/game', { levelId: 5, mode: 'survival' });
```

### getCurrentLevel()

Returns the current level's path.

```javascript
const path = Router.getCurrentLevel(); // "/game"
```

---

## Best Practices

**Keep route names semantic:**
```javascript
// Good
Router.on('/menu', MenuLevel);
Router.on('/game', GameLevel);
Router.on('/settings', SettingsLevel);

// Avoid
Router.on('/l1', Level1);
Router.on('/l2', Level2);
```

**Use options for level configuration:**
```javascript
// Pass meaningful data through options
Router.goTo('/game', { 
    levelId: 3,
    difficulty: 'hard',
    checkpoint: 'mid' 
});
```

**Handle unknown routes gracefully:**
The root level (`/`) acts as a fallback. Make sure it's a sensible starting point like a menu or loading screen.

::: tip
For configuration and assets setup, see the [Configuration guide](/engine/advanced/configuration).
:::