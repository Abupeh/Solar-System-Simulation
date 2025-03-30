import { Planet } from "../templates/Planet.js";
import { Star } from "../templates/Star.js";
import { Moon } from "../templates/Moon.js";
import { BlackHole } from "../templates/BlackHole.js";
import { Astroid } from "../templates/Asteroid.js";
//! public sets are AstroSets
export const AstroSets = {
    Planet,
    Star,
    Moon,
    BlackHole,
    Astroid,
};
export class AstroObject {
    kinematics;
    static count = 0;
    static createName(universeFormat, type) {
        return type + ":" + AstroObject.count++ + universeFormat;
    }
    type = "Planet";
    name;
    trail = [];
    static properties = {
        mass: 1000,
        radius: 2000,
        density: 1000 / 2000,
        gravity: 1,
        surfaceTemperature: 0,
        temperature: 0,
        age: 0,
        color: "#AABBCC",
        rings: {
            rings: false,
            color: "#c9c9c9",
            size: 100,
            thickness: 10,
        },
        atmosphere: {
            atmosphere: false,
            composition: ["N2", "O2"],
            color: "#c9c9c9",
            density: 100,
            pressure: 1000,
        },
        magneticField: 0,
        tectonicActivity: 0,
        volcanism: 0,
        habitability: 0,
        solar_stage: ["O", "B", "A", "F", "G", "K", "M"],
        luminosity: 0,
        metallicity: 0,
        solarWindSpeed: 0,
        habitableZone: {
            habitableZone: false,
            inner: 0,
            outer: 0,
        },
        surfaceComposition: ["Rock", "Metal", "Ice", "Water", "Gas", "Lava"],
        subsurfaceOcean: {
            subsurfaceOcean: false,
            composition: ["Ice", "Water", "Gas", "Lava"],
            depth: 100,
        },
        composition: ["Carbonaceous", "Silicaceous", "Metallic"],
        tailLength: 0,
        nucleusSize: 0,
        eventHorizonRadius: 0,
        spin: 0,
        charge: 0,
        accretionDisk: true,
        hawkingRadiation: false,
        gravitationalLensing: true,
    };
    properties = structuredClone(AstroObject.properties);
    constructor(universeFormat, kinematics) {
        this.kinematics = kinematics;
        this.name ||= AstroObject.createName(universeFormat, this.type);
        Object.assign(this.properties, AstroSets[this.type].createDefaults());
    }
    update(astroObjects) {
        // this.kinematics.applyGravitationalForce(
        // 	astroObjects,
        // 	this.properties.gravity,
        // 	this.properties.mass
        // );
        this.kinematics.applyPositionalForce();
    }
}
