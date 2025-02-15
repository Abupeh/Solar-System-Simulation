"use strict";
canvas.addEventListener('mousemove', function (event) {
    // Get the mouse coordinates relative to the canvas
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    // Perform actions based on mouse movement, e.g., drawing
    ctx.fillRect(x, y, 5, 5); // Example: draw a small rectangle at mouse position
});
