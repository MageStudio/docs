# Setting up your project

## index.html

First things first, you will need to setup a `index.html` page somewhere in your project folder. The page should look like something like this:

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/dist/app.css">
        <script type="text/javascript" src="/dist/app.js"></script>
    </head>
    <body>
    </body>
</html>
```

The structure of the page is completely up to you. The engine will automatically bind the `canvas` and the UI to the appropriate containers, which are defaulted to be the `body`. You can change this by configuring the engine with the appropriate settings. More on this in the [Configuration](/engine/advanced/configuration) section of these docs.

?> As you can see, we're referring to `/dist/app.css` and `/dist/app.js`. This means we're going to assume you will have a bundling tool installed, and that you have a basic understanding of how they work. **We're not going to cover how to bundle your app in this "Getting Started" section**, so if you find yourself stuck, please refer to the [Bundling](/engine/advanced/bundling.md) page.

---

## index.js

You project needs an entry point, which we will call `index.js` . It needs to look like this:

```js
import { Router } from 'mage-engine';
import Level from './first/Level';

const assets = {};
const config = {};

window.addEventListener('load', function() {
    Router.on('/', Level);
    Router.start(config, assets);
});
```

**Explanation**:

Mage is using an internal Router to bind Levels to url fragments.

You can import Router by doing `import { Router } from 'mage-engine'` . As you can see in this example, we're using the `load` event on the window object to configure Router and start our application.

- `Router.on('/', Level)` : this line is performing the binding between the base route and your Level. This means that when the user will navigate to `http://whereveryourapp.is` , the `Level` will be executed.
- `Router.start(config, assets)` : this is what starts the application. This method requires two parameters: config, assets. Both objects will be separately explained in detail in their respective pages: [Configuration](/engine/advanced/configuration.md) and [Assets](/engine/advanced/assets/loading.md).

The last thing is the level import line: `import Level from './first/Level';`.

This line is obviously just importing the Level from where you defined it. There are no constraints on how you name your Levels or where you define them.

?> More informations on Router, how to configure your app or how to define and load your assets can be found here: [Router](/engine/advanced/router.md), [Configuration](/engine/advanced/configuration.md) and [Assets](/).

---

## What's next?

You're now ready to create your first Level. Please follow the next step: [Creating the first Level](/engine/getting-started/creating-first-level.md)