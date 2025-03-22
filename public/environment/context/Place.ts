import {
	AstroProperties,
	AstroTemplates,
	ConsiceAstroData,
	KinematicsData,
	PreciseAstroData,
} from "../../components/astro/AstroObject.d.js";
import { Astro, AstroObject } from "../../components/astro/AstroObject.js";
import { Universe } from "../../core/Universe.js";
import { Kinematics } from "../../modules/Kinematics.js";
import { Vector } from "../../modules/Vector.js";
import { Global } from "../../global/Global.js";
import { Container } from "../interfaces/Container.js";
import { PlaceDisplay } from "./PlaceDisplay.js";
import { Button } from "../interfaces/Button.js";
import { Controller } from "../interfaces/Controller.js";
import { Content } from "../../content/Content.js";
const colors = ["708090", "c6e2ff"];
export class Place {
	public template: AstroTemplates = "Planet";
	public placeObjects = {} as { [template in AstroTemplates]: AstroObject };
	constructor(public global: Global, public universe: Universe) {
		for (const key in Astro) {
			const AstroKey = key as AstroTemplates;
			const PlaceObject = this.defaultAstroObject(AstroKey);
			Object.assign(this.placeObjects, { [AstroKey]: PlaceObject } as {
				[template in AstroTemplates]: AstroObject;
			});
		}
	}

	defaultAstroObject(template: AstroTemplates) {
		return new AstroObject(
			this.universe.format,
			new Kinematics(),
			Astro[template](),
			Astro[template]().defaults
		);
	}

	createSideContainer(global: Global) {
		return new Container(
			global,
			PlaceDisplay.sideX,
			PlaceDisplay.sideY,
			PlaceDisplay.sideWidth,
			PlaceDisplay.sideHeight
		).secondaryColor();
	}

	createSetContainer(array: typeof this.placeObjects) {
		let count = 0;
		const buttons = [];
		for (const key in array) {
			const placeObject = array[key as AstroTemplates];
			const SelectButton = PlaceDisplay.setButton(
				this.global,
				count,
				placeObject.set.display
			);
			SelectButton.onToggle(this.setPlace(key as AstroTemplates));
			buttons.push(SelectButton);
			count++;
		}
		return new Container(
			this.global,
			PlaceDisplay.INITIAL_X - PlaceDisplay.CONTAINER_X,
			PlaceDisplay.INITIAL_Y - PlaceDisplay.CONTAINER_Y,
			PlaceDisplay.X_SEPERATION * count + PlaceDisplay.CONTAINER_X,
			PlaceDisplay.HEIGHT + PlaceDisplay.CONTAINER_Y * 2
		).contain(buttons);
	}

	createVariables(
		array: typeof this.placeObjects,
		setContainer: Container,
		handleProperties = false
	) {
		let count = 0;
		const containers = [];
		for (const key in array) {
			const container = handleProperties
				? PlaceDisplay.handleProperties(
						this.global,
						() => array[key as AstroTemplates],
						true
				  )
				: PlaceDisplay.handleVariables(
						this.global,
						() => array[key as AstroTemplates],
						true
				  );
			container.toEnable(false);
			container.whenEnable(setContainer.controllers[count] as Button, containers);
			containers.push(container);
			count++;
		}
		return containers;
	}

	setPlace(template: AstroTemplates) {
		return () => {
			this.template = template;
		};
	}

	create(kinematics: KinematicsData) {
		this.placeObjects[this.template].kinematics.position = new Vector(
			...kinematics.position
		);
		this.universe.appendObject(this.placeObjects[this.template]);
		const {
			trail,
			set,
			kinematics: kinematic,
			...properties
		} = this.placeObjects[this.template];
		const variables = this.placeObjects[this.template].set.variables;
		this.placeObjects[this.template] = this.defaultAstroObject(this.template);
		Object.assign(this.placeObjects[this.template], properties);
		Object.assign(
			this.placeObjects[this.template].set.variables,
			structuredClone(variables)
		);
	}
}
