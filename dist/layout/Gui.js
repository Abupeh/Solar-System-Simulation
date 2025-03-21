import { Button } from "../environment/controllers/Button.js";
import { ButtonDisplay } from "./elements/Button.js";
export class Gui {
    display;
    static MAX_RATIO = 100;
    buttons = [];
    buttonDisplay;
    constructor(display) {
        this.display = display;
        this.createButtons();
        this.buttonDisplay = new ButtonDisplay(this.display);
    }
    scale() {
        this.buttons.forEach((button) => {
            this.buttonDisplay.scale(button);
        });
    }
    render() {
        this.buttons.forEach((button) => {
            this.buttonDisplay.draw(button);
        });
    }
    createButtons() {
        const PlaceButton = new Button(this.display, 5, 5, 5, 5, "hi").onclick((pos) => {
            console.log(pos);
        });
        this.appendButton(PlaceButton);
    }
    appendButton(button) {
        this.buttons.push(button);
    }
}
