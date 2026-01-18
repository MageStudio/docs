# Keyboard

Handling keyboard is incredibly easy. Under the hood Mage uses the library called [Hotkeys-js](https://github.com/jaywcjlove/hotkeys/).

---

## Enabling Keyboard

Enabling Keyboard input is straightforward:

```js
import { Input } from 'mage-engine';

// somewhere inside your app
Input.enableKeyboard();
```

> The Keyboard module will be available as `Input.keyboard`.

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
    Input.enableKeyboard();
    Input.addEventListener('keydown', this.onKeydown.bind(this));
    Input.addEventListener('keyup', this.onKeyup.bind(this));
}

onKeydown(event) {
    // do something here
}

onKeyup(event) {
    // do something even better here
}
```

---

### `keyDown`

This event will be fired once the page receives a `keyDown` event. Your listener will receive the following event:

```json
{
    type: 'keyDown',
    event: {
        key,
        keyCode,
        keydown,
        keyup,
        ...
    }
}
```
- `key` is the String representation of the key that has caused the event. If you're listening to a combination of keys (e.g. "cmd" and "s"), then `key` will be `cmd+s`.
- `keyCode` is the numeric value of they key. If you're listening to a combination of keys, this will be the last key that caused the event.
- `keydown`: true.
- `keyup`: false.
---

### `keyUp`

This event will be fired once the page receives a `keyUp` event. Your listener will receive the following event:

```json
{
    type: 'keyUp',
    event: {
        key,
        keyCode,
        keydown,
        keyup,
        ...
    }
}
```

- `key` is the String representation of the key that has caused the event. If you're listening to a combination of keys (e.g. "cmd" and "s"), then `key` will be `cmd+s`.
- `keyCode` is the numeric value of they key. If you're listening to a combination of keys, this will be the last key that caused the event.
- `keydown`: false.
- `keyup`: true.

---

### `keyPress`

This event will be fired once the page receives a `keyPress` event. Your listener will receive the following event:

```json
{
    type: 'keyPress',
    event: {
        key,
        keyCode,
        keydown,
        keyup,
    }
}
```

- `key` is the String representation of the key that has caused the event. If you're listening to a combination of keys (e.g. "cmd" and "s"), then `key` will be `cmd+s`.
- `keyCode` is the numeric value of they key. If you're listening to a combination of keys, this will be the last key that caused the event.
- `keydown`: true|false.
- `keyup`: true|false.

---

## Methods

The Keyboard module exposes the following method:

#### isPressed(keyName: string): boolean

This method receives one parameter, `keyName`, and will check if its keyboard button is being pressed or not. It returns a boolean.

**Usage**:
```js
const isUserPressingW = Input.keyboard.isPressed('w');
console.log(isUserPressingW); // true
```

#### register(key: string, handler?: function)

This method allows you to listen to events for a specific `key`. If the `key` has already been registered, a message will be displayed in the console.
The `handler` parameter is optional. If provided, it will be used to handle the `key` you want to listen to. If the handler is missing, the event will follow the existing flow and will be handled by your `keyUp`, `keyDown`, `keyPress` listeners.

**Usage**:
```js
Input.keyboard.register('ctrl'); // now listening to ctrl
Input.keyboard.register('cmd'); // now listening to cmd
```

#### registerCombination(combo: string[], handler?: function)

This method allows you to listen to events for combinations of keys. If the combination has already been registered, a message will be displayed in the console.
The `handler` parameter is optional. If provided, it will be used to handle the combination you want to listen to. If the handler is missing, the event will follow the existing flow and will be handled by your `keyUp`, `keyDown`, `keyPress` listeners.

**Usage**:
```js
// we want to do something when the user is pressing cmd + s 

Input.keyboard.registerCombination(['cmd', 's']); // now listening to cmd + s;
```

---

## Disabling

If you wish to disable the Keyboard input, you can do so by:

```js
Input.disableKeyboard();
```

from this point on, your application will stop receiving events.
