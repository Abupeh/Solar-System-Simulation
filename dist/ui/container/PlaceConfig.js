import { BlackHole } from "../../elements/BlackHole.js";
import { Moon } from "../../elements/Moon.js";
import { Planet } from "../../elements/Planet.js";
import { Star } from "../../elements/Star.js";
import { Button } from "../elements/Button.js";
import { Container } from "../elements/Container.js";
export class PlaceConfig {
    gui;
    type;
    variables;
    qualities;
    types;
    constructor(gui, type, variables, qualities, types) {
        this.gui = gui;
        this.type = type;
        this.variables = variables;
        this.qualities = qualities;
        this.types = types;
    }
    create(mouse) {
        this.variables.position = this.gui.camera.getRelativeMouse(mouse);
        this.variables.name = this.type + "-" + this.gui.solarSystem.bodies.length;
        let body;
        switch (this.type) {
            case "BlackHole":
                body = new BlackHole(this.variables, [...this.currentTypes]);
                return body;
            case "Star":
                body = new Star(this.variables, [...this.currentTypes]);
                return body;
            case "Planet":
                body = new Planet(this.variables, [...this.currentTypes]);
                return body;
            case "Moon":
                body = new Moon(this.variables, [...this.currentTypes]);
                return body;
        }
    }
    currentTypes = [];
    createContainer() {
        const types = this.types.map((type, i) => {
            const y = Math.floor(i / 4) * 4.5;
            const x = (4.5 * i) - (y * 4);
            return new Button(x, y, 4, 4, type, true).onclick((mouse, toggle) => {
                if (!toggle)
                    return this.currentTypes.splice(this.currentTypes.indexOf(type), 1);
                this.currentTypes.push(type);
            });
        });
        return new Container(0, 0, 0, 0, types);
    }
}
