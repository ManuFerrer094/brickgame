/**
 * Dibuja los ladrillos en el lienzo.
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibujan los ladrillos.
 * @param {number} brickColumnCount - El número de columnas de ladrillos.
 * @param {number} brickRowCount - El número de filas de ladrillos.
 * @param {number} brickWidth - El ancho de cada ladrillo.
 * @param {number} brickHeight - La altura de cada ladrillo.
 * @param {number} brickPadding - El espacio entre los ladrillos.
 * @param {number} brickOffsetLeft - El desplazamiento horizontal inicial para los ladrillos.
 * @param {number} brickOffsetTop - El desplazamiento vertical inicial para los ladrillos.
 * @param {Array<Array<{ x: number, y: number, status: number }>>} bricks - La matriz que representa el estado de cada ladrillo.
 */
function drawBricks(ctx, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, bricks) {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
