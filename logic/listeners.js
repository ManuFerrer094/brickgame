/**
 * Event listener para el evento de presionar una tecla.
 * @param {KeyboardEvent} e - El evento de teclado.
 */
document.addEventListener("keydown", keyDownHandler, false);

/**
 * Event listener para el evento de soltar una tecla.
 * @param {KeyboardEvent} e - El evento de teclado.
 */
document.addEventListener("keyup", keyUpHandler, false);

/**
 * Event listener para el evento de mover el mouse.
 * @param {MouseEvent} e - El evento de mouse.
 */
document.addEventListener("mousemove", mouseMoveHandler, false);

/**
 * Función para mover la paleta según el evento del teclado o del mouse.
 * @param {Event} e - El evento que desencadenó el movimiento de la paleta.
 */
function movePaddle(e) {
    if (rightPressed || leftPressed) {
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
    }
    else if (e.type === "mousemove") {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
}

/**
 * Event listener para el movimiento del mouse.
 * @param {MouseEvent} e - El evento de mouse.
 */
function mouseMoveHandler(e) {
    if (rightPressed || leftPressed) {
        return;
    }

    var relativeX = e.clientX - canvas.offsetLeft;

    paddleX = Math.max(0, Math.min(relativeX - paddleWidth / 2, canvas.width - paddleWidth));
}

/**
 * Event listener para el evento de presionar una tecla.
 * @param {KeyboardEvent} e - El evento de teclado.
 */
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }

    movePaddle(e);
}

/**
 * Event listener para el evento de soltar una tecla.
 * @param {KeyboardEvent} e - El evento de teclado.
 */
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }

    movePaddle(e);
}

// Agregar evento de clic al botón "Jugar"
document.getElementById("buttonCanvas").addEventListener("click", function(event) {
    var rect = this.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    // Verificar si se hizo clic dentro del área del botón
    if (mouseX >= 50 && mouseX <= 150 && mouseY >= 50 && mouseY <= 100) {
        if (!partidaIniciada) { 
            partidaIniciada = true;
            draw();
            document.getElementById("buttonCanvas").style.display = "none"; // Ocultar el canvas de botones al iniciar el juego
        }
    }
});

// Agregar evento de clic al botón "Acabar nivel (SOLO DESARROLLO)"
document.getElementById("finishLevelButton").addEventListener("click", function() {
    if (partidaIniciada) {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 0;
            }
        }
    }
});
