# Building

Building compiles your project into a standalone game bundle that can be deployed and played in a browser.

## Triggering a Build

Click the **Build** button in the top toolbar to start a build. The button shows the time since the last successful build (e.g. "2 hours ago") so you can tell at a glance if a build is up to date.

While a build is in progress, the button shows a loading state.

## What Happens During a Build

When you trigger a build, the following steps happen:

1. **Job created** — A build record is created in the database and a job is queued to the build service
2. **Assets bundled** — The build service collects all assets (models, textures, audio, scripts) from storage
3. **Scripts compiled** — Visual scripts are compiled to JavaScript; text scripts are included as-is
4. **Game bundled** — Everything is bundled together using esbuild into a single, optimized package
5. **Tarball uploaded** — The final build artifact is packaged as a tarball and uploaded to storage

## Build History

Each project maintains a history of builds. When deploying, you can select which build to publish — you're not limited to the latest one.

::: tip
Builds are processed asynchronously by the mage-studio-builder service. You can continue editing while a build runs in the background.
:::
