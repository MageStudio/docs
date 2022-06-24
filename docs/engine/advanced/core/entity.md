# Entity

Entity is the base class for most components in Mage engine.

?> The Entity class extends the EventDispatcher class from three.js. Please refer to the documentation down below.

---

## Methods

#### constructor({ serializable = true, tag = '', tags = [] })

The entity constructor is responsible for setting base properties for the component.

- `serializable` will determine whether this entity can be converted to JSON.
- `tag` / `tags`: each Entity can be tagged. You can use `tags` to filter out certain entities.

?> By default, each new Entity will come to life with the `all` tag.

#### isSerializable(): boolean

This will return `true` or `false` depending on if the entity is serializable or not.

---

## Body

?> 

#### hasBody(): boolean

This method will check if the entity has a body assigned to it.

#### getBody()

This will return the entity body.

?> The body of an entity can either be a: `THREE.Object3D`, `THREE.AmbientLight`, `THREE.HemisphereLight`, `THREE.PointLight`, `THREE.Spotlight` or a `THREE.DIrectionalLight`.

#### getBodyByName(name: string) 

This method will traverse the body of this entity looking for an element with the desired name.
#### setBody(body)

This will set the body of this entity.

#### hasParent(): boolean

Return `true` or `false` if this entity has a parent.

#### getParent(): boolean

Returns this entity's parent if present, or `false` otherwise.
#### add(child: Entity)

This method will add an entity (or more, see below) as children of this entity.

- `child: Entity`: The child to be added to this entity can either be a single Entity or an array of Entities.

!> `child` has to be an instance of Entity, otherwise it will not be added and an error will printed to the console.

#### isParentOf(child: Entity): boolean

This will check if this entity is parent of the child argument.

?> This method will be able to either look for a Mage Entity or for a `THREE.Object3D`.

#### has(child): boolean

This will check if this Entity has the child argument within its hierarchy.

#### remove(child)

This method will remove the requested child from this Entity hierarchy.

#### addTo(target: Entity, childname: string): undefined

This will try to add this Entity to the target Entity.

?> If a `childname` is provided, this Entity body will be added to the Target's Child's body.

#### isSerializable(): boolean

#### isSerializable(): boolean

#### isSerializable(): boolean