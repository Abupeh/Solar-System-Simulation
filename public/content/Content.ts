import { Global } from "../global/Global.js";
import { Universe } from "../core/Universe.js";
import { ToggleButton } from "../environment/controllers/ToggleButton.js";
import { Button } from "../environment/interfaces/Button.js";
import { ActionButton } from "../environment/controllers/ActionButton.js";
import { SelectButton } from "../environment/controllers/SelectButton.js";
import { Container } from "../environment/interfaces/Container.js";
import { Controller } from "../environment/interfaces/Controller.js";
import { Place } from "../environment/context/Place.js";
import { KinematicsData } from "../components/astro/AstroObject.d.js";

export class Content {
	public controllers: Controller[] = [];
	public place: Place;
	constructor(private global: Global, private universe: Universe) {
		this.place = new Place(this.global, this.universe);
		this.createButtons();
		const container = this.place.createSetContainer();
		const sideContainer = this.place.createSideContainer(this.global);
		this.appendControllers(sideContainer);
		this.appendControllers(container);
		const variables = this.place.createVariables(container);
		this.appendControllers(...variables);
		const firstButton = container.controllers[0] as SelectButton;
		firstButton.defaultClick();
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
