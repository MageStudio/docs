# Changelog

## minor: `v3.19.0` **Latest**

Added Labels to the engine. The following has been added:
- `LabelComponent`: When creating a Label, make your Inferno component extend the `LabelComponent` class, as it has the required instructions for the engine.
- `html-to-image`: This library is being used to export Inferno components to images.

### patch: `v3.17.10`

Added missing `.None` to easing function used by Entities.

### patch: `v3.17.9`

Fixed typo.

### patch: `v3.17.8`

Fixed a bug occuring when switching levels with Physics settings enabled.

### patch: `v3.17.7`

Improved disposal of Entities.

### patch: `v3.17.6`

A few improvements:
- `Models.getModel` has been renamed to `Models.get` : a deprecation warning message will be displayed when using `getModel`
- Entities now have a `addTo` method, which allows Entities to be added to other entities. (Similar to `.add`, but with `addTo` the Entity is the child).


### patch: `v3.17.5`

Performance improvements.

### patch: `v3.17.4`

fixed SelectiveOutline

### patch: `v3.17.3`

Retrieving hierarchy, updated lights names

### patch: `v3.17.2`

Supporting Other texture maps.

### minor: `v3.17.0`

Particle Systems are now extending Entity.
### patch: `v3.16.7`

New Math function, new Pass.
### patch: `v3.16.3`

Fixed error in Physics, exporting builtin Scripts.
### minor: `v3.16.0`

Fixed many things, new Scripts, improved Element class.

### patch: `v3.15.2`

Added Palettes.
### patch: `v3.15.1`

Allowing uI to be enabled/disabled in config.
### patch: `v3.14.2`

Allowing transparent scene.
### patch: `v3.14.1`

Physics is dispatching explosions.
### minor: `v3.14.0`

Improved Physics events:

```javascript
export const PHYSICS_EVENTS = {
    DISPATCH: 'physics:dispatch',
    TERMINATE: 'physics:terminate',
    LOAD: {
        AMMO: 'physics:load:ammo',
    },
    READY: 'physics:ready',
    INIT: 'physics:init',
    UPDATE: 'physics:update',
    
    ADD: {
        BOX: 'physics:add:box',
        VEHICLE: 'physics:add:vehicle',
        MODEL: 'physics:add:model',
        PLAYER: 'physics:add:player',
        SPHERE: 'physics:add:sphere',
    },

    ELEMENT: {
        DISPOSE: 'physics:element:dispose',
        COLLISION: 'physics:element:collision',
        UPDATE: 'physics:element:update',

        SET: {
            POSITION: 'physics:element:set:position',
            QUATERNION: 'physics:element:set:quaternion',
            LINEAR_VELOCITY: 'physics:element:set:linear_velocity'
        },

        APPLY: {
            IMPULSE: 'physics:element:apply:impulse'
        }
    },

    VEHICLE: {
        SET: {
            POSITION: 'physics:vehicle:set:position',
            QUATERNION: 'physics:vehicle:set:quaternion'
        },
        RESET: 'physics:vehicle:reset',
        
        SPEED: 'physics:vehicle:speed',
        DIRECTION: 'physics:vehicle:direction'
    }
};
```
### patch: `v3.13.3`

Introduced new physics events:

`RESET_CAR_EVENT`
`SET_CAR_QUATERNION_EVENT`

These two events are currently not used by the `Physics` module.

### patch: `v3.0.4`

Fixed an issue where the keyboard was not supporting numbers.

### patch: `v3.0.3`

Sprites can now rotate using `setRotation(angle)`.

### patch: `v3.0.2`

Fixed a bug in the Mouse module, that wasn't dispatching the right events.

### patch: `v3.0.1`

Fixed a bug where sprites didn't receive mouse input.

### MAJOR: `v3.0.0` 🥳

Renamed Scene to Level, renamed BaseMesh to Element and BaseEntity to Entity.
