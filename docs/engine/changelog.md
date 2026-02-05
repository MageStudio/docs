# Changelog

## patch: `v3.23.40` **Latest**

Camera improvements:
- Camera now supports `setPosition()` method with position syncing
- Added `getPosition()` returning a plain `{x, y, z}` object
- Added `update(dt)` method to Camera class

Asset path resolution improvements:
- Root-relative paths (starting with `/`) are now preserved as-is across Audio, Images, and Models loaders
- These paths are served from the public folder and no longer have `MAGE_ASSETS_BASE_URL` prepended incorrectly

## patch: `v3.23.39`

Asset path resolution improvements:
- Root-relative paths (starting with `/`) are now preserved as-is across Audio, Images, and Models loaders
- These paths are served from the public folder and no longer have `MAGE_ASSETS_BASE_URL` prepended incorrectly

## patch: `v3.23.38`

Input validation improvements:
- Added better input validation for number types
- Improved validation across input handlers

## patch: `v3.23.37`

Importer fixes:
- Models are now correctly imported into the scene

## patch: `v3.23.36`

Build and importer fixes:
- Fixed babel version target for better browser compatibility
- Fixed importer texture loading issues

## patch: `v3.23.35`

Material import improvements:
- Now setting all material properties correctly on import

## patch: `v3.23.34`

Importer path fix:
- Fixed importer not using the correct asset path

## patch: `v3.23.33`

Texture runtime fix:
- Added missing `needsUpdate=true` after setting textures at runtime

## patch: `v3.23.32`

Asset URL handling:
- Better handling of asset URLs throughout the engine

## patch: `v3.23.30`

Loader updates:
- Updated FBXLoader to latest version

## patch: `v3.23.29`

URL resolution:
- Using correct URLs for asset loading

## patch: `v3.23.28`

Image path fixes:
- Fixed images not using resolved paths (part 2)

## patch: `v3.23.27`

Image path fixes:
- Fixed images not using resolved paths

## patch: `v3.23.26`

Missing asset handling:
- Better handling of missing assets with improved error messages

## patch: `v3.23.25`

Asset importing improvements:
- Better importing of modules using `MAGE_ASSETS_BASE_URL` environment variable for relative path resolution

---

## patch: `v3.20.1`

Better tweening:
- exposing `tweenTo` function from `easing` module.
- Supporting `repeat` option for between.js

### minor: `v3.20.0`

Fixed a series of issues:
- Keyboard input was compromised and no longer working.
- Lights body was not properly set.
- Added easing functions and looping to the constants.
- Fixed camera not setting its body properly.

### minor: `v3.19.0`

Added Labels to the engine. The following has been added:
- `LabelComponent`: When creating a Label, make your Inferno component extend the `LabelComponent` class, as it has the required instructions for the engine.
- `Label` element: uses an Inferno component to render HTML as 3D content in your application.
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
