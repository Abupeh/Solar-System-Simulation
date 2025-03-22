export class Tracker {
    global;
    track = [0, 0];
    previousTrack = [0, 0];
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
    trackFollow() {
        this.previousTrack[0] = this.track[0];
        this.previousTrack[1] = this.track[1];
    }
    follow(astroObject, camera = this.global.camera) {
        this.following = astroObject;
        this.track[0] = astroObject.kinematics.position.x;
        this.track[1] = astroObject.kinematics.position.y;
        camera.position.x = -this.previousTrack[0];
        camera.position.y = -this.previousTrack[1];
        if (this.reference) {
            camera.position.x = 0;
            camera.position.y = 0;
        }
    }
}
