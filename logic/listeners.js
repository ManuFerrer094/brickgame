// Agrega event listeners para los eventos de teclado y ratón
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

/**
 * Maneja el movimiento del ratón y de las teclas para controlar la paleta.
 * @param {MouseEvent} e - Objeto de evento del ratón.
 */
function movePaddle(e) {
    // Si se mueve con las teclas de flecha
    if (rightPressed || leftPressed) {
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
    }
    // Si se mueve con el ratón
    else if (e.type === "mousemove") {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
}

/**
 * Maneja el movimiento del ratón para controlar la paleta.
 * @param {MouseEvent} e - Objeto de evento del ratón.
 */
function mouseMoveHandler(e) {
    // Si se está moviendo con las teclas de flecha, no hace falta actualizar la posición con el ratón
    if (rightPressed || leftPressed) {
        return;
    }

    // Calcula la posición relativa del ratón en el lienzo
    var relativeX = e.clientX - canvas.offsetLeft;

    // Ajusta la posición de la paleta para seguir el movimiento del ratón,
    // asegurándose de que no se salga de los límites del canvas
    paddleX = Math.max(0, Math.min(relativeX - paddleWidth / 2, canvas.width - paddleWidth));
}

/**
 * Maneja el evento de tecla presionada para controlar el movimiento de la paleta hacia la derecha o izquierda.
 * @param {KeyboardEvent} e - Objeto de evento de teclado.
 */
function keyDownHandler(e) {
    // Verifica si la tecla presionada es la flecha derecha
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    // Verifica si la tecla presionada es la flecha izquierda
    else if (e.keyCode == 37) {
        leftPressed = true;
    }

    movePaddle(e);
}

/**
 * Maneja el evento de tecla liberada para detener el movimiento de la paleta.
 * @param {KeyboardEvent} e - Objeto de evento de teclado.
 */
function keyUpHandler(e) {
    // Verifica si la tecla liberada es la flecha derecha
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    // Verifica si la tecla liberada es la flecha izquierda
    else if (e.keyCode == 37) {
        leftPressed = false;
    }

    movePaddle(e);
}
