import { Config } from "../config/config";

class Gui {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	constructor() {
		this.canvas = document.getElementById("guiCanvas") as HTMLCanvasElement;
		this.ctx = this.canvas.getContext("2d")!;

		this.resize();
	}

    public draw() {
        
    }

	public resize(): void {
		this.canvas.width = Config.WIDTH;
		this.canvas.height = Config.HEIGHT;
	}
}
