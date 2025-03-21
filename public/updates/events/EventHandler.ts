export class EventHandler {
	constructor() {}
	keydown(key: string, callback: () => void) {
		document.addEventListener("keydown", (event) => {
			if (event.key == key) callback();
		});
	}
	onmousemove(callback: (x: number, y: number) => void) {
		document.addEventListener("mousemove", (mouse) => {
			callback(mouse.offsetX, mouse.offsetY);
		});
	}
	onclick(callback: (x: number, y: number) => void) {
		document.addEventListener("click", (mouse) =>
			callback(mouse.offsetX, mouse.offsetY)
		);
	}
}
