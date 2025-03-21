import { AstroSet } from "../class/AstroSet.js";
export class Moon extends AstroSet {
    display = "Moon";
    static details = {
        type: ["Regular", "Irregular"],
        surfaceComposition: ["Rock", "Metal", "Ice", "Water", "Gas", "Lava"],
        subsurfaceOcean: {
            subsurfaceOcean: false,
            composition: ["Ice", "Water", "Gas", "Lava"],
            depth: 100,
        },
        habitabilityPercentage: 0,
    };
    static defaults = {};
    constructor(variables = Moon.details) {
        super(variables);
    }
    update() {
    }
    create(astroObject) {
    }
}
