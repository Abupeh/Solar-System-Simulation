import { Kinematics } from "../../modules/Kinematics.js";
export class AstroObject {
    kinematics;
    static count = 0;
    static createName() {
        return "Astro-" + AstroObject.count++;
    }
    trail = [];
    static properties = {
        name: "",
        mass: 1000,
        radius: 2000,
        density: 1000 / 2000,
        gravity: 1,
        surfaceTemperature: 0,
        coreTemperature: 0,
        age: 0,
        color: "#AADDFF",
        rings: {
            rings: true,
            color: "#c9c9c9",
            distance: 100,
            thickness: 10,
        },
        atmosphere: {
            atmosphere: true,
            composition: ["N2", "O2"],
            color: "#fdfdfd",
            density: 100,
            pressure: 1000,
        },
        spin: 0,
        charge: 0,
        magneticField: 0,
        tectonicActivity: 0,
        volcanism: 0,
        habitability: 0,
        solarStage: ["O", "B", "A", "F", "G", "K", "M"],
        luminosity: 12,
        metallicity: 0,
        windSpeed: 0,
        nucleusSize: 4,
        habitableZone: {
            habitableZone: false,
            inner: 0,
            outer: 0,
        },
        surfaceComposition: ["Rock", "Metal", "Ice", "Water", "Gas", "Lava"],
        innerComposition: ["Carbonaceous", "Silicaceous", "Metallic"],
        subsurfaceOcean: {
            subsurfaceOcean: false,
            composition: ["Ice", "Water", "Gas", "Lava"],
            depth: 100,
        },
        eventHorizonRadius: 0,
        accretionDisk: true,
        hawkingRadiation: false,
        gravitationalLensing: true,
    };
    properties = structuredClone(AstroObject.properties);
    constructor(kinematics) {
        this.kinematics = kinematics;
        this.properties.name ||= AstroObject.createName();
    }
    update(astroObjects) {
        this.kinematics.applyGravitationalForce(astroObjects, this);
        this.kinematics.applyPositionalForce();
        this.properties.age += Kinematics.GRAVITATIONAL_CONSTANT / 10;
        this.calculateHabitability();
        this.lostCharge += this.properties.luminosity;
        this.properties.charge =
            this.properties.mass * this.properties.radius - this.lostCharge;
    }
    lostCharge = 0;
    calculateHabitability() {
        let habitability = 0;
        habitability += this.habitableOf(this.properties.coreTemperature, 5200);
        habitability += this.habitableOf(this.properties.surfaceTemperature, 15);
        habitability += this.habitableOf(this.properties.density, 5.51);
        habitability += this.habitableOf(this.properties.atmosphere.density, 1.225);
        habitability += this.habitableOf(this.properties.mass, 3000);
        habitability += this.habitableOf(this.properties.atmosphere.pressure, 1013.25);
        this.properties.habitability = (habitability / 6) * 100;
    }
    habitableOf(value, goal) {
        return 1 / Math.abs(value - goal + 1);
    }
}
