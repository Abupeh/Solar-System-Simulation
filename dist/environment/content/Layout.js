import { Button } from "../controllers/Button";
export class Layout {
    display;
    buttons = [];
    constructor(display) {
        this.display = display;
        this.createButtons();
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
