export class EventHandler {
	mouseX = 0;
	mouseY = 0;
	constructor() {
	}
	keydown(key: string, callback: () => void) {
		document.addEventListener("keydown", (event) => {
			if (event.key == key) callback();
		});
	}
	onmousemove(callback: (x: number, y: number) => void) {
		document.addEventListener("mousemove", (mouse) => {
			this.mouseX = mouse.offsetX;
			this.mouseY = mouse.offsetY;
			callback(mouse.offsetX, mouse.offsetY);
		});
	}
	onclick(callback: (x: number, y: number) => void) {
		document.addEventListener("click", (mouse) =>
			callback(mouse.offsetX, mouse.offsetY)
		);
	}

	scroll(callback: (scroll: number) => void) {
		document.addEventListener("wheel", (scrollEvent) => 
			callback(scrollEvent?.deltaY > 0 ? 1 : -1)
		);
	}
}
