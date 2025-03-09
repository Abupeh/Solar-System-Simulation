import { Vector } from "../components/Vector.js";
import { Config } from "../config/config.js";
export class Updater {
    solarSystem;
    pause = false;
    time = Config.ITERATIONS;
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.setupEventListeners();
    }
    update(bodies, ignorePause = false, reversalBody) {
        if (this.pause && !ignorePause)
            return;
        for (let i = 0; i < Config.ITERATIONS; i++) {
            bodies.forEach((body) => (body.velocity = body.updateVelocities(bodies)));
            bodies.forEach((body) => (body.position = body.updatePositions()));
        }
        //Update Trail
        if (reversalBody)
            return reversalBody.updateTrail(ignorePause);
        bodies.forEach((body) => body.updateTrail());
    }
    setupEventListeners() {
        window.addEventListener("keydown", this.keydown.bind(this));
    }
    updateIterations(body) {
        body.trail = [];
        const saveState = JSON.stringify(this.solarSystem.bodies);
        for (let i = 0; i < Config.MAX_ITERATIONS; i++)
            this.update(this.solarSystem.bodies, true, body);
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
                    this.holdpauses.forEach((body) => body.trail = []);
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
