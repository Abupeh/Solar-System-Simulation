class Update {
    update(solarSystem) {
        for (const body of solarSystem.bodies) {
            body.update(solarSystem.bodies);
        }
        requestAnimationFrame(() => this.update(solarSystem));
    }
}
export {};
