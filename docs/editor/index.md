# Mage Editor

Mage Editor is a browser-based 3D game editor built on top of the [Mage Engine](/engine/). It provides a visual workspace for building 3D scenes, managing assets, scripting game logic, and deploying your games to the cloud.

## Features

- **3D Scene Editing** — Place, transform, and configure entities in a real-time 3D viewport with translate, rotate, and scale gizmos
- **Inspector** — Context-aware property panels for meshes, lights, cameras, materials, physics, and animations
- **Asset Management** — Upload and organize 3D models, textures, audio, video, and scripts with drag-and-drop support
- **Visual Scripting** — Build game logic with a node-based editor featuring 60+ node types across events, transforms, materials, physics, audio, and more
- **Text Scripting** — Write JavaScript scripts with a built-in code editor powered by CodeMirror
- **Scene Hierarchy** — Tree view of all entities in the scene with type-based icons and selection
- **Build & Deploy** — Build your game and publish it to the cloud with a single click

## Editor Layout

The editor workspace is divided into four main areas:

```
┌─────────────────────────────────────────────────┐
│                   Top Toolbar                   │
│         Project · Level · Build · Publish       │
├────────────────────────┬────────────────────────┤
│                        │                        │
│   3D Viewport          │   Hierarchy Panel      │
│   + Left Toolbar       │   (scene tree)         │
│   (transform tools)    │                        │
│                        ├────────────────────────┤
│                        │                        │
│                        │   Inspector Panel      │
├────────────────────────┤   (properties)         │
│   Assets Panel         │                        │
│   (models, textures,   │                        │
│    audio, scripts)     │                        │
└────────────────────────┴────────────────────────┘
```

All panels are resizable using draggable splitters, so you can adjust the layout to your preference.

## Getting Started

If you're new to Mage Editor, start with the [Interface Overview](/editor/getting-started/interface) to familiarize yourself with the workspace, then move on to [Projects](/editor/getting-started/projects) and [Levels](/editor/getting-started/levels) to learn how to organize your work.

See the [changelog](/editor/changelog) for recent updates.
