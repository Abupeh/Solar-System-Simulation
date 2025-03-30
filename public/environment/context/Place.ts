import {
	AstroObject,
	AstroProperties,
} from "../../components/astro/AstroObject.js";
import { Universe } from "../../core/Universe.js";
import { Kinematics } from "../../modules/Kinematics.js";
import { SelectButton } from "../controllers/SelectButton.js";
import { TextBox } from "../controllers/TextBox.js";
import { ToggleButton } from "../controllers/ToggleButton.js";
import { Button } from "../interfaces/Button.js";
import { ControllerProperties, ObjectKeys } from "./Create.js";
import { Global } from "../../global/Global.js";
import { Container } from "../interfaces/Container.js";
import { AstroPlace } from "./AstroPlace.js";

type Controllers =
	| ControllerProperties<AstroProperties>
	| AstroProperties[ObjectKeys<AstroProperties>];

type Properties =
	| AstroProperties
	| AstroProperties[ObjectKeys<AstroProperties>];

export class Place {
	selected: AstroObject;

	constructor(private global: Global, private universe: Universe) {
		this.selected = new AstroObject(this.universe.format, new Kinematics());
	}

	placeSelected(position: [number, number]) {
		this.selected = new AstroObject(this.universe.format, new Kinematics());
		this.selected.kinematics.position.x = position[0];
		this.selected.kinematics.position.y = position[1];
		this.universe.appendObject(this.selected);
	}

	updateControllersToSelected(
		controllers: Controllers,
		properties: Properties = this.selected.properties
	) {
		for (const [key, value] of Object.entries(properties)) {
			if (typeof value == "string" || typeof value == "number") {
				if((controllers[key as keyof Controllers]as TextBox).focused) continue;

				(controllers[key as keyof Controllers] as TextBox).value = value;
				(controllers[key as keyof Controllers] as TextBox).text = value.toString();
				continue;
			}
			if (typeof value == "boolean") {
				(controllers[key as keyof Controllers] as ToggleButton).toggled = value;
				continue;
			}

			if (value instanceof Array) {
				(controllers[key as keyof Controllers] as Container).controllers.forEach(
					(controller) => {
						if (
							controller instanceof SelectButton ||
							controller instanceof ToggleButton
						) {
							controller.toggled = value.includes(controller.value);
						}
					}
				);
				continue;
			}

			this.updateControllersToSelected(controllers[key as keyof Controllers], value);
		}
	}

	updateSelected(
		controllers: Controllers,
		properties: Properties = this.selected.properties
	) {
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
				const array: string[] = properties[key as keyof Properties] || [];
				value.controllers.forEach((controller) => {
					if (
						controller instanceof SelectButton ||
						controller instanceof ToggleButton
					) {
						if (controller.toggled) {
							if (!array.includes(controller.value)) array.push(controller.value);
						} else if (array.includes(controller.value))
							array.splice(array.indexOf(controller.value), 1);
					}
				});
				Object.assign(properties, { [key]: array });
				continue;
			}

			this.updateSelected(value, properties[key as keyof Properties]);
		}
	}
}
