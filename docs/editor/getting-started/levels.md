# Levels

A level represents a single game scene within a project. Each level has its own scene graph, entities, and assets.

## Creating a Level

Create a new level from the **level selector** in the header breadcrumb. Provide a **level name** and an empty scene is automatically set up and ready for editing.

## Switching and Managing Levels

Use the **level selector** to switch between levels in the current project. The 3D viewport updates to show the selected level's scene. The start level is marked with a star.

Each level entry has a context menu with **Rename** and **Delete** (the last remaining level of a project cannot be deleted). A save indicator next to the level name shows when your changes were last persisted.

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

## Level Physics Settings

Each level carries its own physics configuration — gravity direction and magnitude, simulation tick rate, and max substeps. Select the root **Level** node in the hierarchy and open the **Simulation** tab in the inspector to configure it. See [Per-Level Physics](/editor/inspector/physics#per-level-physics).

## Start Level

When you deploy your game, you choose a **start level** — the level that loads first when a player opens your game. This is configured during the [deployment](/editor/build-and-deploy/deploying) step.
