export class EventHandler {
	mouseX = 0;
	mouseY = 0;
	constructor() {
		this.addEventListeners();
	}

	addEventListeners() {
		document.addEventListener("keydown", (event) => {
			this.keydownCallbacks.forEach((callback) => callback(event.key));
		});
		document.addEventListener("mousemove", (event) => {
			this.mousemoveCallbacks.forEach((callback) => {
				this.mouseX = event.offsetX;
				this.mouseY = event.offsetY;
				callback(event.offsetX, event.offsetY);
			});
		});
		document.addEventListener("click", (event) => {
			this.clickCallbacks.forEach((callback) =>
				callback(event.offsetX, event.offsetY)
			);
		});
		document.addEventListener("wheel", (event) => {
			this.scrollCallbacks.forEach((callback) =>
				callback(event.deltaY > 0 ? 1 : -1)
			);
		});
	}

	keydownCallbacks: ((key: string) => void)[] = [];
	mousemoveCallbacks: ((x: number, y: number) => void)[] = [];
	clickCallbacks: ((x: number, y: number) => void)[] = [];
	scrollCallbacks: ((scroll: number) => void)[] = [];

	keydown(key: string, callback: () => void) {
		this.keydownCallbacks.push((eventKey: string) => {
			if(key == eventKey) callback();
		});
	}
	onmousemove(callback: (x: number, y: number) => void) {
		this.mousemoveCallbacks.push(callback);
	}
	onclick(callback: (x: number, y: number) => void) {
		this.clickCallbacks.push(callback);
	}
	scroll(callback: (scroll: number) => void) {
		this.scrollCallbacks.push(callback);
	}
}
