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
        this.createPlaceDisplay(this.place.placeObjects);
    }
    createPlaceDisplay(array) {
        const container = this.place.createSetContainer(array);
        const sideContainer = this.place.createSideContainer(this.global);
        this.appendControllers(sideContainer);
        this.appendControllers(container);
        const variables = [
            ...this.place.createVariables(array, container),
            ...this.place.createVariables(array, container, true),
        ];
        this.appendControllers(...variables);
        variables.forEach((variable) => variable.place());
        variables.forEach((variable) => variable.scroll(sideContainer));
        const firstButton = container.controllers[0];
        firstButton.defaultClick();
        return variables;
    }
    followingNumber = 0;
    createButtons() {
        const Place = new ActionButton(this.global, 7, 5, 5, 5, "+").onSelectClick((position) => this.place.create({ position }));
        this.appendControllers(Place);
        const Reference = new ToggleButton(this.global, 7, 11, 5, 5, "R").onClick((pos) => {
            this.global.tracker.toggleReference(this.universe.astroObjects);
        });
        this.appendControllers(Reference);
        const FollowUp = new ActionButton(this.global, 13, 11, 5, 5, ">").onClick(() => {
            if (this.universe.astroObjects.length <= this.followingNumber) {
                this.followingNumber = 0;
            }
            this.global.tracker.following =
                this.universe.astroObjects[this.followingNumber];
            this.followingNumber++;
        });
        this.appendControllers(FollowUp);
        const FollowDown = new ActionButton(this.global, 1, 11, 5, 5, "<").onClick(() => {
            if (this.followingNumber < 0)
                this.followingNumber = this.universe.astroObjects.length - 1;
            this.global.tracker.following =
                this.universe.astroObjects[this.followingNumber];
            this.followingNumber--;
        });
        this.appendControllers(FollowDown);
        const EndFollow = new ToggleButton(this.global, 7, 17, 5, 5, "F").onClick(() => {
            if (this.global.tracker.following)
                return (this.global.tracker.following = undefined);
            this.global.tracker.following = this.universe.astroObjects[this.followingNumber];
        }).toggle();
        EndFollow.defaultClick();
        this.appendControllers(EndFollow);
    }
    appendControllers(...controllers) {
        this.controllers.push(...controllers);
        controllers.forEach((controller) => {
            if (controller instanceof Container)
                this.appendControllers(...controller.controllers);
        });
    }
}
