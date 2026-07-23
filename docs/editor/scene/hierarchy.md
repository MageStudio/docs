# Hierarchy Panel

The hierarchy panel displays the complete tree structure of all entities in the current scene. It provides a quick way to find, select, and understand the relationships between entities.

## Scene Tree

The hierarchy is shown as an expandable tree, with the scene as the root node. Each entity appears as a child of its parent, reflecting the actual parent-child relationships in the 3D scene.

```
Scene
├── AmbientLight
├── SunLight
├── Camera
├── Ground (Plane)
├── Player (Model)
│   ├── Weapon (Model)
│   └── Shield (Model)
├── Enemy (Model)
└── Crate (Cube)
```

## Entity Type Icons

Each entity in the tree is displayed with an icon that indicates its type at a glance:

| Icon | Entity Type |
|------|-------------|
| Globe | Scene (root node) |
| Gateway | Mesh or Model |
| Video Camera | Camera |
| Lightbulb | Light (any type) |
| Folder | Group |

## Selecting Entities

Click on any entity in the hierarchy to:

1. **Select it in the viewport** — The entity is highlighted and transform gizmos appear
2. **Open its properties** — The [Inspector](/editor/inspector/properties) updates to show the selected entity's properties

The hierarchy and viewport selections are always in sync — selecting in one updates the other.

## Parent-Child Relationships

The tree structure reflects entity parenting. When a parent entity is moved, rotated, or scaled, all of its children inherit those transforms. Child entity positions are relative to their parent.

This is useful for building complex objects from smaller parts — for example, attaching a weapon model as a child of a character model.
