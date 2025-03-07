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
        this.bodies.push(...data.stars.map(star => new Star(star)));
        this.bodies.push(...data.planets.map(planet => new Planet(planet)));
        this.bodies.push(...data.moons.map(moon => new Moon(moon)));
    }
    selectPosition(name) {
        const body = this.bodies.find((body) => body.name === name);
        return body?.position || null;
    }
    selectBody(name) {
        return this.bodies.find((body) => body.name === name) || null;
    }
}
