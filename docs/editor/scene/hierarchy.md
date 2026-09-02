# Hierarchy Panel

The hierarchy panel displays the complete tree structure of all entities in the current scene. It provides a quick way to find, select, and organize entities — including renaming, deleting, duplicating, and reparenting them.

## Scene Tree

The hierarchy is shown as an expandable tree, rooted at the **Level** node (which shows the level's name). Each entity appears as a child of its parent, reflecting the actual parent-child relationships in the 3D scene. A badge in the panel header shows the total entity count.

```
Level
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

Each entity is displayed with a type-specific colored icon — meshes, models, cameras, lights, particles, sounds — so you can identify entity types at a glance.

## Searching

Use the search bar at the top of the panel to filter the tree. Matching entities stay visible along with their parents, so you always see where a result lives in the hierarchy. Clear the search to see all entities again.

::: tip
Drag-and-drop reparenting is disabled while a search filter is active.
:::

## Selecting Entities

Click on any entity in the hierarchy to:

1. **Select it in the viewport** — The entity is highlighted and transform gizmos appear
2. **Open its properties** — The [Inspector](/editor/inspector/properties) updates to show the selected entity's properties

The hierarchy and viewport selections are always in sync — selecting in one updates the other. Clicking the root **Level** node selects the level itself and opens its level-wide settings (including [per-level physics](/editor/inspector/physics#per-level-physics)).

### Selecting Multiple Entities

You can select several entities at once, in the hierarchy or the viewport:

- **`Ctrl/Cmd` + click** — add or remove an entity from the selection
- **`Shift` + click** (hierarchy) — select the range between the last-clicked entity and this one

With multiple entities selected, the transform gizmo acts on them as a group — move, rotate, or scale them together — and dragging any one of them in the hierarchy **reparents the whole selection** under the new parent. The inspector shows properties only when a single entity is selected; with several selected it prompts you to narrow to one.

## Renaming

Double-click an entity in the tree to open the **Rename Entity** dialog. You can also edit the name field in the inspector's Global tab.

## Deleting

Select an entity and press `Delete` (or `Backspace`). A confirmation dialog appears; if the entity has children, the dialog warns that **all nested entities will be deleted with it**. Deletion is permanent and cannot be undone.

## Copy and Paste

- `Ctrl/Cmd+C` copies the selected entity
- `Ctrl/Cmd+V` pastes a duplicate at a nearby position

The duplicate preserves the original's geometry, material, textures, and physics configuration. Children are not copied.

## Reparenting (Drag and Drop)

Drag any entity onto another to make it a child, or drop it into a gap between siblings to place it at that level of the tree. When reparenting:

- The entity's **world transform is preserved** — it stays exactly where it is in the scene, and its local transform is recalculated relative to the new parent
- Circular parenting (dropping a parent into its own child) is blocked
- Lights, particles, audio, and scenery entities cannot receive children
- The target parent expands automatically so you can see the result

## Parent-Child Relationships

The tree structure reflects entity parenting. When a parent entity is moved, rotated, or scaled, all of its children inherit those transforms. Child entity positions are relative to their parent.

This is useful for building complex objects from smaller parts — for example, attaching a weapon model as a child of a character model. If both parent and child have physics configured, the engine welds their colliders into a single compound body at runtime.
