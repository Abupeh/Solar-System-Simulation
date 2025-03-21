import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
export class Updater {
    solarSystem;
    pause = false;
    time = Config.ITERATIONS;
    previousBody = [0, 0];
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.setupEventListeners();
    }
    firstFollowing = [0, 0];
    followingBody = null;
    update(bodies, ignorePause = false, reversalBody) {
        if (this.pause && !ignorePause)
            return;
        this.previousBody[0] = this.followingBody?.position.x;
        this.previousBody[1] = this.followingBody?.position.y;
        for (let i = 0; i < Config.ITERATIONS; i++) {
            bodies.forEach((body) => (body.velocity = body.updateVelocities(bodies)));
            bodies.forEach((body) => (body.position = body.updatePositions()));
        }
        //Update Trail
        bodies.forEach((body) => body.updateTrail(ignorePause, this.followingBody, this.previousBody, this.referenceMode));
    }
    referenceMode = false;
    setupEventListeners() {
        window.addEventListener("keydown", this.keydown.bind(this));
    }
    updateIterations(body) {
        const saveState = JSON.stringify(this.solarSystem.bodies);
        this.solarSystem.bodies.forEach((body) => (body.trail = []));
        this.firstFollowing = [
            this.followingBody?.position.x || 0,
            this.followingBody?.position.y || 0,
        ];
        for (let i = 0; i < Config.MAX_ITERATIONS; i++)
            this.update(this.solarSystem.bodies, true, body);
        if (this.referenceMode)
            this.solarSystem.bodies.forEach((body) => body.trail.forEach((trailpiece) => {
                trailpiece[0] -=
                    this.followingBody?.position.x - this.firstFollowing[0];
                trailpiece[1] -=
                    this.followingBody?.position.y - this.firstFollowing[1];
            }));
        const finalSaveState = JSON.parse(saveState);
        this.solarSystem.bodies.forEach((body, i) => {
            body.position = new Vector([
                finalSaveState[i].position.x,
                finalSaveState[i].position.y,
            ]);
            body.velocity = new Vector([
                finalSaveState[i].velocity.x,
                finalSaveState[i].velocity.y,
            ]);
        });
    }
    holdpauses = [];
    keydown(key) {
        switch (key.key) {
            case " ":
                this.pause = !this.pause;
                if (this.holdpauses) {
                    this.holdpauses.forEach((body) => (body.trail = []));
                    this.holdpauses = [];
                }
                break;
            case "ArrowUp":
                Config.ITERATIONS = this.time += 1;
                break;
            case "ArrowDown":
                if (Config.ITERATIONS > 1)
                    Config.ITERATIONS = this.time -= 1;
                break;
        }
    }
}
