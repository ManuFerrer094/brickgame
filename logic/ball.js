/**
 * Dibuja la bola en el lienzo.
 * @param {CanvasRenderingContext2D} ctx - Contexto del lienzo en el que se dibujará la bola.
 * @param {number} x - Coordenada x del centro de la bola.
 * @param {number} y - Coordenada y del centro de la bola.
 * @param {number} ballRadius - Radio de la bola.
 */
function drawBall(ctx, x, y, ballRadius) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}