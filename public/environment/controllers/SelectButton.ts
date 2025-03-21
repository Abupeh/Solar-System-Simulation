import { Container } from "../interfaces/Container.js";
import { Global } from "../../global/Global.js";
import { ToggleButton } from "./ToggleButton.js";
export class SelectButton extends ToggleButton {
	container!: Container;
	protected handleClick(x: number, y: number) {
		if (!this.onButton(x, y)) return;
        this.container.selectToggle();
		this.toggled = true;
		this.callback(x, y);
    }
}
