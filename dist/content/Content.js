import { ToggleButton } from "../environment/controllers/ToggleButton.js";
import { ActionButton } from "../environment/controllers/ActionButton.js";
import { Container } from "../environment/interfaces/Container.js";
import { Place } from "../environment/context/Place.js";
export class Content {
    global;
    universe;
    controllers = [];
    place;
    constructor(global, universe) {
        this.global = global;
        this.universe = universe;
        this.place = new Place(this.global, this.universe);
        this.createButtons();
        const container = this.place.createSetContainer();
        const sideContainer = this.place.createSideContainer(this.global);
        this.appendControllers(sideContainer);
        this.appendControllers(container);
        const variables = this.place.createVariables(container);
        this.appendControllers(...variables);
        const firstButton = container.controllers[0];
        firstButton.defaultClick();
    }
    createButtons() {
        const Place = new ActionButton(this.global, 5, 5, 5, 5, "+").onSelectClick((position) => this.place.create({ position }));
        this.appendControllers(Place);
        const Reference = new ToggleButton(this.global, 5, 11, 5, 5, "R").onClick((pos) => {
            this.global.tracker.toggleReference(this.universe.astroObjects);
        });
        this.appendControllers(Reference);
    }
    appendControllers(...controllers) {
        this.controllers.push(...controllers);
        controllers.forEach((controller) => {
            if (controller instanceof Container)
                this.appendControllers(...controller.controllers);
        });
    }
}
