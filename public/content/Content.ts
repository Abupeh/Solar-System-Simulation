import { Global } from "../global/Global.js";
import { Universe } from "../core/Universe.js";
import { ToggleButton } from "../environment/controllers/ToggleButton.js";
import { ActionButton } from "../environment/controllers/ActionButton.js";
import { SelectButton } from "../environment/controllers/SelectButton.js";
import { Container } from "../environment/interfaces/Container.js";
import { Controller } from "../environment/interfaces/Controller.js";
import { Place } from "../environment/context/Place.js";
import { KinematicsData } from "../components/astro/AstroObject.d.js";
import { PlaceDisplay } from "../environment/context/PlaceDisplay.js";
import { GuiButton } from "../layout/elements/GuiButton.js";

export class Content {
	public controllers: Controller[] = [];
	public place: Place;
	constructor(private global: Global, private universe: Universe) {
		this.place = new Place(this.global, this.universe);
		this.createButtons();
		
		this.createPlaceDisplay(this.place.placeObjects);
	}

	createPlaceDisplay(array: typeof this.place.placeObjects) {
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

		const firstButton = container.controllers[0] as SelectButton;
		firstButton.defaultClick();
		return variables
	}

	createButtons() {
		const Place = new ActionButton(this.global, 5, 5, 5, 5, "+").onSelectClick(
			(position) => this.place.create({ position } as KinematicsData)
		);
		this.appendControllers(Place);
		const Reference = new ToggleButton(this.global, 5, 11, 5, 5, "R").onClick(
			(pos) => {
				this.global.tracker.toggleReference(this.universe.astroObjects);
			}
		);
		this.appendControllers(Reference);
	}
	appendControllers(...controllers: Controller[]) {
		this.controllers.push(...controllers);
		controllers.forEach((controller) => {
			if (controller instanceof Container)
				this.appendControllers(...controller.controllers);
		});
	}
}
