
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

// Función para dibujar el botón "Jugar" en el canvas de botones con texto
function drawButton(texto) {
    var buttonCanvas = document.getElementById("buttonCanvas");
    var ctx = buttonCanvas.getContext("2d");

    // Limpiar el canvas
    ctx.clearRect(0, 0, buttonCanvas.width, buttonCanvas.height);

    // Dibujar el texto
    ctx.fillStyle = "black";
    ctx.font = "bold 24px Arial";
    ctx.fillText(texto, 50, 50); // Posición del texto
    
    // Dibujar el botón
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 50); // Coordenadas y tamaño del botón
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Jugar", 70, 85); // Texto del botón
}

// Llamar a la función para dibujar el botón cuando se cargue la página
window.onload = function() {
    drawButton("¿Quieres jugar?"); // Puedes cambiar el texto aquí
};

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
