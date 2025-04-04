import { ToggleButton } from "../environment/controllers/ToggleButton.js";
import { ActionButton } from "../environment/controllers/ActionButton.js";
import { Container } from "../environment/interfaces/Container.js";
import { Create } from "../environment/context/Create.js";
import { AstroObject } from "../components/astro/AstroObject.js";
import { Place } from "../environment/context/Place.js";
import { AstroPlace } from "../environment/context/AstroPlace.js";
import { TextBox } from "../environment/controllers/TextBox.js";
import { Kinematics } from "../modules/Kinematics.js";
export class Content {
    global;
    universe;
    controllers = [];
    create;
    place;
    astroPlace;
    constructor(global, universe) {
        this.global = global;
        this.universe = universe;
        this.createButtons();
        this.create = new Create(this.global, this.universe, this);
        this.astroPlace = new AstroPlace(this.global);
        this.place = new Place(this.global, this.universe);
        const astroPlaceGui = this.astroPlace.configureGui();
        const sideContainer = this.create.sideContainer();
        this.create.configureControllers(AstroObject.properties);
        this.appendControllers(...astroPlaceGui, sideContainer, ...this.create.controllerList);
        this.create.place(sideContainer);
    }
    clearReferenceTrails() {
        if (this.global.tracker.reference) {
            this.universe.astroObjects.forEach((astroObject) => {
                astroObject.trail = [];
            });
        }
    }
    followingNumber = 1;
    createButtons() {
        const Place = new ActionButton(this.global, 7, 5, 5, 5, "+").onSelectClick((position) => {
            this.place.placeSelected(position);
            this.global.guiUpdate();
        });
        this.appendControllers(Place);
        const Reference = new ToggleButton(this.global, 7, 11, 5, 5, "Reference").onClick((pos) => {
            this.global.tracker.toggleReference(this.universe.astroObjects);
        });
        this.appendControllers(Reference);
        const FollowUp = new ActionButton(this.global, 13, 11, 5, 5, ">").onClick(() => {
            if (!this.global.tracker.following)
                return;
            this.clearReferenceTrails();
            this.followingNumber++;
            if (this.universe.astroObjects.length <= this.followingNumber) {
                this.followingNumber = 0;
            }
            this.global.tracker.following =
                this.universe.astroObjects[this.followingNumber];
        });
        this.appendControllers(FollowUp);
        const FollowDown = new ActionButton(this.global, 1, 11, 5, 5, "<").onClick(() => {
            if (!this.global.tracker.following)
                return;
            this.clearReferenceTrails();
            this.followingNumber--;
            if (this.followingNumber < 0)
                this.followingNumber = this.universe.astroObjects.length - 1;
            this.global.tracker.following =
                this.universe.astroObjects[this.followingNumber];
        });
        this.appendControllers(FollowDown);
        const EndFollow = new ToggleButton(this.global, 7, 17, 5, 5, "Follow")
            .onClick(() => {
            if (this.global.tracker.following)
                return (this.global.tracker.following = undefined);
            this.global.tracker.following =
                this.universe.astroObjects[this.followingNumber];
        })
            .toggle();
        EndFollow.defaultClick();
        this.appendControllers(EndFollow);
        const SelectObject = new ActionButton(this.global, 13, 17, 5, 5, "Select").onClick(() => {
            if (this.global.tracker.following)
                this.place.selected = this.global.tracker.following;
        });
        this.appendControllers(SelectObject);
        const Download = new ActionButton(this.global, 1, 5, 5, 5, "Download").onClick(() => {
            this.universe.download();
        });
        this.appendControllers(Download);
        this.TimeTextBox = new TextBox(this.global, 7, 23, 5, 5, this.global.time.iterations.toString(), "Iterations", "number").onChange((value) => (this.global.time.iterations = value));
        this.appendControllers(this.TimeTextBox);
        const Force = new TextBox(this.global, 8, 30, 6, 4, Kinematics.UNIVERSAL_FORCE.toString(), "Universal Force", "number").onChange((value) => (Kinematics.UNIVERSAL_FORCE = value));
        this.appendControllers(Force);
        const Velocity = new TextBox(this.global, 8, 35, 6, 4, Kinematics.UNIVERSAL_VELOCITY.toString(), "Universal Velocity", "number").onChange((value) => (Kinematics.UNIVERSAL_VELOCITY = value));
        this.appendControllers(Velocity);
    }
    TimeTextBox;
    appendControllers(...controllers) {
        this.controllers.push(...controllers);
        controllers.forEach((controller) => {
            if (controller instanceof Container)
                this.appendControllers(...controller.controllers);
        });
    }
}
