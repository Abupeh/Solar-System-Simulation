import { Vector } from "../../components/Vector.js";
import { GuiConfig } from "../../config/guiconfig.js";
import { GuiContainer } from "../container/GuiContainer.js";
export class TextBox extends GuiContainer {
    x;
    y;
    width;
    height;
    text;
    isFocused = false;
    cursorVisible = false;
    cursorInterval;
    sideBox;
    constructor(x, y, width, height, text = "") {
        super(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.findTextType(text.toString());
        if (this.textType == "Vector") {
            this.sideBox = new TextBox(this.x + GuiConfig.GAPX, this.y, this.width, this.height, this.sideBoxText).onchange((value) => {
                this.sideBoxText = value;
                this.complete();
            });
            this.sideBox.returnFirst = true;
            this.sideBox.textType = 'Vector';
        }
        this.canvas.tabIndex = 0;
        // Event listeners
        this.canvas.addEventListener("mousedown", (e) => this.handleClick(e));
        this.canvas.addEventListener("keydown", (e) => this.handleKeyDown(e));
    }
    returnFirst = false;
    textType;
    sideBoxText;
    value() {
        if (this.textType == "Vector") {
            if (this.returnFirst)
                return Number(this.text);
            return new Vector([Number(this.text), Number(this.sideBoxText)]);
        }
        if (this.textType == "Color")
            return this.text;
        return Number(this.text);
    }
    findTextType(text) {
        if (text.at(0) == "#")
            return (this.textType = "Color");
        if (text.includes(",")) {
            [this.text, this.sideBoxText] = text.split(",");
            return (this.textType = "Vector");
        }
        this.textType = "Number";
    }
    draw() {
        if (this.disabled)
            return;
        this.ctx.fillStyle = GuiConfig.TEXTBOX_COLOR;
        if (this.isFocused)
            this.ctx.fillStyle = GuiConfig.TEXTBOX_TOGGLE_COLOR;
        if (this.textType == "Color")
            this.ctx.fillStyle = this.text;
        this.ctx.beginPath();
        this.ctx.roundRect(this.x, this.y, this.width, this.height, GuiConfig.ROUNDNESS);
        this.ctx.fill();
        // Draw text
        this.ctx.fillStyle = GuiConfig.TEXT_COLOR;
        this.ctx.font = `${GuiConfig.FONT_SIZE}px Arial`;
        this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
        // Draw cursor if focused and visible
        if (this.isFocused && this.cursorVisible) {
            const textWidth = this.ctx.measureText(this.text).width / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x + this.width / 2 + textWidth, this.y + this.height / GuiConfig.GAPY);
            this.ctx.lineTo(this.x + this.width / 2 + textWidth, this.y + GuiConfig.FONT_SIZE + this.height / GuiConfig.GAPY);
            this.ctx.strokeStyle = GuiConfig.CURSOR_COLOR;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }
    handleClick(event) {
        if (this.disabled)
            return;
        if (event.offsetX > this.x &&
            event.offsetX < this.x + this.width &&
            event.offsetY > this.y &&
            event.offsetY < this.y + this.height) {
            this.isFocused = true;
            this.resetCursor();
            return;
        }
        if (this.isFocused)
            this.complete();
    }
    disable() {
        this.disabled = true;
        this.sideBox?.disable();
        this.inactivate();
    }
    enable() {
        this.disabled = false;
        this.sideBox?.enable();
    }
    inactivate() {
        if (this.cursorInterval)
            clearInterval(this.cursorInterval);
        this.isFocused = false;
    }
    complete() {
        this.textToNumber();
        this.checkValues();
        this.onchangeCallback(this.value());
        this.inactivate();
    }
    handleKeyDown(e) {
        if (!this.isFocused || this.disabled)
            return;
        this.textToNumber();
        if (e.key === "Enter")
            this.complete();
        if (e.key === "Backspace") {
            if (this.textType == "Color" && this.text.length == 1)
                return;
            this.text = this.text.slice(0, -1);
            if (this.text.length == 0)
                this.text = "0";
        }
        else if (e.key.length === 1 && !e.ctrlKey) {
            const text = this.textType == "Color" ? e.key : e.key.replace(/[^0-9]/g, "");
            this.text += text;
        }
        if (e.key === '-') {
            if (this.textType !== 'Vector')
                return;
            this.text = new Number("-" + this.text).toString();
        }
        this.textToNumber();
        this.resetCursor();
    }
    textToNumber() {
        if (this.text == "-")
            this.text = "0";
        if (this.textType != "Color")
            this.text = new Number(this.text).toString();
    }
    checkValues() {
        if (this.textType == "Color") {
            this.text = this.text.substring(1);
            if (this.text.length < 6)
                this.text = this.text.padEnd(6, "a");
            if (this.text.length > 6)
                this.text = this.text.slice(0, 6);
            this.text = this.text.replaceAll(this.wrongColor(), "a");
            this.text = "#" + this.text;
        }
    }
    wrongColor() {
        return new RegExp(/([^0-9a-fA-F])/gi);
    }
    onchangeCallback = () => { };
    onchange(callback) {
        this.onchangeCallback = callback;
        return this;
    }
    resetCursor() {
        this.cursorVisible = true;
        if (this.cursorInterval)
            clearInterval(this.cursorInterval);
        this.cursorInterval = window.setInterval(() => {
            this.cursorVisible = !this.cursorVisible;
        }, 500);
    }
}
