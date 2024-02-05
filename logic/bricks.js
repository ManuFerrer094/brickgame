// Definir los tipos de ladrillos
const NORMAL_BRICK = 1;
const REINFORCED_BRICK = 2;

// Crear una matriz para almacenar los ladrillos y sus estados
var bricks = [];

// Inicializar los ladrillos, asignando un tipo aleatorio a cada uno
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: Math.random() < 0.5 ? NORMAL_BRICK : REINFORCED_BRICK };
    }
}

/**
 * Dibuja los ladrillos en el lienzo.
 * @param {CanvasRenderingContext2D} ctx - Contexto del lienzo en el que se dibujarán los ladrillos.
 * @param {number} brickWidth - Ancho de cada ladrillo.
 * @param {number} brickHeight - Altura de cada ladrillo.
 * @param {number} brickPadding - Espacio entre ladrillos.
 * @param {number} brickOffsetTop - Margen superior para la primera fila de ladrillos.
 * @param {number} brickOffsetLeft - Margen izquierdo para la primera columna de ladrillos.
 * @param {array} bricks - Matriz que representa el estado de los ladrillos en el juego.
 * @param {number} brickRowCount - Número de filas de ladrillos.
 * @param {number} brickColumnCount - Número de columnas de ladrillos.
 */
function drawBricks(ctx, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft, bricks, brickRowCount, brickColumnCount) {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status !== 0) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].status === NORMAL_BRICK ? "#0095DD" : "#8C5668";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
