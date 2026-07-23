# Levels

A level represents a single game scene within a project. Each level has its own scene graph, entities, and assets.

## Creating a Level

You can create a new level from within a project. Each level requires:

- **Name** — A descriptive name for the level
- **Description** — An optional summary

When a level is created, an empty scene is automatically set up and ready for editing.

## Switching Levels

Use the **Level Selector** in the top toolbar to switch between levels in the current project. The 3D viewport updates to show the selected level's scene.

## Level Contents

Each level contains:

| Resource | Description |
|----------|-------------|
| **Scene** | The root container for all entities in the level |
| **Entities** | 3D objects, lights, cameras, and sounds placed in the scene |
| **Assets** | Files (models, textures, audio) used by entities in this level |
| **Scripts** | Level-scoped and entity-scoped scripts attached to this level |

## Level Scripts

Scripts can be scoped to an entire level using the **LEVEL** scope. Level scripts run their `onCreate()` method when the level loads, making them useful for initialization logic, global event handling, and game state management.

See [Scripting](/editor/scripting/visual-scripts) for more details on script scopes.

## Start Level

When you deploy your game, you choose a **start level** — the level that loads first when a player opens your game. This is configured during the [deployment](/editor/build-and-deploy/deploying) step.
