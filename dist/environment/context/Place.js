import { Astro, AstroObject } from "../../components/astro/AstroObject.js";
import { Kinematics } from "../../modules/Kinematics.js";
import { Vector } from "../../modules/Vector.js";
import { Container } from "../interfaces/Container.js";
import { PlaceDisplay } from "./PlaceDisplay.js";
const colors = ["708090", "c6e2ff"];
export class Place {
    global;
    universe;
    template = "Planet";
    placeObjects = {};
    constructor(global, universe) {
        this.global = global;
        this.universe = universe;
        for (const key in Astro) {
            const AstroKey = key;
            const PlaceObject = this.defaultAstroObject(AstroKey);
            Object.assign(this.placeObjects, { [AstroKey]: PlaceObject });
        }
    }
    defaultAstroObject(template) {
        return new AstroObject(this.universe.format, new Kinematics(), Astro[template](), Astro[template]().defaults);
    }
    createSideContainer(global) {
        return new Container(global, PlaceDisplay.sideX, PlaceDisplay.sideY, PlaceDisplay.sideWidth, PlaceDisplay.sideHeight).secondaryColor();
    }
    createSetContainer(array) {
        let count = 0;
        const buttons = [];
        for (const key in array) {
            const placeObject = array[key];
            const SelectButton = PlaceDisplay.setButton(this.global, count, placeObject.set.display);
            SelectButton.onToggle(this.setPlace(key));
            buttons.push(SelectButton);
            count++;
        }
        return new Container(this.global, PlaceDisplay.INITIAL_X - PlaceDisplay.CONTAINER_X, PlaceDisplay.INITIAL_Y - PlaceDisplay.CONTAINER_Y, PlaceDisplay.X_SEPERATION * count + PlaceDisplay.CONTAINER_X, PlaceDisplay.HEIGHT + PlaceDisplay.CONTAINER_Y * 2).contain(buttons);
    }
    createVariables(array, setContainer, handleProperties = false) {
        let count = 0;
        const containers = [];
        for (const key in array) {
            const container = handleProperties
                ? PlaceDisplay.handleProperties(this.global, () => array[key], true)
                : PlaceDisplay.handleVariables(this.global, () => array[key], true);
            container.toEnable(false);
            container.whenEnable(setContainer.controllers[count], containers);
            containers.push(container);
            count++;
        }
        return containers;
    }
    setPlace(template) {
        return () => {
            this.template = template;
        };
    }
    create(kinematics) {
        this.placeObjects[this.template].kinematics.position = new Vector(...kinematics.position);
        this.universe.appendObject(this.placeObjects[this.template]);
        const { trail, set, kinematics: kinematic, ...properties } = this.placeObjects[this.template];
        const variables = this.placeObjects[this.template].set.variables;
        this.placeObjects[this.template] = this.defaultAstroObject(this.template);
        Object.assign(this.placeObjects[this.template], properties);
        Object.assign(this.placeObjects[this.template].set.variables, structuredClone(variables));
    }
}
