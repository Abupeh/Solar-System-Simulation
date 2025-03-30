import { Button } from "../interfaces/Button.js";
export class ToggleButton extends Button {
    toggled = false;
    handleClick(x, y) {
        if (!this.onButton(x, y))
            return;
        this.toggle();
        this.callback(x, y);
        this.onUpdate();
    }
    onToggle(callback) {
        this.callback = (x, y) => {
            if (!this.toggled)
                return;
            callback(this.global.camera.getMouse(x, y));
            this.containerCallbacks.forEach((containerCallback) => containerCallback(this.global.camera.getMouse(x, y)));
        };
        return this;
    }
    toggle() {
        this.toggled = !this.toggled;
        return this;
    }
}
