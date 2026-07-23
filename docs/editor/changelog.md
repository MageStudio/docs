# Changelog

The editor ships continuously — this changelog groups the highlights by month.

## July 2026

- **Kinematic colliders** — new Kinematic toggle in the physics inspector for movable platforms that carry other bodies
- **World transform editing** — inspector position/rotation fields show and edit world-space values when the World space toggle is active; scale stays local
- **Variable Reference node** — reuse any variable in a visual script without dragging long edges
- Wider zoom-out range for large visual coding graphs
- Fixes: copy/paste preserves geometry and no longer double-pastes; reparenting persists the child's transform correctly
- Engine updated to `v3.28.x`: compound colliders for attached children, reparenting fixes

## June 2026

- **Texture options** — per-texture Repeat, Offset, and Wrapping controls (Repeat / Clamp to edge / Mirrored repeat), with per-axis wrapping via the link/unlink toggle
- **Per-level physics** — Simulation tab settings now reach built and deployed games
- **Cascade delete** — deleting a parent removes its children, with a clear warning dialog

## May 2026

- **Editor UI redesign** — new global header with project/level breadcrumb, floating viewport toolbar, refreshed asset tiles and dropdowns
- **Per-level physics** — new Simulation tab on the level inspector: gravity direction/magnitude with game-feel presets, simulation tick rate, and max substeps

## April 2026

- **Game preview** — play your game inside the editor with real physics, scripts, and controls; includes pause/resume, element inspection, a console overlay, and quality/resolution settings
- **Physics, controls & collision nodes** — Enable/Disable Physics, On Collision, Get Physics State, First/Third Person Control, and more in visual coding
- **Alignment guides** — nodes snap to blue helper lines while dragging in the visual editor
- **Rename entities** — from the inspector or by double-clicking in the hierarchy
- **Auto-save for scripts** — text and visual scripts save automatically a couple of seconds after you stop editing

## March 2026

- **Animations in the editor** — animations inspector tab with per-clip playback, loop toggle, crossfade, speed and weight controls
- **Getting Started tutorial** — a guided tour for first-time users, reopenable from the Help menu
- **In-app issue reporting** — Report issue entry in the Help menu
- **Usage view** — see your plan's storage, deployment, and upload limits from the user dropdown
- **More visual coding nodes** — expanded node catalog with improved inputs
- Sign-in/sign-up fixes and API authentication hardening

## February 2026

- **Lights inspector** — complete controls for all light types, including shadows
- **Particle & effects inspectors** — full editing for Fire, Explosion, Trail, Rain, Snow, Fountain, plus scenery effects
- **Undo/redo** — `Ctrl/Cmd+Z` / `Ctrl/Cmd+Shift+Z` for transform edits
- **Hierarchy search** — filter the scene tree by name
- **Drag-and-drop reparenting** — restructure the hierarchy directly
- **Improved visual coding palette** — categorized, searchable node list with better styling
- Large entity configurations no longer fail to save (413 errors fixed)
