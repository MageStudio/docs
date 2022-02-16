# Applying Textures

So far, we created a lonely box in the middle of the screen. We're now going to add a texture to it.
Only a couple things are needed in order to load a texture on our box:

- The texture itself. Yes, use the image below.
<br/>
 <img src="engine/getting-started/img/wood_crate.jpg" alt="drawing" style="width:300px; display:block; margin:auto;"/>

- A new entry in our app assets description. Remember the assets object we created in the `index.js` file earlier? We're going to change it like so:

### index.js
```js
const config = {};
const assets = {
    textures: {
        crate: 'PATH/TO/YOUR/wood_crate.jpg'
    }
};

window.addEventListener('load', () => {
    // same code we had before
});
```

- We added a new `textures` field in our `assets` object. Each entry will be used by the engine to load the textures automatically at startup. This means that when the application is running, each texture is ready to be used.

?> Assets configuration can get a bit more complicated than this, please refer to the proper documentation page here: [Loading Assets](/engine/advanced/assets/loading.md).

