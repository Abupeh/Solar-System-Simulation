import { AstroSet } from "../class/AstroSet.js";
export class BlackHole extends AstroSet {
    display = "BlackHole";
    static details = {
        type: ["Stellar", "Intermediate", "SuperMassive", "Primordial"],
        eventHorizonRadius: 0,
        spin: 0,
        charge: 0,
        accretionDisk: true,
        hawkingRadiation: false,
        gravitationalLensing: true,
    };
    static defaults = {
        mass: 100000,
        color: "#303030",
    };
    constructor(variables = BlackHole.details) {
        super(variables);
    }
    update() {
    }
    create(astroObject) {
    }
}
