# Text Scripts

Text scripts let you write game logic in JavaScript using a built-in code editor. Scripts extend the Mage Engine's `BaseScript` class and are attached to entities to control their behavior.

## Code Editor

The text script editor is powered by CodeMirror and provides:

- **Syntax highlighting** for JavaScript/JSX
- **Auto-save** — Scripts are saved automatically when the editor loses focus
- **Keyboard shortcut** — `Cmd+S` (Mac) or `Ctrl+S` (Windows/Linux) to save manually

## Creating Text Scripts

Text scripts are created by uploading a JavaScript file:

1. Open the **Scripts** tab in the assets panel
2. Drag and drop a `.js` file, or use the upload button
3. The script appears in the scripts list and is ready to be attached to an entity

## Script Structure

A text script extends `BaseScript` from the Mage Engine:

```javascript
import { BaseScript } from 'mage-engine';

export default class MyScript extends BaseScript {
    start(entity) {
        // Called when the script is first attached
        this.entity = entity;
    }

    update(dt) {
        // Called every frame
        // dt = delta time since last frame
        this.entity.translate({ x: dt * 5, y: 0, z: 0 });
    }

    onDispose() {
        // Called when the entity or script is removed
    }
}
```

### Lifecycle Methods

| Method | Description |
|--------|-------------|
| `start(entity)` | Called once when the script is initialized. Receives the entity the script is attached to |
| `update(dt)` | Called every frame. `dt` is the delta time in seconds since the last frame |
| `onDispose()` | Called when the script or its entity is disposed |

## Attaching Scripts to Entities

1. Select an entity in the viewport or hierarchy
2. Open the **Scripts** tab in the inspector
3. Assign the script to the entity

At runtime, the script's `start()` method is called with the entity, and `update()` runs every frame.

::: tip
For a visual, code-free approach to scripting, see [Visual Scripts](/editor/scripting/visual-scripts).
:::
