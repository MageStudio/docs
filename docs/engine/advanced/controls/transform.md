# Transform Controls

Transform Controls provide visual gizmos for translating, rotating, and scaling objects, commonly used in editor tools and level design.

## Import

```javascript
import { Controls, CONTROL_EVENTS } from 'mage-engine';
```

## Setup

```javascript
const transform = Controls.setTransformControls();
```

## Properties

```javascript
transform.mode = 'translate';      // 'translate' | 'rotate' | 'scale'
transform.space = 'world';         // 'world' | 'local'
transform.size = 1;                // Gizmo size
transform.showX = true;            // Show X axis
transform.showY = true;            // Show Y axis
transform.showZ = true;            // Show Z axis
transform.translationSnap = null;  // Snap increment for translation
transform.rotationSnap = null;     // Snap increment for rotation (radians)
transform.scaleSnap = null;        // Snap increment for scale
```

## Methods

```javascript
transform.attach(object)           // Attach to THREE.js object
transform.detach()                 // Detach from object
transform.setMode(mode)            // Set transform mode
transform.setSpace(space)          // Set coordinate space
transform.setSize(size)            // Set gizmo size
```

## Events

```javascript
import { CONTROL_EVENTS } from 'mage-engine';

// Listen for transform changes
Controls.addEventListener(CONTROL_EVENTS.TRANSFORM.CHANGE, (event) => {
    console.log('Object transformed:', event.element);
});

// Listen for drag state
Controls.addEventListener(CONTROL_EVENTS.TRANSFORM.DRAGGING_CHANGE, (event) => {
    console.log('Dragging:', event.dragging);
});
```

## Basic Example

```javascript
import { Level, Controls, Cube, CONTROL_EVENTS } from 'mage-engine';

class EditorLevel extends Level {
    onCreate() {
        // Create object to transform
        this.cube = new Cube(10, 0x00ff00);
        
        // Setup transform controls
        this.transform = Controls.setTransformControls();
        
        // Attach to object's THREE.js body
        this.transform.attach(this.cube.getBody());
        
        // Listen for changes
        Controls.addEventListener(CONTROL_EVENTS.TRANSFORM.CHANGE, () => {
            console.log('Position:', this.cube.getPosition());
        });
    }
}
```

## Mode Switching

```javascript
import { Input } from 'mage-engine';

class EditorLevel extends Level {
    onCreate() {
        this.transform = Controls.setTransformControls();
        
        // Switch modes with keyboard
        Input.keyboard.on('t', () => {
            this.transform.mode = 'translate';
        });
        
        Input.keyboard.on('r', () => {
            this.transform.mode = 'rotate';
        });
        
        Input.keyboard.on('s', () => {
            this.transform.mode = 'scale';
        });
        
        // Toggle local/world space
        Input.keyboard.on('q', () => {
            this.transform.space = 
                this.transform.space === 'world' ? 'local' : 'world';
        });
    }
}
```

## Snapping

```javascript
class SnapEditorLevel extends Level {
    onCreate() {
        const transform = Controls.setTransformControls();
        
        // Enable grid snapping
        transform.translationSnap = 1;           // Snap to 1 unit grid
        transform.rotationSnap = Math.PI / 12;   // Snap to 15 degrees
        transform.scaleSnap = 0.25;              // Snap to 0.25 increments
        
        // Toggle snapping with shift
        Input.keyboard.on('shift', () => {
            transform.translationSnap = null;    // Disable snap
        });
        
        Input.keyboard.on('shift', () => {
            transform.translationSnap = 1;       // Enable snap
        }, 'up');
    }
}
```

## Selection System

```javascript
class SelectableEditor extends Level {
    onCreate() {
        this.objects = [];
        this.selected = null;
        this.transform = Controls.setTransformControls();
        
        // Create some objects
        for (let i = 0; i < 5; i++) {
            const cube = new Cube(5, Math.random() * 0xffffff);
            cube.setPosition({ x: i * 10, y: 0, z: 0 });
            this.objects.push(cube);
        }
        
        // Click to select
        Input.mouse.onClick((event) => {
            const hit = Input.mouse.raycast(this.objects);
            
            if (hit) {
                this.selectObject(hit.element);
            } else {
                this.deselectObject();
            }
        });
    }
    
    selectObject(object) {
        this.selected = object;
        this.transform.attach(object.getBody());
    }
    
    deselectObject() {
        this.selected = null;
        this.transform.detach();
    }
}
```

## Combined with Orbit Controls

```javascript
class EditorLevel extends Level {
    onCreate() {
        // Setup orbit controls for camera
        this.orbit = Controls.setOrbitControls();
        
        // Setup transform controls for objects
        this.transform = Controls.setTransformControls();
        
        // Disable orbit while dragging transform
        Controls.addEventListener(CONTROL_EVENTS.TRANSFORM.DRAGGING_CHANGE, (e) => {
            this.orbit.enabled = !e.dragging;
        });
    }
}
```

## See Also

- [Orbit Controls](/engine/advanced/controls/orbit.md)
- [Mouse Input](/engine/advanced/input/mouse.md)
- [Keyboard Input](/engine/advanced/input/keyboard.md)