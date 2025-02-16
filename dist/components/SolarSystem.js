import { Config } from "../config/config.js";
import { Vector } from "./Vector.js";
import { Planet } from "../elements/Planet.js";
import { Star } from "../elements/Star.js";
import { Moon } from "../elements/Moon.js";
import { Astroid } from "../elements/Astroid.js";
export class SolarSystem {
    position;
    bodies = [];
    constructor(position = new Vector([0, 0])) {
        this.position = position;
        this.applyToMiddle();
    }
    applyToMiddle() {
        if (Config.APPLIED_TO_MIDDLE) {
            this.position.x += Config.WIDTH / 2;
            this.position.y += Config.HEIGHT / 2;
        }
    }
    importBodies(data) {
        // Create stars
        data.stars.forEach((star_) => {
            const star = new Star(star_);
            star.position = star.position.add(this.position);
            // Create astroids
            const astroids = new Array(star_.astroids?.count).fill(0);
            astroids?.forEach(() => {
                const astroid = new Astroid(star, star_.astroids.distance);
                star.astroids.push(astroid);
                this.bodies.push(astroid);
            });
            this.bodies.push(star);
        });
        // Create planets and their moons
        data.planets.forEach((planet_) => {
            const planet = new Planet(planet_);
            planet.position = planet.position.add(this.position);
            // Create moons
            planet_.moons?.forEach((moon_) => {
                const moon = new Moon(moon_, planet);
                planet.moons.push(moon);
                this.bodies.push(moon);
            });
            this.bodies.push(planet);
        });
    }
}
