import { Config } from "./config/config.js";
import { Vector } from "./Vector.js";
import { Planet } from "./objects/Planet.js";
import { Star } from "./objects/Star.js";
import { Moon } from "./objects/Moon.js";
export class SolarSystem {
    position;
    bodies = [];
    constructor(position = new Vector([0, 0])) {
        this.position = position;
        this.applyToMiddle();
    }
    useCanvas(canvas) {
        canvas.animate((offsetX, offsetY) => {
            this.bodies.forEach((body) => {
                body.update(this.bodies);
                body.draw(canvas.ctx, offsetX, offsetY);
            });
        });
    }
    applyToMiddle() {
        if (Config.APPLIED_TO_MIDDLE) {
            this.position.x += Config.WIDTH / 2;
            this.position.y += Config.HEIGHT / 2;
        }
    }
    importBodies(data) {
        // Create stars
        data.stars.forEach(({ mass, radius, color, velocity, position }) => {
            const star = new Star(mass, radius, color, new Vector(velocity), new Vector(position));
            star.position = new Vector(position);
            star.position = star.position.add(this.position);
            this.bodies.push(star);
        });
        // Create planets and their moons
        data.planets.forEach(({ mass, radius, color, position, velocity, moons }) => {
            const planet = new Planet(mass, radius, color, new Vector(position), new Vector(velocity));
            planet.position = planet.position.add(this.position);
            // Create moons
            moons?.forEach((moon_) => {
                const moonPosition = new Vector([
                    planet.position.x + moon_.orbitalDistance,
                    planet.position.y,
                ]);
                const moon = new Moon(moon_.mass, moon_.radius, moon_.color, moonPosition, planet.velocity.add(new Vector([0, moon_.orbitalSpeed])));
                planet.moons.push(moon);
                this.bodies.push(moon);
            });
            this.bodies.push(planet);
        });
    }
}
