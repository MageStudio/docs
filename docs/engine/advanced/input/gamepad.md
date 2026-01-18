# Gamepad

Mage supports gamepads input via [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API). This guide will explain how to read Gamepad input and use it in your application.

---

## Enabling Gamepad

Enabling Gamepad input is straightforward:

```js
import { Input } from 'mage-engine';

// somewhere inside your app
Input.enableGamepad();
```

> The Gamepad module will be available as `Input.gamepad`.

::: warning
Events will be fired as soon as a gamepad is detected. For safety reasons, **user input is required before the gamepad is fully detected**: we recommend you to inform the user they should press a button on their device in order to use it.
:::

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
    Input.enableGamepad();
    Input.addEventListener('gamepadConnected', this.onGamepadConnected.bind(this));
}

onGamepadConnected(event) {
    // do something here
}
```

---

### `gamepadConnected`

This event will be fired once a gamepad is detected. Your listener will receive the following event:

```json
{
    type: 'gamepadConnected',
    gamepad
}
```

- `gamepad` follows the definition described [here](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad).

---

### `gamepadDisconnected`

This event will be fired once a gamepad is disconnected. Your listener will receive the following event:

```json
{
    type: 'gamepadDisconnected',
    gamepad
}
```

- `gamepad` follows the definition described [here](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad).

---

### `axisChange`

This event is fired whenever the user moves the joysticks. The event looks like this:

```json
{
    type: 'axisChange',
    value: { x, y },
    gamepad,
    joystick
}
```

- `value` contains the current value on the `x` and `y` axis.
- `gamepad` follows the definition described [here](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad).
- `joystick` is the id of the joystick currently being manipulated.

---

### `gamepadButtonPressed`

Whenever you press or keep pressed a button on your gamepad, the following event will be dispatched:

```json
{
    type: gamepadButtonPressed,
    button: { pressed, value, index, key },
    gamepad
}
```

- `button` is the representation of the button being pressed.
  - `pressed`: true
  - `value` if the button is analogic, this will hold its value
  - `index` represents the unique id of the button on this gamepad
  - `key`. Mage will map the button to a key. If a mapping can't be found, Mage will use the [default mapping](#mapping)
- `gamepad` follows the definition described [here](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad).

### `gamepadButtonReleased`

Whenever you release a button on your gamepad, the following event will be dispatched:

```json
{
    type: gamepadButtonReleased,
    button: { pressed, value, index, key },
    gamepad
}
```

- `button` is the representation of the button being pressed.
  - `pressed`: false
  - `value` if the button is analogic, this will hold its value
  - `index` represents the unique id of the button on this gamepad
  - `key`. Mage will map the button to a key. If a mapping can't be found, Mage will use the [default mapping](#mapping)
- `gamepad` follows the definition described [here](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad).

---

##  Methods

The Gamepad module exposes the following method:

#### getConnectedGamepads()

This method will return an object representing all connected gamepads. This object will be updated at each frame.
```javascript
{
    '0': gamepad,
    '1': gamepad,
    ...
}
```

For each entry, `gamepad` follows the definition described [here](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad).

---

## Disabling

If you wish to disable the Gamepad input, you can do so by:

```js
Input.disableGamepad();
```

from this point on, your application will stop receiving events.

---

## Mapping

When handling button events, Mage will try to map each button index to a known mapping. Mage will loosely follow this diagram, that can be found here: [https://w3c.github.io/gamepad/#dfn-standard-gamepad-layout](https://w3c.github.io/gamepad/#dfn-standard-gamepad-layout).

### standard mapping

```json
{
     STANDARD: [
        'X',
        'B',
        'A',
        'Y',
        'L1',
        'R1',
        null,
        null,
        'SELECT',
        'START'
    ]
}
```
