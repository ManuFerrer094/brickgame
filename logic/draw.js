
function drawPowerUps() {
    for (var i = 0; i < powerUps.length; i++) {
        var powerUp = powerUps[i];
        ctx.beginPath();
        ctx.rect(powerUp.x, powerUp.y, powerUpWidth, powerUpHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
    }
}

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
        iniciarNuevoNivel(); 
    }
}

function resetearPelotaYPaleta() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
}

function drawPuntuacion() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Puntuación: " + puntuacion, 8, 20);
}

function drawVidas() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: " + vidas, canvas.width - 65, 20);
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#998877";
    ctx.fill();
    ctx.closePath();
}

/**
 * Dibuja la paleta en el lienzo.
 */
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

/**
 * Dibuja los ladrillos en el lienzo.
 */
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
                ctx.fillStyle = bricks[c][r].status === NORMAL_BRICK ? "#0095DD" : "#8B4513";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawPuntuacion();
    drawVidas();
    drawPowerUps();
    updatePowerUps();
    paddlePowerUpCollision();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            vidas--;
            if (!vidas) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    // Movimiento de la paleta
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Actualizar posición de la pelota
    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}
