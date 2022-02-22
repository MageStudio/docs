import { BaseScript } from 'mage-engine';

export default class Rotation extends BaseScript {

    constructor() {
        super('rotation');
    }

    start(mesh) {
        this.mesh = mesh;
        this.angle = 0;
    }

    update(dt) {
        this.angle += 0.1 * dt;

        this.mesh.setRotation({
            y: this.angle
        });
    }
}