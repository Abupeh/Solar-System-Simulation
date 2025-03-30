import { Button } from "../interfaces/Button.js";
export class ActionButton extends Button {
    selectCallBack;
    isSelected() {
        return !!this.selectCallBack;
    }
    hold = false;
    handleClick(x, y) {
        if (this.onButton(x, y)) {
            if (this.isSelected())
                this.hold = true;
            this.selectCallBack = undefined;
        }
        this.selectCallBack?.(x, y);
        this.selectCallBack = undefined;
        if (this.onButton(x, y) && !this.hold)
            this.callback(x, y);
        this.hold = false;
        this.onUpdate();
    }
    onSelectClick(callback) {
        this.callback = () => (this.selectCallBack = (x, y) => {
            callback(this.global.camera.getMouse(x, y));
        });
        return this;
    }
}
