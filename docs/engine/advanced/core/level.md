# Level

Every level you create must be a class extending `Level` from `mage-engine`, like this:

```js
import { Level } from 'mage-engine';

export default class MyLevel extends Level {
    ...
}
```

---

## Router integration

In order for your level to be used within your application, you need to link it to the Router module using the `Router.on` method. Since every level is associated to a specific path, you need to provide both path and the Level to this method like this:

```js
import MyLevel from './MyLevel';

window.addEventListener('load', function() {
    const path = '/mylevel';

    Router.on(path, MyLevel);

    Router.start(config, assets);
});
```

?> A more in depth explanation of how the Router module works, how it handles levels and which methods exposes can be found [here](/engine/advanced/router.md).

---

## Methods

#### constructor(options: object)

The constructor of your level will receive an `options` object, that will be available within your Level as `this.options`. This object will be provided by the Router module, and it's the representation of the URL query parameters.

**Example**:

The user lands on `www.domain.com/?value=10&anotherValue=20#/myLevel`. What will happen is that the `MyLevel` Level will be loaded, and the options object will be:
```js
{
    path: '/myLevel',
    value: 10,
    anotherValue: 20
}
```

#### loadScene(url: string)

- `url` is the url (or relative path) to a JSON representation of the

This method will be automatically called during your scene loading steps. By default, it will try to load a JSON from the following relative path `assets/scenes/${levelName}.json`, where `levelName` is the name of your scene.

**Example**:

```javascript
import { Level } from 'mage-engine';

export default class MyLevel extends Level {
    ...
}
```

Given the above level, the following url will be loaded: `assets/scenes/MyLevel.json`.

#### toJSON(): json

This method will return a JSON representation of the level.

---

## Lifecycle Methods

Here is a representation of the Level lifecycle:

![startup lifecycle](/img/level_lifecycle.png)

#### onCreate()

This can be considered as the entry point of your level. Inside this method is safe to add elements to the scene, add PostProcessing effects, enabling UI and do pretty much whatever you want.

#### onStateChange(state: Object)

This lifecycle method gets called everytime you update the Redux store.

- `state: Object`: this object represents the current state of your application.

?> For a more in-depth explanation on how to handle a Redux store in your Mage application, check out this [page](/engine/advanced/state_management.md).

#### onUpdate(dt: ms)

This lifecycle method gets called for every frame. You can use this to dinamically update elements of your level, even if it's recommended to use a [script](/engine/advanced/scripts.md).

---

## Level Disposal

When your application is about to change level, the current level is disposed. You can learn more about it in the Router documentation page [here](/engine/advanced/router.md). Disposing the level causes two lifecycle methods to be called.

#### onBeforeDispose

This lifecycle methods gets called as soon as the disposal process starts. You can use this to clear up resources.

#### onDispose

This lifecycle methods gets called when the disposal process ends.
