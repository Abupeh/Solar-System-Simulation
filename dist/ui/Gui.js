import { Config } from "../config/config";
class Gui {
    canvas;
    ctx;
    constructor() {
        this.canvas = document.getElementById("guiCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.resize();
    }
    draw() {
    }
    resize() {
        this.canvas.width = Config.WIDTH;
        this.canvas.height = Config.HEIGHT;
    }
}
