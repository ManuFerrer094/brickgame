var nivelActual = 1;
var partidaIniciada = false;

function collisionDetection() {
    var ladrillosRestantes = 0;

    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status !== 0) {
                ladrillosRestantes++;
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    if (b.status === NORMAL_BRICK) {
                        b.status = 0;
                        puntuacion++;
                    } else if (b.status === REINFORCED_BRICK) {
                        
                        if (b.hits === undefined) {
                            b.hits = 1;
                            b.color = "#CD853F";
                        } else {
                            b.status = 0;
                            puntuacion++;
                        }
                    }
                    if (puntuacion % 8 === 0) {
                        generatePowerUp(b.x, b.y, powerUps);
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

function mostrarButtonCanvas(texto) {
    var buttonCanvas = document.getElementById("buttonCanvas");  
      
    buttonCanvas.style.display = "block";
    drawButton(texto);
}

function initBricksForLevel(level) {
    var blueBrickCount = Math.floor((brickRowCount * brickColumnCount) / 5) * 4;

    var blueBrickProbability = blueBrickCount / (brickRowCount * brickColumnCount);

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
    bricks = initBricksForLevel(nivelActual);
    partidaIniciada = false;
    cancelAnimationFrame(animationId);
}
