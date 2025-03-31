export class Tracker {
    global;
    following;
    reference = false;
    constructor(global) {
        this.global = global;
    }
    toggleReference(astroObjects) {
        astroObjects.forEach((astroObject) => {
            astroObject.trail = [];
        });
        this.reference = !this.reference;
    }
    followingX = () => {
        return this.reference && this.following
            ? -this.following.kinematics.position.x
            : 0;
    };
    followingY = () => {
        return this.reference && this.following
            ? -this.following.kinematics.position.y
            : 0;
    };
    follow(astroObject, camera = this.global.camera) {
        this.following = astroObject;
        camera.position.x = -astroObject.kinematics.position.x;
        camera.position.y = -astroObject.kinematics.position.y;
        if (this.reference) {
            camera.position.x = 0;
            camera.position.y = 0;
        }
    }
}
