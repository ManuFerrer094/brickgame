/**
 * Dibuja la paleta en el lienzo.
 */
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
}