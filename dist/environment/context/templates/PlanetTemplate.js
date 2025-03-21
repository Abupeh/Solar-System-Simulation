export class PlanetTemplate {
    static details = {
        type: ["Terrestrial", "Gas", "Ice", "Giant", "Dwarf"],
        rings: {
            ringed: false,
            color: "#c9c9c9",
            size: 100,
            thickness: 10
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
    };
}
