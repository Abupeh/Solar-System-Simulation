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
            rings: false,
            composition: ["Ice", "Rock", "Dust"],
            color: "#99ccdd",
            distance: 450,
            thickness: 350,
            tiers: 1,
            tierPartition: 1,
        },
        atmosphere: {
            atmosphere: false,
            composition: ["N2", "O2"],
            color: "#8877dd",
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
        nucleusSize: 40,
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
        Object.assign(this.properties, structuredClone(AstroObject.properties));
        this.properties.name ||= AstroObject.createName();
    }
    update(astroObjects) {
        this.kinematics.applyGravitationalForce(astroObjects, this);
        this.kinematics.applyPositionalForce();
        this.properties.age += Kinematics.UNIVERSAL_GRAVITY / 10;
        this.calculateHabitability();
        this.lostCharge +=
            (this.properties.luminosity +
                this.properties.magneticField +
                this.properties.atmosphere.pressure) *
                Kinematics.UNIVERSAL_GRAVITY;
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
