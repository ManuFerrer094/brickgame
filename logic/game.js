var nivelActual = 1;
var partidaIniciada = false;

function collisionDetection() {
    var ladrillosRestantes = 0;

    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status !== 0) { // Verificar si el ladrillo está activo (no destruido)
                ladrillosRestantes++;
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    if (b.status === NORMAL_BRICK) {
                        b.status = 0; // Si es un ladrillo normal, se destruye de inmediato
                        puntuacion++; // Incrementar la puntuación al destruir un ladrillo
                    } else if (b.status === REINFORCED_BRICK) {
                        // Si es un ladrillo reforzado, se reduce su resistencia
                        if (b.hits === undefined) {
                            // Si es el primer golpe, cambia su color a marrón claro
                            b.hits = 1;
                            b.color = "#CD853F"; // Marrón claro
                        } else {
                            // Si es el segundo golpe, destruye el ladrillo
                            b.status = 0;
                            puntuacion++; // Incrementar la puntuación al destruir un ladrillo
                        }
                    }
                    if (puntuacion % 8 === 0) {
                        generatePowerUp(b.x, b.y);
                    }
                }
            }
        }
    }

    if (ladrillosRestantes == 0) {
        mostrarButtonCanvas("Enhorabuena, ¿Seguir jugando?");
        iniciarNuevoNivel(); 
    }
}

// Función para mostrar el canvas de botones con texto y botón de jugar
function mostrarButtonCanvas(texto) {
    var buttonCanvas = document.getElementById("buttonCanvas");
    var ctx = buttonCanvas.getContext("2d");
    
    // Mostrar el canvas
    buttonCanvas.style.display = "block";
    
    // Llamar a la función para dibujar el texto y el botón
    drawButton(texto);
}

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

function resetearPelotaYPaleta() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
}

function iniciarNuevoNivel() {
    nivelActual++;
    brickRowCount++;
    resetearPelotaYPaleta();
    bricks = initBricksForLevel(nivelActual); // Inicializar ladrillos para el nuevo nivel
    partidaIniciada = false; // Marcar la partida como no iniciada
    cancelAnimationFrame(animationId); // Cancelar cualquier animación en curso
}
