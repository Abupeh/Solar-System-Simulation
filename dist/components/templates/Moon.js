import { AstroSet } from "../class/AstroSet.js";
export class Moon extends AstroSet {
    static createDefaults() {
        return {};
    }
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
    defaults = Moon.defaults;
    constructor(variables = structuredClone(Moon.details)) {
        super(variables);
    }
    update() {
    }
    create(astroObject) {
    }
}
