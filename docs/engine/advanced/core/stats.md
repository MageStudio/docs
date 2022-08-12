# Stats

The Stats module is responsible for collecting information on the performance of your application. Right now, it's capable of getting details about your FPS and your memory usage.

---

## Properties

The properties described below are rxjs Subjects. This means you can subscribe to them and be notified once their value changes.

?> `rxjs` is an incredibly powerful library, check it out [here](https://rxjs.dev/).

#### fps: rxjs.Subject

You can subscribe to the `fps` subject by doing this:

```javascript
import { Stats } from 'mage-engine';

// inside your level or script
const handler = (currentFPS) => {
    console.log("FPS:", currentFPS);
};

Stats.fps.subscribe(handler);
```

Your `handler` function will then receive a new value everytie fps change.

!> Remember to unsubscribe once you no loger need to be updated by doing this: `Stats.fps.unsubscribe(handler)`.

#### memory: rxjs.Subject

`Stats.memory` will give you the current used heap size. You can subscribe to the `memory` subject by doing this:

?> Internally `Stats.memory` is relying on the `performance` module available on the `window` object.

```javascript
import { Stats } from 'mage-engine';

// inside your level or script
const handler = (currentMemoryUsage) => {
    console.log("current memory usage:", currentMemoryUsage);
};

Stats.memory.subscribe(handler);
```

Your `handler` function will then receive a new value everytie the memory usage change.

?> The value received by `handler` will be in Mbs.

!> Remember to unsubscribe once you no loger need to be updated by doing this: `Stats.fps.unsubscribe(handler)`.




