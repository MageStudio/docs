# Entity

Entity is the base class for most components in Mage engine.

::: tip
The Entity class extends the EventDispatcher class from three.js. Please refer to the documentation down below.
:::



---

## Methods

#### constructor({ serializable = true, tag = '', tags = [] })

The entity constructor is responsible for setting base properties for the component.

- `serializable` will determine whether this entity can be converted to JSON.
- `tag` / `tags`: each Entity can be tagged. You can use `tags` to filter out certain entities.

::: tip
By default, each new Entity will come to life with the `all` tag.
:::



---

### Transforms

The methods described below provide access to the entity transforms. These will allow to change position/rotation/scale of the Entity, as well as performing simple transitions (e.g. `goTo` or `rotateTo` and `scaleTo`);
#### getPosition(): THREE.Vector3

This method will return the current position of the entity.

::: tip
If this entity has been added to another one, this method will return the relative position. If you need the global position,  when this entity has been added as a child please refer to the `getWorldTransform` method.
:::



#### setPosition({ x?: Float, y?: Float, z?: Float })

This will set the position for the entity. Each axis is optional, which means you can use thie method like so:

```javascript
entity.setPosition({ y: 2 });
```

The method will internally merge the new position with the current one.

::: tip
If this entity is a child, calling `setPosition` will set its position relative to the parent.
:::



#### getRotation(): THREE.Vector3

This will return the current rotation for the entity.

::: tip
Similarly to `getPosition`, this method will return the world rotation when the entity is not a child, and the relative rotation otherwise.
:::



#### setRotation({ x?: Float, y?: Float, z?: Float })

This will set the rotation for the entity. Each axis is optional, which means you can use thie method like so:

```javascript
entity.setPosition({ y: 2 });
```

The method will internally merge the new position with the current one.

#### getQuaternion(): THREE.Quaternion

This method will return the body's quaternion.

::: tip
Similarly to `getPosition`, this method will return the world quaternion when the entity is not a child, and the relative quaternion otherwise.
:::



#### setQuaternion({ x?: Float, y?: Float, z?: Float, w?: Float })

This will set the quaternion for the entity. Each axis is optional, which means you can use thie method like so:

```javascript
entity.setQuaternion({ y: 2 });
```

The method will internally merge the new quaternion with the current one.

#### getScale(): THREE.Vector3

This method will return the current scale of the entity.

#### setScale({ x?: Float, y?: Float, z?: Float })

This will set the scale for the entity. Each axis is optional, which means you can use thie method like so:

```javascript
entity.setScale({ y: 2 });
```

The method will internally merge the new scale with the current one.

#### getWorldTransform(): Object

This will return the world transform for this Entity in the shape of an Object containing the following:

```
{
    position: THREE.Vector3,
    rotation: THREE.Vector3,
    quaternion: THREE.Quaternion
}
```

#### translate({ x: Float, y: Float, z: Float })

This method will translate the entity on each provided axis. If one or more are missing, they will be defaulted to `0`.

---

### Tweening

