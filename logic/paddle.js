/**
 * Dibuja la paleta en el lienzo.
 */
function drawPaddle() {
    // Inicia un nuevo trazo
    ctx.beginPath();

    // Dibuja un rectángulo que representa la paleta
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);

    // Establece el color de relleno para la paleta
    ctx.fillStyle = "#0095DD";

    // Rellena el rectángulo con el color especificado
    ctx.fill();

    // Cierra el trazo
    ctx.closePath();
}
