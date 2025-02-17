import { Vector } from "./Vector.js";
import { Planet } from "../elements/Planet.js";
import { Star } from "../elements/Star.js";
import { Moon } from "../elements/Moon.js";
export class SolarSystem {
    position;
    bodies = [];
    constructor(position = new Vector([0, 0])) {
        this.position = position;
    }
    importBodies(data) {
        // Create stars
        data.stars.forEach((star_) => {
            const star = new Star(star_);
            this.bodies.push(star);
        });
        // Create planets and their moons
        data.planets.forEach((planet_) => {
            if (!planet_.ignore) {
                const planet = new Planet(planet_);
                // Create moons
                planet_.moons?.forEach((moon_) => {
                    if (!moon_.ignore) {
                        const moon = new Moon(moon_, planet);
                        planet.moons.push(moon);
                        this.bodies.push(moon);
                    }
                });
                this.bodies.push(planet);
            }
        });
    }
    selectPosition(name) {
        const body = this.bodies.find((body) => body.name === name);
        return body?.position || new Vector([0, 0]);
    }
    selectBody(name) {
        return this.bodies.find((body) => body.name === name) || this.bodies[0];
    }
}
