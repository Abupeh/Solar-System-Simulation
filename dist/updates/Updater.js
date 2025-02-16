export class Updater {
    solarSystem;
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
    }
    update(body) {
        body.update(this.solarSystem.bodies);
        console.log(this.solarSystem.bodies.find((b) => b.name === 'Astroid 1'));
    }
}
