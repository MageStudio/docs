import { Router, store, Level, Cube, AmbientLight, Scene, Box, Scripts, constants, SunLight, PALETTES, Sky, Models } from 'mage-engine';

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

    createWheel(wheelNo) {
        return Models.get('wheel', { name: `wheel_${wheelNo}` });
    }
    
    createCar() {
        const car = Models.get('car', { name: 'mycar' });
        car.setPosition({ y: 14 });
    
        const wheels = [
            this.createWheel(1),
            this.createWheel(2),
            this.createWheel(3),
            this.createWheel(4),
        ];
    
        car.addScript(Scripts.BUILTIN.BASECAR, {
            wheels,
            mass: 100,
            wheelsOptions: {
                back: {
                    axisPosition: -1.25,
                    radius: .35,
                    halfTrack: 1,
                    axisHeight: 0
                },
                front: {
                    axisPosition: 1.2,
                    radius: .35,
                    halfTrack: 1,
                    axisHeight: 0
                }
            },
            suspensions: {
                stiffness: 20.0,
                damping: 2.3,
                compression: 4.4,
                restLength: 0.6
            }
        });

        car.setMaterialFromName(constants.MATERIALS.STANDARD);

        return car;
    }

    generateCubes() {
        const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

        for (let i=0; i<50; i++) {
            const cube = new Cube(1);
            cube.setName(`${i}`);
            cube.setTextureMap('purple');
            cube.setPosition({
                x: randomIntFromInterval(-10, 10),
                y: Math.random() * 5 + 10,
                z: randomIntFromInterval(-10, 10)
            });
            cube.setRotation({
                x: Math.random(),
                y: Math.random(),
                z: Math.random()
            });

            cube.setMaterialFromName(constants.MATERIALS.STANDARD);

            cube.enablePhysics({ mass: .1 });
        }
    }

    onCreate() {
        const sky = new Sky();
        sky.setSun(.1, .1, 100)

        this.createFloor();
        this.addAmbientLight();
        this.generateCubes();
        const target = this.createCar();

        // const camera = Scene.getCamera();
        // camera.setPosition({ x: -10, y: 15, z: -10 });
        // camera.lookAt({ x: 0, y: 0, z: 0 });

        Scene.getCamera().addScript(Scripts.BUILTIN.SMOOTH_CAR_FOLLOW, { target });
    }
}

const assets = {
    textures: {
        crate: 'assets/textures/wood_crate.jpg',
        orange: 'assets/textures/orange.png',
        purple: 'assets/textures/purple.png'
    },
    models: {
        car: 'assets/models/buggy.gltf',
        wheel: 'assets/models/wheel.gltf'
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
