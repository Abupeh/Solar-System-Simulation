import { Button } from "../environment/controllers/Button.js";
export class Content {
    global;
    universe;
    buttons = [];
    constructor(global, universe) {
        this.global = global;
        this.universe = universe;
        this.createButtons();
    }
    createButtons() {
        const PlaceButton = new Button(this.global, 5, 5, 5, 5, "hi").onclick((pos) => {
            this.universe.append();
        });
        this.appendButton(PlaceButton);
    }
    appendButton(button) {
        this.buttons.push(button);
    }
}
