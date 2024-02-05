
/**
 * Dibuja la puntuación en el lienzo.
 * @param {CanvasRenderingContext2D} ctx - Contexto del lienzo en el que se dibujará la puntuación.
 * @param {number} puntuacion - Puntuación actual del jugador.
 */
function drawPuntuacion(ctx, puntuacion) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Puntuación: " + puntuacion, 8, 20);
}

/**
 * Dibuja las vidas restantes en el lienzo.
 * @param {CanvasRenderingContext2D} ctx - Contexto del lienzo en el que se dibujarán las vidas.
 * @param {number} vidas - Cantidad de vidas restantes del jugador.
 */
function drawVidas(ctx, vidas) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: " + vidas, canvas.width - 65, 20);
}

function drawButton(texto) {
    var buttonCanvas = document.getElementById("buttonCanvas");
    var ctx = buttonCanvas.getContext("2d");

    ctx.clearRect(0, 0, buttonCanvas.width, buttonCanvas.height);

    ctx.fillStyle = "black";
    ctx.font = "bold 24px Arial";
    ctx.fillText(texto, 50, 50);
    
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 50);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Jugar", 70, 85);
}

window.onload = function() {
    drawButton("¿Quieres jugar?");
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks(ctx, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft, bricks, brickRowCount, brickColumnCount);
    drawBall(ctx, x, y, ballRadius);
    drawPaddle(ctx, paddleX, paddleHeight, paddleWidth);
    collisionDetection();
    drawPuntuacion(ctx, puntuacion);
    drawVidas(ctx, vidas);
    drawPowerUps(ctx, powerUps, powerUpWidth, powerUpHeight);
    updatePowerUps(powerUps, powerUpSpeed, powerUpEffectDuration);
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
