export class Color {
    static RandomColor() {
        return `#${Math.floor((Math.random() * 16777215)/2).toString(16)}`
    }
}