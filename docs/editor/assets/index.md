# Assets

Assets are the files that make up your game — 3D models, textures, audio, video, and scripts. The assets panel in the editor provides a central place to upload, organize, and manage all the files used in a level.

## Assets Panel

The assets panel is located below the 3D viewport and is organized into tabs by asset type:

| Tab | Description |
|-----|-------------|
| **Models** | 3D model files (GLTF, GLB, FBX, OBJ, etc.) |
| **Images** | Textures, sprites, and image files |
| **Audio** | Sound and music files |
| **Video** | Video files |
| **Scripts** | Text and visual scripts |

## Uploading Assets

There are two ways to upload assets:

### Upload Button
Each tab in the assets panel has an **upload button**. Click it to open a file picker and select files from your system.

### Drag and Drop
You can drag files directly from your file system into:
- The **assets panel** to upload them as assets
- The **3D viewport** to upload and immediately add them to the scene

## Using Assets

Once uploaded, assets can be used in several ways:

- **Models** — Drag from the assets panel into the viewport to place them in the scene
- **Images** — Select as texture maps in the [Material](/editor/inspector/materials) inspector
- **Audio** — Attach to audio entities in the scene
- **Scripts** — Attach to entities or levels via the inspector

## Asset Storage

Assets are stored in MinIO (S3-compatible object storage) and are associated with a specific project and level. Each asset tracks:

- File name and type
- Upload status
- Dependencies (e.g. a model that references specific textures)

::: tip
Assets are scoped to a level within a project. If you need the same asset in multiple levels, you'll need to upload it to each level separately.
:::
