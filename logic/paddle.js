/**
 * Dibuja la paleta en el lienzo.
 * @param {CanvasRenderingContext2D} ctx - Contexto del lienzo en el que se dibujará la paleta.
 * @param {number} paddleX - Coordenada x de la paleta.
 * @param {number} paddleHeight - Altura de la paleta.
 * @param {number} paddleWidth - Ancho de la paleta.
 */
function drawPaddle(ctx, paddleX, paddleHeight, paddleWidth) {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
}