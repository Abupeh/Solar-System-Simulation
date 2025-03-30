import { AstroSet } from "../class/AstroSet.js";
export class Astroid extends AstroSet {
    display = "Astroid";
    static details = {
        type: ["Astroid", "Comet"],
        composition: ["Carbonaceous", "Silicaceous", "Metallic"],
        tailLength: 0,
        nucleusSize: 0,
    };
    static defaults = {};
    defaults = Astroid.defaults;
    constructor(variables = structuredClone(Astroid.details)) {
        super(variables);
    }
    update() {
    }
    create(astroObject) {
    }
    static createDefaults() {
        return {};
    }
}
