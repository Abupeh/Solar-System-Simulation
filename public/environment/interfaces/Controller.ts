export interface Controller {
	x: number;
	y: number;
	width: number;
	height: number;
	enabled: boolean;
	placeDisplay: boolean;
	onUpdate: () => void;
}
