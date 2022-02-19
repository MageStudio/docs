import { Box } from 'mage-engine';
import {
    Router,
    store,
    Level,
    Cube,
    AmbientLight,
    Scene,
    Scripts,
    constants,
    HemisphereLight,
    SunLight,
    PALETTES,
    Sky
} from 'mage-engine';

import Rotation from './rotation';

export default class Example extends Level {

    addAmbientLight() {
        const ambientLight = new AmbientLight({ color: 0xffffff, intensity: .5 });
        const sunLight = new SunLight({
            color: PALETTES.FRENCH_PALETTE.FLAT_FLESH,
            intensity: 1,
            far: 20,
            mapSize: 2048
        });
        sunLight.setPosition({ y: 4, z: -3, x: -3 });
    }

    createFloor() {
        const floor = new Box(200, 1, 200);
        floor.setTextureMap('orange', { repeat: { x: 10, y: 10 }});
        floor.setMaterialFromName(constants.MATERIALS.STANDARD);
        floor.enablePhysics({ mass: 0 })
    }

    onUpdate() {
        if (this.cube) {
            Scene.getCamera().lookAt(this.cube.getPosition());
        }
    }

    onCreate() {
        const size = 10;
        this.cube = new Cube(size);

        this.cube.setPosition({ x: 0, y: 50, z: 0 });
        this.cube.setRotation({ x: Math.random(), y: Math.random(), z: Math.random() })
        this.cube.setTextureMap('purple');
        this.cube.setMaterialFromName(constants.MATERIALS.STANDARD);

        const camera = Scene.getCamera();
        camera.setPosition({ z: 15, y: 15 });
        

        // Scripts.create('rotation', Rotation);
        // cube.addScript('rotation');
        const sky = new Sky();
        sky.setSun(.1, .1, 100)

        this.createFloor();
        this.addAmbientLight();

        this.cube.enablePhysics({ mass: .1, restitution: 2 })
    }
}

const assets = {
    textures: {
        crate: 'assets/textures/wood_crate.jpg',
        orange: 'assets/textures/orange.png',
        purple: 'assets/textures/purple.png'
    }
}

const config = {
    screen: {
        h: window ? window.innerHeight : 800,
        w: window ? window.innerWidth : 600,
        ratio: window ? window.innerWidth / window.innerHeight : 600 / 800,
        frameRate: 60,
        alpha: true,
    },

    lights: {
        shadows: true,
    },

    physics: {
        enabled: true,
        path: 'physics/assets/ammo.js',
        gravity: { x: 0, y: -9.8, z: 0}
    },

    tween: {
        enabled: false,
    },

    camera: {
        fov: 75,
        near: 0.1,
        far: 3000000,
    },
};

window.addEventListener('load', () => {
    store.createStore({}, {}, true);

    Router.on('/', Example);

    Router.start(config, assets);
});
