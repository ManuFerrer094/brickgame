/**
 * Dibuja la pelota en el lienzo.
 */
function drawBall() {
    // Inicia un nuevo trazo
    ctx.beginPath();

    // Dibuja un círculo para representar la pelota
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);

    // Establece el color de relleno para la pelota
    ctx.fillStyle = "#0095DD";

    // Rellena el círculo con el color especificado
    ctx.fill();

    // Cierra el trazo
    ctx.closePath();
}
