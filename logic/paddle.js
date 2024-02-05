/**
 * Dibuja la paleta en el lienzo.
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibuja la paleta.
 * @param {number} paddleX - La posición horizontal de la paleta.
 * @param {number} paddleHeight - La altura de la paleta.
 * @param {number} paddleWidth - El ancho de la paleta.
 * @param {number} canvasHeight - La altura del lienzo.
 */
function drawPaddle(ctx, paddleX, paddleHeight, paddleWidth, canvasHeight) {
    ctx.beginPath();
    ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
