/**
 * Dibuja los power-ups en el lienzo.
 * 
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibujan los power-ups.
 * @param {Array<{ x: number, y: number }>} powerUps - El array de objetos que representan los power-ups a dibujar.
 * @param {number} powerUpWidth - El ancho de los power-ups.
 * @param {number} powerUpHeight - La altura de los power-ups.
 */
function drawPowerUps(ctx, powerUps, powerUpWidth, powerUpHeight) {
    for (var i = 0; i < powerUps.length; i++) {
        var powerUp = powerUps[i];
        ctx.beginPath();
        ctx.rect(powerUp.x, powerUp.y, powerUpWidth, powerUpHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
    }
}

/**
 * Detecta colisiones entre la pelota y los ladrillos.
 * 
 * @param {number} brickColumnCount - El número de columnas de ladrillos.
 * @param {number} brickRowCount - El número de filas de ladrillos.
 * @param {number} brickWidth - El ancho de cada ladrillo.
 * @param {number} brickHeight - La altura de cada ladrillo.
 * @param {Array<Array<{ x: number, y: number, status: number }>>} bricks - La matriz que representa el estado de cada ladrillo.
 * @param {number} ladrillosRestantes - El número de ladrillos restantes.
 */
function collisionDetection() {
    var ladrillosRestantes = 0;

    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                ladrillosRestantes++;
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0;
                    puntuacion++;
                    if (puntuacion % 10 === 0) {
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

/**
 * Resetea la posición de la pelota y la paleta a sus valores iniciales.
 * 
 * @param {number} canvasWidth - El ancho del lienzo.
 * @param {number} canvasHeight - La altura del lienzo.
 * @param {number} paddleWidth - El ancho de la paleta.
 * @param {number} paddleHeight - La altura de la paleta.
 * @param {number} ballRadius - El radio de la pelota.
 */
function resetearPelotaYPaleta(canvasWidth, canvasHeight, paddleWidth, paddleHeight, ballRadius) {
    x = canvasWidth / 2;
    y = canvasHeight - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvasWidth - paddleWidth) / 2;
}

/**
 * Crea los ladrillos para el nivel actual.
 * 
 * @param {number} brickColumnCount - El número de columnas de ladrillos.
 * @param {number} brickRowCount - El número de filas de ladrillos.
 * @param {Array<Array<{ x: number, y: number, status: number }>>} bricks - La matriz que representa el estado de cada ladrillo.
 */
function crearLadrillos(brickColumnCount, brickRowCount, bricks) {
    bricks = [];
    var maxFilas = Math.min(brickRowCount, 7);

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < maxFilas; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

/**
 * Dibuja la puntuación actual en el lienzo.
 * 
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibuja la puntuación.
 * @param {number} puntuacion - La puntuación actual del jugador.
 */
function drawPuntuacion(ctx, puntuacion) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Puntuación: " + puntuacion, 8, 20);
}

/**
 * Dibuja el número de vidas restantes en el lienzo.
 * 
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibujan las vidas restantes.
 * @param {number} vidas - El número de vidas restantes del jugador.
 * @param {number} canvasWidth - El ancho del lienzo.
 */
function drawVidas(ctx, vidas, canvasWidth) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: " + vidas, canvasWidth - 65, 20);
}

/**
 * Dibuja la pelota en el lienzo.
 * 
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibuja la pelota.
 * @param {number} x - La coordenada x del centro de la pelota.
 * @param {number} y - La coordenada y del centro de la pelota.
 * @param {number} ballRadius - El radio de la pelota.
 */
function drawBall(ctx, x, y, ballRadius) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

/**
 * Dibuja la paleta en el lienzo.
 * 
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibuja la paleta.
 * @param {number} paddleX - La coordenada x del borde izquierdo de la paleta.
 * @param {number} paddleHeight - La altura de la paleta.
 * @param {number} paddleWidth - El ancho de la paleta.
 * @param {number} canvasHeight - La altura del lienzo.
 */
function drawPaddle(ctx, paddleX, paddleHeight, paddleWidth, canvasHeight) {
    ctx.beginPath();
    ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

/**
 * Dibuja los ladrillos en el lienzo.
 * 
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

/**
 * Función principal de dibujo y animación del juego.
 * 
 * @param {CanvasRenderingContext2D} ctx - El contexto del lienzo en el que se dibuja el juego.
 * @param {number} canvasWidth - El ancho del lienzo.
 * @param {number} canvasHeight - La altura del lienzo.
 * @param {number} ballRadius - El radio de la pelota.
 * @param {number} paddleX - La posición horizontal de la paleta.
 * @param {number} paddleWidth - El ancho de la paleta.
 * @param {number} paddleHeight - La altura de la paleta.
 * @param {number} brickColumnCount - El número de columnas de ladrillos.
 * @param {number} brickRowCount - El número de filas de ladrillos.
 * @param {number} brickWidth - El ancho de cada ladrillo.
 * @param {number} brickHeight - La altura de cada ladrillo.
 * @param {number} brickPadding - El espacio entre los ladrillos.
 * @param {number} brickOffsetLeft - El desplazamiento horizontal inicial para los ladrillos.
 * @param {number} brickOffsetTop - El desplazamiento vertical inicial para los ladrillos.
 * @param {Array<Array<{ x: number, y: number, status: number }>>} bricks - La matriz que representa el estado de cada ladrillo.
 * @param {number} x - La posición x de la pelota.
 * @param {number} y - La posición y de la pelota.
 * @param {number} dx - El desplazamiento horizontal de la pelota.
 * @param {number} dy - El desplazamiento vertical de la pelota.
 * @param {boolean} rightPressed - Indica si la tecla derecha está presionada.
 * @param {boolean} leftPressed - Indica si la tecla izquierda está presionada.
 * @param {number} vidas - El número de vidas del jugador.
 * @param {number} puntuacion - La puntuación del jugador.
 */
function draw(ctx, canvasWidth, canvasHeight, ballRadius, paddleX, paddleWidth, paddleHeight, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, bricks, x, y, dx, dy, rightPressed, leftPressed, vidas, puntuacion) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBricks(ctx, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, bricks);
    drawBall(ctx, x, y, ballRadius);
    drawPaddle(ctx, paddleX, paddleHeight, paddleWidth, canvasHeight);
    collisionDetection(ctx, canvasWidth, canvasHeight, ballRadius, paddleX, paddleWidth, paddleHeight, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, bricks, x, y, dx, dy, vidas, puntuacion);
    drawPuntuacion(ctx, puntuacion);
    drawVidas(ctx, vidas, canvasWidth);
    drawPowerUps(ctx);
    updatePowerUps();
    paddlePowerUpCollision();

    if (x + dx > canvasWidth - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvasHeight - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            vidas--;
            if (!vidas) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvasWidth / 2;
                y = canvasHeight - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvasWidth - paddleWidth) / 2;
            }
        }
    }

    // Movimiento de la paleta
    if (rightPressed && paddleX < canvasWidth - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Actualizar posición de la pelota
    x += dx;
    y += dy;

    requestAnimationFrame(function() {
        draw(ctx, canvasWidth, canvasHeight, ballRadius, paddleX, paddleWidth, paddleHeight, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, bricks, x, y, dx, dy, rightPressed, leftPressed, vidas, puntuacion);
    });
}
