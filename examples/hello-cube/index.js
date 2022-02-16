import {
    Router,
    store,
    Level,
    Cube,
    AmbientLight,
    Scene
} from '../../node_modules/mage-engine/dist/mage.js';

export default class Example extends Level {

    addAmbientLight() {
        this.ambientLight = new AmbientLight({ color: 0xffffff });
    }
    onCreate() {
        const size = 10;
        const color = 0x00ff00;
        const cube = new Cube(size, color);

        cube.setWireframe(true);
        cube.setPosition({ x: 0, y: 0, z: 0 });

        const camera = Scene.getCamera();
        camera.setPosition({ z: 15, y: 7 });
        camera.lookAt(cube.getPosition());
    }
}

const assets = {
    textures: {
        crate: 'assets/textures/wood_crate.jpg'
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
        shadows: false,
    },

    physics: {
        enabled: false,
        path: 'dist/ammo.js',
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
