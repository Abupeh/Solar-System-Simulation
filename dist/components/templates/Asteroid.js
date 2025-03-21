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
    constructor(variables = Astroid.details) {
        super(variables);
    }
    update() {
    }
    create(astroObject) {
    }
}
