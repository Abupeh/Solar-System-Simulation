import { AstroObject, } from "../../components/astro/AstroObject.js";
import { Kinematics } from "../../modules/Kinematics.js";
import { SelectButton } from "../controllers/SelectButton.js";
import { TextBox } from "../controllers/TextBox.js";
import { ToggleButton } from "../controllers/ToggleButton.js";
import { Container } from "../interfaces/Container.js";
export class Place {
    global;
    universe;
    selected;
    constructor(global, universe) {
        this.global = global;
        this.universe = universe;
        this.selected = new AstroObject(this.universe.format, new Kinematics());
    }
    placeSelected(position) {
        this.selected = new AstroObject(this.universe.format, new Kinematics());
        this.selected.kinematics.position.x = position[0];
        this.selected.kinematics.position.y = position[1];
        this.universe.appendObject(this.selected);
    }
    updateControllersToSelected(controllers, properties = this.selected.properties) {
        for (const [key, value] of Object.entries(properties)) {
            if (typeof value == "string" || typeof value == "number") {
                if (controllers[key].focused)
                    continue;
                controllers[key].value = value;
                controllers[key].text = value.toString();
                continue;
            }
            if (typeof value == "boolean") {
                controllers[key].toggled = value;
                continue;
            }
            if (value instanceof Array) {
                controllers[key].controllers.forEach((controller) => {
                    if (controller instanceof SelectButton ||
                        controller instanceof ToggleButton) {
                        controller.toggled = value.includes(controller.value);
                    }
                });
                continue;
            }
            this.updateControllersToSelected(controllers[key], value);
        }
    }
    updateSelected(controllers, properties = this.selected.properties) {
        for (const [key, value] of Object.entries(controllers)) {
            if (value instanceof TextBox) {
                Object.assign(properties, { [key]: value.value });
                continue;
            }
            if (value instanceof SelectButton || value instanceof ToggleButton) {
                Object.assign(properties, { [key]: value.toggled });
                continue;
            }
            if (value instanceof Container) {
                const array = properties[key] || [];
                value.controllers.forEach((controller) => {
                    if (controller instanceof SelectButton ||
                        controller instanceof ToggleButton) {
                        if (controller.toggled) {
                            if (!array.includes(controller.value))
                                array.push(controller.value);
                        }
                        else if (array.includes(controller.value))
                            array.splice(array.indexOf(controller.value), 1);
                    }
                });
                Object.assign(properties, { [key]: array });
                continue;
            }
            this.updateSelected(value, properties[key]);
        }
    }
}