Mage engine is using a tweening library ([Between.js](https://between.js.org/)) to perform transformations and movement on Entities.

::: tip
For each function, `easing` is by default defined as `Between.Easing.Linear.None`, but feel free to use whatever function you want, as defined [here](https://www.npmjs.com/package/easing-functions): `https://www.npmjs.com/package/easing-functions` . Remember that Between renaming these functions to look like this: `Between.Easing.EASINGFUNCTION`.
:::



Each method described below will return `Promise` that is resolved once the tweening has completed.

#### scaleTo(scale: Object, time: Ingeter, easing: Between.Easing): Promise

This animate the scale of this Entity. The options are as follow:

- `scale`: the target scale. 

::: tip
This parameter will behave similarly to the parameter for `.setScale()`, which means that if one of the axis is missing, their value will be defaulted to the current scale.
:::



- `time`: time in milliseconds to perform the tweening.
- `easing`: this defines the easing function that will be used by the library.



#### rotateTo(rotation: Object, time: Ingeter, easing: Between.Easing): Promise

- `rotation`: the target rotation. 

::: tip
This parameter will behave similarly to the parameter for `.setRotation()`, which means that if one of the axis is missing, their value will be defaulted to the current rotation.
:::



- `time`: time in milliseconds to perform the tweening.
- `easing`: this defines the easing function that will be used by the library.

#### goTo(destination: Object, time: Ingeter, easing: Between.Easing): Promise

- `destination`: the target destination. 

::: tip
This parameter will behave similarly to the parameter for `.setPosition()`, which means that if one of the axis is missing, their value will be defaulted to the current position.
:::



- `time`: time in milliseconds to perform the tweening.
- `easing`: this defines the easing function that will be used by the library.

---

### Lifecycle and Events

An entity's lifecycle is pretty straightforward: once created, it will be added to the current scene, where it will stay until it gets disposed. During its life, certain events might be triggered. You can attach listeners to the entity and handle these events. To dispose an entity, please refer to the method below:

#### dispose()

This will dispose the entity. Once called, the following steps will occur:

- If this entity has children, each children will be disposed in order.

If it has a body:
- If it has a state machine, it will be disposed here.

::: tip
For more information on state machines, please refer to [this](/engine/advanced/state_machines.md) page.
:::



- Each attached script will be disposed.

::: tip
For more information scripts lifecycle, please refer to [this](/engine/advanced/scripting/scripts.md) page.
:::



- The scene will remove the body of this entity.
- The body itself will be disposed.
- The `DISPOSE` event will be triggered.


#### Lifecycle Events

The following events will be dispatched:

```javascript
const ENTITY_EVENTS = {
    DISPOSE: 'DISPOSE',
    STATE_MACHINE: {
        CHANGE: 'STATE_MACHINE_CHANGE',
    },
    ANIMATION: {
        LOOP: 'LOOP',
        FINISHED: 'FINISHED',
    }
}
```

You can attach a listener by doing so:

```javascript
import { ENTITY_EVENTS } from 'mage-engine';

// inside your level
myEntity.addEventListener(ENTITY_EVENTS.DISPOSE, performCleanup);
```

---

### Body

> The body of an entity can either be a: `THREE.Object3D`, `THREE.Sprite`, `THREE.PerspectiveCamera`, `THREE.AmbientLight`, `THREE.HemisphereLight`, `THREE.PointLight`, `THREE.Spotlight` or a `THREE.DIrectionalLight`.

#### hasBody(): boolean

This method will check if the entity has a body assigned to it.

#### getBody()

This will return the entity body.

#### getBodyByName(name: string) 

This method will traverse the body of this entity looking for an element with the desired name.
#### setBody({ body })

This will set the body of this entity.

> The Entity body has to be one of the following: `THREE.Object3D`, `THREE.Sprite`, `THREE.PerspectiveCamera`, `THREE.AmbientLight`, `THREE.HemisphereLight`, `THREE.PointLight`, `THREE.Spotlight` or a `THREE.DIrectionalLight`.

---

### Properties

#### setName(name: String)

This will set the name of this Entity.

::: warning
Be careful, Mage engine uses the name to store information about the identity. This means the name has to be unique in your application!
:::

#### getName(): String

This will return this Entity's name.

#### setVisible(flag: boolean)

This will set the visibility of this Entity.

---

### Family

Entities have the ability to add other Entities as children.

#### hasParent(): boolean

Return `true` or `false` if this entity has a parent.

#### getParent(): boolean

Returns this entity's parent if present, or `false` otherwise.
#### add(child: Entity)

This method will add an entity (or more, see below) as children of this entity.

- `child: Entity`: The child to be added to this entity can either be a single Entity or an array of Entities.

::: warning
`child` has to be an instance of Entity, otherwise it will not be added and an error will printed to the console.
:::

#### isParentOf(child: Entity): boolean

This will check if this entity is parent of the child argument.

::: tip
This method will be able to either look for a Mage Entity or for a `THREE.Object3D`.
:::



#### has(child): boolean

This will check if this Entity has the child argument within its hierarchy.

#### remove(child)

This method will remove the requested child from this Entity hierarchy.

#### addTo(target: Entity, childname: string): undefined

This will try to add this Entity to the target Entity.

::: tip
If a `childname` is provided, this Entity body will be added to the Target's Child's body.
:::



#### hasChildren(): boolean

Returns whether the Entity has children or not.

#### getHierarchy(): Object

This method will return an object representing the hierarchy of the Entity. The returned object will look like this:
```
{
    element: Entity, // the Entity itself
    children: Array\<Entity\>
}
```

---

### Tags

Each entity can be tagged. This can simplify filtering and extraction of Entities.

::: tip
By default, entities are tagged with  `all`.
:::



#### addTag(tag: String): boolean

This method will append the requested tag to the list of tags. Will return `true` if the tag has been added, `false` otherwise.

::: warning
If the desired tag already belongs to the Entity, an error will be logged on the console and the method will return `false`.
:::

#### addTags(tags: Array\<String\>)

This method will receive a list of tags and will try to append each one to the list of tags for this entity.

#### removeTag(tag: String): boolean

This will try to remove the required tag from the list of tags.

::: warning
If the tag is missing or if you're trying to remove the default tag, an error message will be printed and this method will return `false`.
:::

#### removeAllTags()

This will remove all tags from the Entity except the default tag `all`.

#### hasTag(tag: String): boolean

This method will return `true` or `false` depending if the required tag belongs to the list of tags for this Entity.

#### getTags()

This will return all the tags currently assigned to this Entity.

---

### Scripts

Scripts define the behaviour of Entities. You can add as many scripts as you want to each entity.

::: tip
Scripts will be executed in order. This means the first one to be added will also be the first one to be update in each frame.
:::



::: tip
For more information on how scripts work, please refer to the dedicated page [here](/engine/advanced/scripting/scripts.md).
:::



#### getScript(name: String): BaseScript | boolean

This method will look for a script attached to the Entity. If found, it will return it. Otherwise, it will return `false`.

#### hasScripts(): boolean

Will return `true` or `false` depending if the Entity has any Script attached.

#### addScript(script: String, options: Object)

This add the required script to this Entity. The options object will be received in the `start` method of the script.

::: warning
The Script has to be registered with the `Scripts` module first before being used. Please refer to [this page](/engine/advanced/scripting/scripts.md) for more information.
:::

#### enableScripts()

This will enable scripts for this Entity.

#### disableScripts()

Yes, you guessed it right. This will disable scripts for this Entity.

---

### Miscellaneous

These are a combination of utilities and setters/getters that can help you handling your entity.

#### isSerializable(): boolean

This will return `true` or `false` depending on if the entity is serializable or not.

#### setEntityType(type: String)

Each Entity has a type. The following types are allowed:

```javascript
const ENTITY_TYPES = {
    SCENE: 'SCENE',
    CAMERA: 'CAMERA',
    MESH: 'MESH',
    LABEL: 'LABEL',
    LIGHT: {
        DEFAULT: 'LIGHT.DEFAULT',
        AMBIENT: 'LIGHT.AMBIENT',
        SUN: 'LIGHT.SUN',
        HEMISPHERE: 'LIGHT.HEMISPHERE',
        POINT: 'LIGHT.POINT',
        SPOT: 'LIGHT.SPOT'
    },
    AUDIO: {
        DEFAULT: 'AUDIO.DEFAULT',
        AMBIENT: 'AUDIO.AMBIENT',
        DIRECTIONAL: 'AUDIO.DIRECTIONAL',
        BACKGROUND: 'AUDIO.BACKGROUND'
    },
    MODEL: 'MODEL',
    SPRITE: 'SPRITE',
    PARTICLE: 'PARTICLE',
    EFFECT: {
        PARTICLE: 'EFFECT.PARTICLE',
        SCENERY: 'EFFECT.SCENERY'
    },
    HELPER: {
        GRID: 'HELPER.GRID',
        AXES: 'HELPER.AXES'
    },
    UNKNOWN: 'UNKNOWN'
};
```

#### getEntityType(): String

This will return the type of this Entity.

#### equals(entity: Entity): boolean

This will compare this Entity with another one and return `true` or `false` for their equality.

#### setData(key: String, data: any)

Entities can store data that can be retrieved at later date. This method allows you to store information in the body's `userData` field.

#### getData(key: String): any

This will allow the user to retrieve previously saved data from the body's `userData` field.

#### toJSON(): Object

This will return a JSON version of this entity, depending if it's serializable or not.