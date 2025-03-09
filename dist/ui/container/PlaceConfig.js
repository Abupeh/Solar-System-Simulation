import { GuiConfig } from "../../config/guiconfig.js";
import { BlackHole } from "../../elements/BlackHole.js";
import { Moon } from "../../elements/Moon.js";
import { Planet } from "../../elements/Planet.js";
import { Star } from "../../elements/Star.js";
import { Button } from "../elements/Button.js";
import { Container } from "../elements/Container.js";
import { TextDisplay } from "../elements/Text.js";
import { TextBox } from "../elements/TextBox.js";
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
            case "Star":
                body = new Star(this.variables, [...this.currentTypes]);
            case "Planet":
                body = new Planet(this.variables, [...this.currentTypes]);
            case "Moon":
                body = new Moon(this.variables, [...this.currentTypes]);
        }
        this.iterate(body);
        return body;
    }
    iterate(body) {
        this.gui.updater.pause = true;
        this.gui.updater.holdpauses.push(body);
        this.gui.updater.holdpauses.forEach((body) => {
            body.trail = [];
            this.gui.updater.updateIterations(body);
        });
    }
    currentTypes = [];
    createTypes() {
        const types = this.types.map((type, i) => {
            const y = Math.floor(i / GuiConfig.GAPY) * 4.5;
            const x = 4.5 * i - y * GuiConfig.GAPX;
            return new Button(x, y, GuiConfig.GAPX, GuiConfig.GAPY, type, true).onclick((mouse, toggle) => {
                if (!toggle)
                    return this.currentTypes.splice(this.currentTypes.indexOf(type), 1);
                this.currentTypes.push(type);
            });
        });
        return new Container(0, 0, 0, 0, types);
    }
    createVariables() {
        const keys = Object.keys(this.variables).map((key, i) => {
            const x = Math.floor(i / GuiConfig.GAPY) * 4.5;
            const y = 4.5 * i - x * GuiConfig.GAPX;
            return new TextDisplay(x, y + 0.5, GuiConfig.GAPX, GuiConfig.KEY_HEIGHT, key);
        });
        const variables = Object.keys(this.variables).map((key, i) => {
            const x = Math.floor(i / GuiConfig.GAPY) * 4.5;
            const y = 4.5 * i - x * GuiConfig.GAPX;
            return new TextBox(x + 4, y, GuiConfig.GAPX, GuiConfig.GAPY, this.variables[key]);
        });
        return new Container(0, 0, 0, 0, [...variables, ...keys]);
    }
}
