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

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status !== 0) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // Asignar colores diferentes según el tipo de ladrillo
                ctx.fillStyle = bricks[c][r].status === NORMAL_BRICK ? "#0095DD" : "#8B4513"; // Azul para normales, marrón para reforzados
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
