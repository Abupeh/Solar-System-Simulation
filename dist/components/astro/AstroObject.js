import { Planet } from "../templates/Planet.js";
import { Star } from "../templates/Star.js";
import { Moon } from "../templates/Moon.js";
import { BlackHole } from "../templates/BlackHole.js";
import { Astroid } from "../templates/Asteroid.js";
// type SpecralType = "O" | "B" | "A" | "F" | "G" | "K" | "M"
export const Astro = {
    Planet: () => new Planet(),
    Star: () => new Star(),
    Moon: () => new Moon(),
    BlackHole: () => new BlackHole(),
    Astroid: () => new Astroid(),
};
export class AstroObject {
    kinematics;
    set;
    static count = 0;
    static createName(universeFormat, type) {
        return type + ":" + AstroObject.count++ + universeFormat;
    }
    name;
    mass = 1000;
    radius = 2000;
    gravity = 1;
    surfaceTemperature = 0; //!
    age = 0; //!
    color = "#AABBCC";
    get density() {
        return this.mass / this.radius;
    }
    trail = [];
    constructor(universeFormat, kinematics, set, properties) {
        this.kinematics = kinematics;
        this.set = set;
        Object.assign(this, properties);
        this.name ||= AstroObject.createName(universeFormat, this.set.display);
        this.set.create(this);
    }
    update(astroObjects) {
        this.set.update(this);
        this.kinematics.applyGravitationalForce(astroObjects, this.gravity, this.mass);
        this.kinematics.applyPositionalForce();
    }
}
