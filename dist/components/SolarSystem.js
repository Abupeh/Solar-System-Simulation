import { Vector } from "./Vector.js";
import { Planet } from "../elements/Planet.js";
import { Star } from "../elements/Star.js";
import { Moon } from "../elements/Moon.js";
import { BlackHole } from "../elements/BlackHole.js";
export class SolarSystem {
    position;
    bodies = [];
    constructor(position = new Vector([0, 0])) {
        this.position = position;
    }
    async importExperiment(json) {
        const response = await fetch(json + '.json');
        const data = (await response.json());
        this.importBodies(data);
        return this;
    }
    importBodies(data) {
        data.stars &&
            this.bodies.push(...data.stars.map((star) => new Star(star, star.types)));
        data.planets &&
            this.bodies.push(...data.planets.map((planet) => new Planet(planet, planet.types)));
        data.moons &&
            this.bodies.push(...data.moons.map((moon) => new Moon(moon, moon.types)));
        data.blackholes &&
            this.bodies.push(...data.blackholes.map((blackhole) => new BlackHole(blackhole, blackhole.types)));
    }
    toStringType(body) {
        if (body instanceof Star)
            return "stars";
        if (body instanceof Planet)
            return "planets";
        if (body instanceof Moon)
            return "moons";
        if (body instanceof BlackHole)
            return "blackholes";
        return "planets";
    }
    collectData() {
        const data = {
            stars: [],
            planets: [],
            moons: [],
            blackholes: [],
        };
        this.bodies.forEach(({ name, color, mass, radius, types, position, velocity }, i) => {
            data[this.toStringType(this.bodies[i])].push({
                name,
                color,
                mass,
                radius,
                types,
                position: [position.x, position.y],
                velocity: [velocity.x, velocity.y],
            });
        });
        return data;
    }
    download() {
        const data = this.collectData();
        const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "solarsystem.json";
        a.click();
        URL.revokeObjectURL(url);
    }
    selectPosition(name) {
        const body = this.bodies.find((body) => body.name === name);
        return body?.position || null;
    }
    selectBody(name) {
        return this.bodies.find((body) => body.name === name) || null;
    }
}
