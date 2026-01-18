# Creating your first level

In the `index.js` file we imported a Level that doesn't exist yet. Let's create one.

Create a new file wherever you want, but for the sake of this example, let's stick to the path we defined in `index.js` and create a `Level.js` file in `PROJECT_ROOT/first/`.

::: tip
Mage Engine is expecting each Level to be a class extending the base class provided by the engine, called `Level`.
:::
:::



We can define it like this:

```js
    import { Level } from 'mage-engine';

    class FirstLevel extends Level {

        onCreate() {
            // do something cool here
        }
    }

    export default FirstLevel;
```

Explanation:

- `onCreate`: this is a lifecycle method of your Scene. It will be called when the scene has been created, assets have been loaded and it's now ready to render elements on your screen.

::: tip
For a more in-depth documentation of the Level class, please refer to this page: [Level](/engine/advanced/core/level.md)
:::
:::



If you had a web server and you visited `index.html` now, our FirstLevel will be bound to the root path, but it will render nothing. Our `onCreate` method is currently doing nothing, so how about we add something to it? It's time to say [Hello Cube](/engine/getting-started/hello-cube.md).
