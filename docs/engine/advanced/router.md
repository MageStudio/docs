# Router

Mage uses a naive, hash based internal Router. This module handles changes in the page location, and its main goal is to start the right level for the right path. It also offers additional useful method to handle the state of the application.

## How it works

Router will use the `location.hash` to determine which level should be loaded at any given time. Changes in the `location.hash` will be registerd, and Router will try to load the required level if available, and resorting to the root level if not.

Assuming that your application has been deployed on `http://prettycoolapplication.com`, the root level is what will be loaded.
This means Router is internally mapping your levels like this:

- `/`: Root level, required. If missing, Mage will load a default empty level. Your location will look like this `http://prettycoolapplication.com/#/`.

- `/second`: A generic second level, optional. The name of the path can be whatever you prefer. Your location will look like this `http://prettycoolapplication.com/#/second`.

## Initialisation

Router initialisation has to be the first step of your application. This process requires two steps:

- Registering which level has to be loaded for which path.
- Call the `start` method with `assets` and `config` descriptions.

```javascript
import { Router } from 'mage-engine';
import RootLevel from './levels/root';
import SecondLevel from './levels/second';

window.addEventListener('load', () => {
    Router.on('/', RootLevel);
    Router.on('/second', SecondLevel);

    Router.start(config, assets);
});
```

::: tip
Both `.on` and `.start` methods will be explained in details in the [methods](/engine/advanced/router?id=methods) sections.
:::
:::



### Options

When created, each level will receive a set of options. These options are the query params in your URL. Router will automatically extract those params from your location.

For Example, being on `https://prettycoolapplication.com?questId=10#/second`, will have the following effect:
- The Level associated with the `/second` path will be loaded.
- The following `options` object will be passed to the Level constructor
```javascript
{
    questId: 10
}
```

::: tip
For more informations, please refer to the Level page [here](/engine/advanced/core/level.md?id=constructor);
:::
:::



::: warning
Be aware, this API is likely to change in the future. 
:::

---

## Methods

Router exposes a series of useful methods that can be used in your application.

#### on(path: string, LevelClass: BaseLevel)

This method is responsible for registering the desired `LevelClass` for the provided `path`. Using this method is mandatory if you're planning have levels.

#### start(config: object, assets: object)

::: warning
This method starts your application.
:::

Calling this method will effectively start your application. The moment when you decide to call this is entirely up to you. This means you can define your routes in a module (using the `.on` method explained above), and start the application only when everything you need is ready: for example, you might want to wait for an AJAX call to be completed, or for some other operation to be done before starting.

#### getCurrentLevel(): string

This method will return the path of the current level.

E.g.:
```javascript
// when on http://prettycoolapplication.com/#/mylevel

console.log(Router.getCurrentLevel()); // will print '/level';
```

#### goTo(path: string, options: object)

This method is used to programmatically navigate to a different level.

- `path: string`: This has to be a valid path for your application. If it's not valid, Router will load the Root level instead.
- `options: object`: These are the options for the level you want to navigate to. Router will set the query params on the URL, and send these options to the newly create Level.

E.g.:
```javascript
Router.goTo('/boss', { questId: 10 });
```