import {
    Router,
    store,
    Level,
    Cube,
    AmbientLight,
    Scene,
    Scripts
} from 'mage-engine';

import Rotation from './rotation';

export default class Example extends Level {

    onCreate() {
        const size = 10;
        const cube = new Cube(size);

        cube.setPosition({ x: 0, y: 0, z: 0 });
        cube.setTextureMap('crate');

        const camera = Scene.getCamera();
        camera.setPosition({ z: 15, y: 7 });
        camera.lookAt(cube.getPosition());

        Scripts.create('rotation', Rotation);

        cube.addScript('rotation');
    }
}

const assets = {
    textures: {
        crate: '/cube-texture/assets/textures/wood_crate.jpg'
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
