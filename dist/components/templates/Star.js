import { AstroSet } from "../class/AstroSet.js";
export class Star extends AstroSet {
    static createDefaults() {
        return {};
    }
    display = "Star";
    static details = {
        type: [
            "Main",
            "Massive",
            "Giant",
            "Super",
            "Dwarf",
            "Neutron",
        ],
        stage: ["O", "B", "A", "F", "G", "K", "M"],
        luminosity: 0,
        temperature: 0,
        metallicity: 0,
        solarWindSpeed: 0,
        magneticField: 0,
        habitableZone: {
            habitableZone: false,
            inner: 0,
            outer: 0,
        },
    };
    static defaults = {
        mass: 10000,
        color: '#fff000'
    };
    defaults = Star.defaults;
    constructor(variables = structuredClone(Star.details)) {
        super(variables);
    }
    update() { }
    create(astroObject) { }
}
