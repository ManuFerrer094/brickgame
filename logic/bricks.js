/**
 * Dibuja los ladrillos en el lienzo.
 */
function drawBricks() {
    // Itera sobre las columnas de ladrillos
    for (c = 0; c < brickColumnCount; c++) {
        // Itera sobre las filas de ladrillos
        for (r = 0; r < brickRowCount; r++) {
            // Verifica si el ladrillo está activo (status igual a 1)
            if (bricks[c][r].status == 1) {
                // Calcula las coordenadas X e Y del ladrillo en el lienzo
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

                // Asigna las coordenadas X e Y al objeto ladrillo
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                // Inicia un nuevo trazo
                ctx.beginPath();

                // Dibuja un rectángulo para representar el ladrillo
                ctx.rect(brickX, brickY, brickWidth, brickHeight);

                // Establece el color de relleno para el ladrillo
                ctx.fillStyle = "#0095DD";

                // Rellena el rectángulo con el color especificado
                ctx.fill();

                // Cierra el trazo
                ctx.closePath();
            }
        }
    }
}
