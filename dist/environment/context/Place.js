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
        return new AstroObject(this.universe.format, new Kinematics(), new Astro[template](), Astro[template].defaults);
    }
    createSideContainer(global) {
        return new Container(global, PlaceDisplay.sideX, PlaceDisplay.sideY, PlaceDisplay.sideWidth, PlaceDisplay.sideHeight).secondaryColor();
    }
    createSetContainer() {
        let count = 0;
        const buttons = [];
        for (const key in this.placeObjects) {
            const placeObject = this.placeObjects[key];
            const SelectButton = PlaceDisplay.setButton(this.global, count, placeObject.set.display);
            SelectButton.onToggle(this.setPlace(key));
            buttons.push(SelectButton);
            count++;
        }
        return new Container(this.global, PlaceDisplay.INITIAL_X - PlaceDisplay.CONTAINER_X, PlaceDisplay.INITIAL_Y - PlaceDisplay.CONTAINER_Y, PlaceDisplay.X_SEPERATION * count + PlaceDisplay.CONTAINER_X, PlaceDisplay.HEIGHT + PlaceDisplay.CONTAINER_Y * 2).contain(buttons);
    }
    createVariables(setContainer) {
        let count = 0;
        const containers = [];
        for (const key in this.placeObjects) {
            const { set } = this.placeObjects[key];
            const container = PlaceDisplay.handleVariables(this.global, set, true);
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
    update(kinematics) {
        const astroObject = this.placeObjects[this.template];
        astroObject.kinematics.position = new Vector(...kinematics.position);
        return astroObject;
    }
    create(kinematics) {
        const astroObject = this.update(kinematics);
        this.placeObjects[this.template] = this.defaultAstroObject(this.template);
        this.universe.appendObject(astroObject);
    }
}
