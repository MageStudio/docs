# Game Preview

The game preview lets you play your game directly inside the editor — no build or deployment required. The preview runs the real engine bundle in a sandboxed frame, so **physics, scripts, and controls behave exactly as in the published game**.

## Controls

The preview transport buttons live in the center of the header:

| Button | Shortcut | Description |
|--------|----------|-------------|
| **Play / Resume** | `F5` or `Ctrl/Cmd+P` | Build the level and start (or resume) the preview |
| **Pause** | `F6` or `Ctrl/Cmd+Shift+P` | Freeze the running preview |
| **Stop** | `Esc` | Stop the preview and return to editing |
| **Select Element** | `Ctrl/Cmd+I` | Click an entity in the running game to inspect it in the editor |

While the preview is running, the viewport border is tinted to reflect the state — running, paused, or error — and the floating toolbar is hidden.

## Input

Keyboard and mouse input is forwarded into the preview automatically: the preview frame is focused when the game starts, and pointer lock is supported for first- and third-person controls. Focus returns to the editor when the preview stops.

## Console

Press `` Ctrl/Cmd+` `` to toggle the preview **console** — a bottom overlay showing your game's log output, with a clear button. Useful for debugging scripts with Console Log nodes or `console.log` calls.

## Preview Settings

The preview settings panel lets you tune how the game is rendered:

| Setting | Options |
|---------|---------|
| **Resolution** | Full (container), 1920×1080, 1280×720, 854×480, 640×360, or custom |
| **Pixel Ratio** | Device default, 0.5× – 2× |
| **Shadows** | Off / Low / Medium / High |
| **Anti-Aliasing** | On / Off |
| **Max FPS** | Unlimited / 30 / 60 / 120 |
| **Debug** | FPS counter, wireframe, bounding boxes |

Settings persist between sessions and can be reset to defaults.

::: tip
The preview builds your level in-memory each time you press Play, so it always reflects your latest changes — including unsaved script edits that have auto-saved.
:::
