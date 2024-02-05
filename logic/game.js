var nivelActual = 1;
var partidaIniciada = false;

// Inicialización de ladrillos para cada nivel
function initBricksForLevel(level) {
    // Calcular la cantidad de ladrillos azules y marrones según la proporción deseada
    var blueBrickCount = Math.floor((brickRowCount * brickColumnCount) / 5) * 4;
    var brownBrickCount = (brickRowCount * brickColumnCount) - blueBrickCount;

    // Asignar las probabilidades de generación de ladrillos azules y marrones
    var blueBrickProbability = blueBrickCount / (brickRowCount * brickColumnCount);
    var brownBrickProbability = brownBrickCount / (brickRowCount * brickColumnCount);

    var bricks = [];
    var maxRows = Math.min(brickRowCount, 7);

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < maxRows; r++) {
            var brickType = Math.random() < blueBrickProbability ? NORMAL_BRICK : REINFORCED_BRICK;
            bricks[c][r] = { x: 0, y: 0, status: brickType };
        }
    }
    return bricks;
}

function iniciarNuevoNivel() {
    nivelActual++; // Incrementar el nivel actual
    brickRowCount++; // Incrementar el número de filas de ladrillos
    resetearPelotaYPaleta(); // Restablecer la posición de la pelota y la paleta
    bricks = initBricksForLevel(nivelActual); // Inicializar ladrillos para el nuevo nivel
    partidaIniciada = false; // Marcar la partida como no iniciada
    cancelAnimationFrame(animationId); // Cancelar cualquier animación en curso
}

document.getElementById("startButton").addEventListener("click", function() {
    if (!partidaIniciada) { 
        partidaIniciada = true;
        draw();
    }
});

document.getElementById("finishLevelButton").addEventListener("click", function() {
    if (partidaIniciada) {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 0;
            }
        }
    }
});
