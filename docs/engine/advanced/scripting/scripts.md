# Scripts

Mage engine allows you to define Elements' behaviours in the form of scripts: these are Javascript classes extending the `BaseScript` class from the engine. Once registered with the `Scripts`, they can be assigned to Elements, shared across multiple entities and extended for more complicated usage.

?> The `Getting Started` guide is already providing an insight of how Scripts work. Please have a look [here](/engine/getting-started/scripts.md).

---

### Creating a Script

A Script is just a regular Javascript class, which extends `BaseScript`. Below is a simple example:

```javascript
import { BaseScript } from 'mage-engine';

export default Rotation extends BaseScript {

    start(element, options) {
        const { initialAngle, speed } = options;
        
        this.element = element;
        this.angle = initialAngle;
        this.speed = speed;
    }

    update(dt) {
        this.angle += this.speed * dt;
        this.element.setRotation({ y: this.angle });
    }
}
```

- `start(element: Entity, options: Object)`: this method will be called as soon as you attach a script to your entity and its first argument will be the target entity. `options` is an object containing all the parameters required by the script. In this example, we're passing an `initialAngle` and a `speed`: both will be used in the `update` method.
- `update(dt)`: this function will be called for each frame of your scene, and it will receive the current `dt`. Here we update the angle by incrementing it by `this.speed`, and we call the `setRotation` method on the element.

?> Why multiplying the angle by `dt` ? `dt` represents the delta time since the last frame. In order to achieve frame-rate indipendence and smooth animations, we need to multiply the angle by `dt`.

---

### Registering a Script

In order to use a Script, you first need to `register` it with the `Scripts` module.

```js
import { Scripts } from 'mage-engine';
import Rotation from './rotation.js`;

// inside your level
onCreate() {
    Scripts.register('rotation', Rotation);
}
```

This step will make the Script available everywhere across your application.

---

### Using a script

Each Entity offers a very easy to use API when it comes to adding scripts.

```javascript

// in your level
myEntity.addScript('rotation', { angle: 0, speed: 0.02 });
```

?> Entities have an entire set of APIs you can use to add scripts, enable/disable them as well as extracting them or interacting with them. Please refer to [this page](/engine/advanced/core/entity.md) for more information.

Once added, the script will execute its `start` method, passing it the entity and the provided options. Scripts have different methods, which you can see described below:

---

### Lifecycle

Scripts have a fairly simple lifecycle.

#### start(element: Element, options: Object)

This is called as soon as the script is attached to the Element. As described above, it will receive the following parameters:

- `element`: the Element this script is being attached to.
- `options`: an object containing the options you provided when invoking the `.addScript` method on the Element.

#### update(dt: Float)

`update` is called every frame. It will receive the time elapsed since last frame in milliseconds.

!> Please note that if your Element has more than one script attached, each one will be called in order. This means that if you performed `element.addScript('first'); element.addScript('second');`, `first` script will be updated right before `second`.

#### physicsUpdate(dt: Float)

This method is called once the Physics module has completed its updating operations on the element. It will receive the time elapsed since last update in milliseconds.

?> When configuring the Physics module, you can define a fixed rate of updates for it. This will greatly modify the delta time received by this function. Please refer to [this page](/engine/advanced/configuration.md?id=physics) for more details.

#### onDispose()

This will be called when the element this script is attached to is being disposed. It will receive no parameters, but you can use this moment to perform necessary cleanup (e.g. removing listeners, cancelling intervals or timeouts).

---

### Builtin Scripts

Mage engine provides a number of builtin scripts. This should make your development experience easier and faster. Each builtin script name is defined in the `BUILTIN` constant, exposed by the `Scripts` module. You can use it like so:

```js
import { Scripts } from 'mage-engine';

// inside your level
element.addScript(Scripts.BUILTIN.BASECAR);
```

?> These scripts are alread registered, so you don't need to call `.register` beforehand.

#### BUILTIN.BASECAR

This script is better described in its own dedicated page [here](/engine/advanced/scripting/builtin/basecar.md).

#### BUILTIN.SMOOTH_CAR_FOLLOW

This script is better described in its own dedicated page [here](/engine/advanced/scripting/builtin/smoothcarfollow.md)