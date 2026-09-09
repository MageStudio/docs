# Projects

A project is the top-level container for everything in Mage Editor. It holds your levels, assets, scripts, builds, and deployments.

## Creating a Project

When you first open Mage Editor, you land on the **Welcome** page. From here you can create a new project by providing:

- **Project name** — A descriptive name for your project
- **Starting level** — The template for the project's first level

Once created, the project is ready for you to start adding levels and assets. You can also create additional projects at any time from the project selector in the header.

## Switching and Managing Projects

Use the **project selector** in the header breadcrumb to switch between your existing projects. The editor loads the selected project along with its levels and assets.

Each project entry has a context menu with:

- **Rename** — Change the project's name
- **Delete** — Permanently remove the project and everything in it (asks for confirmation)

## Project Structure

Each project contains:

| Resource | Description |
|----------|-------------|
| **Levels** | Individual game scenes, each with its own entities and configuration |
| **Assets** | 3D models, textures, audio, video, and scripts shared across levels |
| **Builds** | Compiled game bundles ready for deployment |
| **Deployments** | Published instances of your game accessible via URL |

::: tip
Projects track when they were last accessed, so your most recently used projects appear first.
:::

## Usage Limits

During the alpha, each account has usage limits. Open **Usage** from the user avatar dropdown in the header to see your plan and current consumption:

| Resource | Alpha limit |
|----------|-------------|
| **Storage** | 1 GB |
| **Active deployments** | 3 |
| **Max upload size** | 10 MB per file |

Projects, levels, builds, and entities are unlimited. If you hit a limit, the editor shows how much of the resource you're using.
