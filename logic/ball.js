/**
 * Dibuja la pelota en el lienzo.
 * @param {number} x - La coordenada x del centro de la pelota.
 * @param {number} y - La coordenada y del centro de la pelota.
 * @param {number} radius - El radio de la pelota.
 * @param {string} color - El color de la pelota en formato hexadecimal.
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibuja la pelota.
 */
function drawBall(x, y, radius, color, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
