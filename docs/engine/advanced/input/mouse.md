# Mouse

Controlling mouse input allows you to detect interactions with elements of your level, as well as regular mouse-screen interactions.

---

## Enabling Mouse

Enabling Mouse input is straightforward:

```js
import { Input } from 'mage-engine';

// somewhere inside your app
Input.enableMouse();
```

> The Mouse module will be available as `Input.mouse`.

---

## Events

::: tip
All the following events have listeners in your Scene, according to the following pattern: for each event, the listener that will be used is `onEventName`, assuming that the event is `eventName`. Note that the difference between the listener name and the event name is the upperCase event name preceded by the prefix `on`.
:::
:::



If you want to set up listeners in your scripts, you have to:

```js
import { Input } from 'mage-engine';

// inside your script
start() {
    Input.enableMouse();
}
```

---

### `mouseDown`

This event will be fired once the page receives a `mouseDown` event. Your listener will receive the following event:

```json
{
    type: 'mouseDown',
    mouse: {
        x,
        y,
        normalized: {
            x,
            y
        }
    }
}
```

- `mouse` holds the coordinates of where the user clicked. The structure is as follows:
    - `x`: is the coordinate relative to the dom element where your canvas is rendered on the X axis.
    - `y`: is the coordinate relative to the dom element where your canvas is rendered on the Y axis.
    - `normalized`: this object holds the normalised values of the above coordinates.

---

### `mouseUp`

This event will be fired once the page receives a `mouseUp` event. Your listener will receive the following event:

```json
{
    type: 'mouseUp',
    mouse: {
        x,
        y,
        normalized: {
            x,
            y
        }
    }
}
```

- `mouse` holds the coordinates of where the user clicked. The structure is as follows:
    - `x`: is the coordinate relative to the dom element where your canvas is rendered on the X axis.
    - `y`: is the coordinate relative to the dom element where your canvas is rendered on the Y axis.
    - `normalized`: this object holds the normalised values of the above coordinates.

---

### `mouseMove`

This event will be fired once the page receives a `mouseMove` event. Your listener will receive the following event:

```json
{
    type: 'mouseMove',
    mouse: {
        x,
        y,
        normalized: {
            x,
            y
        }
    }
}
```

- `mouse` holds the coordinates of where the user cursor is. The structure is as follows:
    - `x`: is the coordinate relative to the dom element where your canvas is rendered on the X axis.
    - `y`: is the coordinate relative to the dom element where your canvas is rendered on the Y axis.
    - `normalized`: this object holds the normalised values of the above coordinates.

---

### `meshClick`

This event will be fired once the page receives a `meshClick` event. Your listener will receive the following event:

```json
{
    type: 'meshClick',
    mouse: {
        x,
        y,
        normalized: {
            x,
            y
        }
    },
    meshes
}
```

- `mouse` holds the coordinates of where the user clicked. The structure is as follows:
    - `x`: is the coordinate relative to the dom element where your canvas is rendered on the X axis.
    - `y`: is the coordinate relative to the dom element where your canvas is rendered on the Y axis.
    - `normalized`: this object holds the normalised values of the above coordinates.
- `meshes`: this is a list of all the meshes that intercepted the click.

::: tip
Each entry of the `meshes` list is a `BaseMesh`. Please refer to the [Element](/engine/advanced/core/element) documentation.
:::



---

### `meshDeselect`

This event will be fired when the user clicks on the level but no meshes intercept the event.

```json
{
    type: 'meshDeselect'
}
```

---

## Methods

The Mouse module exposes the following method:

#### getIntersections(): list

This method will check intersections between your mouse and your level meshes. It will return a list of meshes.

**Usage**:
```js
const meshes = Input.mouse.getIntersections();
console.log(meshes); // [ { mesh1 }, { mesh2 } ... ] 
```

::: tip
Each entry of the returned list is a `BaseMesh`. Please refer to the [Element](/engine/advanced/core/element) documentation.
:::



---

## Disabling

If you wish to disable the Mouse input, you can do so by:

```js
Input.disableMouse();
```

from this point on, your application will stop receiving events.

