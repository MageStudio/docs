# Handling User input

In this section we're going to focus on how to handle user input via keyboard. Don't worry, there is a dedicated section for mouse input, that you can find [here](/engine/advanced/input/mouse.md).

---

## Scene handling Input

The Scene we created earlier is already prepared to listen to user events. Luckily for us, Scene is already prepared to handle user input. Some of its methods will be called when specific input events are being fired, according to the following map:

| Event         | Method        |
| ------------- |-------------  |
| `keyPress`    | onKeyPress    |
| `keyDown`     | onKeyDown     |
| `keyUp`       | onKeyUp       |
| `mouseDown`   | onMouseDown   |
| `mouseUp`     | onMouseUp     |
| `mouseMove`   | onMouseMove   |

This means that the only thing we have to do is to create a `onKeyDown` method, and read the event that it receives, like this:

```js
onKeyDown(e) {
    const { x, y, z } = this.cube.getPosition();
    switch(e.event.keyCode) {
        case 87: // W
            this.cube.setPosition({ z: z - 2 });
            break;
        case 83: // S
            this.cube.setPosition({ z: z + 2 });
            break;
        case 68: // D
            this.cube.setPosition({ x: x + 2 });
            break;
        case 65: // A
            this.cube.setPosition({ x: x - 2 });
            break;
        default:
            break;
    }
}
```

Try launching this and see what happens! You should be able to move the cube around by using `W`, `S`, `A`, `D`.

----

## Script handling input

You might want to handle input inside a script rather than the Scene. The main reason might be, a script can be shared across multiple objects, which means you can write general purpose handlers for keyboard input.

In order to do so, head to the `rotation.js` file we created earlier. We need to do two things: first, enable the Input module, then add an event listener for the `keyDown` event.

> You should delete the changes you introduced in the Scene.js file first.

### rotation.js

```js
    import { Input, BaseScript } from 'mage-engine';

    export default class Rotation extends BaseScript {

        constructor() {
            super('rotation');
        }

        start(mesh) {
            this.mesh = mesh;
            this.angle = 0;

            Input.enable();
            Input.addEventListener('keyDown', this.handleKeyDown.bind(this));
        }

        onKeyDown(e) {
            const { x, y, z } = this.mesh.getPosition();
            switch(e.event.keyCode) {
                case 87: // W
                    this.mesh.setPosition({ z: z - 2 });
                    break;
                case 83: // S
                    this.mesh.setPosition({ z: z + 2 });
                    break;
                case 68: // D
                    this.mesh.setPosition({ x: x + 2 });
                    break;
                case 65: // A
                    this.mesh.setPosition({ x: x - 3 });
                    break;
                default:
                    break;
            }
        }

        update(dt) {
            this.angle += 0.01;

            this.mesh.setRotation({
                y: this.angle
            });
        }
    }

```

What happens if you execute the app now? (Spoiler: the same thing as before.)

---

## Still boring

Ok, fine. You're right, this is still pretty boring. Let's spicy it up a bit, and apply some textures to this boring box. [Applying textures](/engine/getting-started/applying-textures.md).
