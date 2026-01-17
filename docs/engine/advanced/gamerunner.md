# GameRunner

GameRunner is the core module responsible for managing level lifecycle, registration, and transitions in your Mage application.

## Import

```javascript
import { GameRunner } from 'mage-engine';
```

## Methods

```javascript
GameRunner.register(path, LevelClass)  // Register level at path
GameRunner.has(path)                    // Check if path is registered
GameRunner.get(path)                    // Get level class by path
GameRunner.start(path, options)         // Start level (returns Promise)
GameRunner.getCurrentLevel()            // Get running level instance
GameRunner.getCurrentPath()             // Get current level path
```

---

## Level Registration

Register your levels with paths before starting:

```javascript
import { GameRunner, Level } from 'mage-engine';

class MainMenu extends Level {
    onCreate() {
        console.log('Menu created');
    }
}

class GameLevel extends Level {
    onCreate() {
        console.log('Game created');
    }
}

// Register levels
GameRunner.register('/menu', MainMenu);
GameRunner.register('/game', GameLevel);
GameRunner.register('/game/level2', GameLevel2);
```

---

## Starting Levels

```javascript
// Start a level - returns a Promise
GameRunner.start('/game').then(level => {
    console.log('Level started:', level);
});

// With async/await
async function startGame() {
    const level = await GameRunner.start('/game');
    console.log('Ready to play!');
}
```

### Start Options

```javascript
GameRunner.start('/game', {
    loading: true   // Load level from storage (saved state)
});
```

---

## Level Transitions

```javascript
class MainMenu extends Level {
    onCreate() {
        // Create start button
        this.startButton = new UIButton('Start Game');
        this.startButton.onClick(() => {
            GameRunner.start('/game');
        });
    }
}

class GameLevel extends Level {
    onGameOver() {
        // Return to menu
        GameRunner.start('/menu');
    }
}
```

---

## Using with Router

The [Router](/engine/advanced/router.md) provides a higher-level API that wraps GameRunner:

```javascript
import { Router } from 'mage-engine';

// Register levels
Router.on('/menu', MainMenu);
Router.on('/game', GameLevel);

// Start application
Router.start(config, assets);

// Navigate
Router.go('/game');
```

> **Note:** For most applications, using Router is preferred over direct GameRunner usage.

---

## Accessing Current Level

```javascript
// Get current level instance
const level = GameRunner.getCurrentLevel();
level.pause();

// Get current path
const path = GameRunner.getCurrentPath();
if (path === '/game') {
    // In game
}
```

---

## Example: Level Selection

```javascript
class LevelSelect extends Level {
    onCreate() {
        const levels = [
            { path: '/game/level1', name: 'Forest' },
            { path: '/game/level2', name: 'Desert' },
            { path: '/game/level3', name: 'Ice' }
        ];
        
        levels.forEach((level, index) => {
            const button = new UIButton(level.name);
            button.setPosition({ y: index * 50 });
            button.onClick(() => {
                GameRunner.start(level.path);
            });
        });
    }
}

// Register all levels
GameRunner.register('/select', LevelSelect);
GameRunner.register('/game/level1', ForestLevel);
GameRunner.register('/game/level2', DesertLevel);
GameRunner.register('/game/level3', IceLevel);
```

---

## See Also

- [Router](/engine/advanced/router.md) - Higher-level navigation API
- [Level](/engine/advanced/core/level.md) - Level class documentation
- [Configuration](/engine/advanced/configuration.md) - App configuration