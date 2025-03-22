import { SelectButton } from "../controllers/SelectButton.js";
import { PlaceDisplay } from "../context/PlaceDisplay.js";
import { Camera } from "../../display/base/Camera.js";
export class Container {
    global;
    x;
    y;
    width;
    height;
    controllers = [];
    constructor(global, x, y, width, height) {
        this.global = global;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    contain(controllers) {
        this.controllers = controllers;
        this.controllers.forEach((controller) => {
            if (controller instanceof SelectButton)
                controller.container = this;
        });
        return this;
    }
    text = "";
    includeText(text) {
        this.text = text;
        return this;
    }
    scroll(sideContainer) {
        this.global.event.scroll((scroll) => this.handleScroll(sideContainer, scroll));
        return this;
    }
    handleScroll(sideContainer, scroll) {
        if (!this.onContainer(sideContainer, this.global.event.mouseX, this.global.event.mouseY))
            return (Camera.ENABLE_SCROLL = true);
        Camera.ENABLE_SCROLL = false;
        this.controllers.forEach((controller) => {
            const scrollAmount = scroll * PlaceDisplay.SCROLL_SPEED;
            controller.y += scrollAmount;
            if (controller instanceof Container)
                controller.handleScroll(sideContainer, scroll);
        });
    }
    placeDisplay = false;
    place() {
        this.controllers.forEach((controller) => {
            controller.placeDisplay = true;
            if (controller instanceof Container)
                controller.place();
        });
        this.placeDisplay = true;
        return this;
    }
    onContainer(container, x, y) {
        return (x > container.x &&
            x < container.x + container.width &&
            y > container.y &&
            y < container.y + container.height);
    }
    useSecondaryColor = false;
    secondaryColor() {
        this.useSecondaryColor = true;
        return this;
    }
    enabled = true;
    toEnable(enable) {
        this.enabled = enable;
        this.controllers.forEach((controller) => {
            controller.enabled = this.enabled;
            if (controller instanceof Container)
                controller.toEnable(enable);
        });
        return this;
    }
    whenEnable(button, disableContainers) {
        button.containerCallbacks.push(() => {
            disableContainers.forEach((container) => {
                container.toEnable(false);
            });
            this.toEnable(true);
        });
    }
    selectToggle() {
        this.controllers.forEach((controller) => {
            if (controller instanceof SelectButton)
                controller.toggled = false;
        });
    }
}
