# Deploying

Once you have a successful build, you can deploy it to the cloud to make your game playable via a public URL.

## Publishing

Click the **Publish** button in the top toolbar to open the deployment modal. From here you can create a new deployment or update an existing one.

### Creating a New Deployment

When publishing for the first time:

1. Click **Publish** in the top toolbar
2. Select the **build** you want to deploy from the build selector
3. Choose a **start level** — the level that loads first when a player opens your game
4. Click **Deploy**

Your game will be available at a URL in the format:

```
https://{deployment-name}.play.mage.studio
```

### Updating an Existing Deployment

To update a deployed game with a new build:

1. Click **Publish** in the top toolbar
2. The modal shows your current deployment with its URL and status
3. Select a new **build** from the build selector
4. Optionally change the **start level**
5. Click **Update**

## Deployment Status

Each deployment has a status indicator:

| Status | Description |
|--------|-------------|
| **Online** | The deployment is live and accessible at its URL |
| **Offline** | The deployment exists but is not publicly accessible |

You can toggle the status to take a deployment offline without deleting it.

## Deployment URL

The deployment URL is displayed in the publish modal with a copy button for convenience. You can also click the external link button next to the Publish button to open the deployed game in a new tab.

## How Deployments Work

Deployments are served by the **mage-studio-runner** service, which handles subdomain routing. When a player visits your deployment URL:

1. The runner identifies the deployment by subdomain
2. It serves the build files (HTML, JavaScript, assets) from storage
3. The Mage Engine initializes in the player's browser and loads the start level
4. The game is ready to play

::: tip
You can deploy different builds to the same deployment URL to iterate quickly. Players always see the latest deployed build.
:::
