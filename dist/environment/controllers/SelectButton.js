import { ToggleButton } from "./ToggleButton.js";
export class SelectButton extends ToggleButton {
    container;
    handleClick(x, y) {
        if (!this.onButton(x, y))
            return;
        this.container.selectToggle();
        this.toggled = true;
        this.callback(x, y);
    }
}
