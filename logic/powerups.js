/**
 * Genera un nuevo power-up en la posición especificada.
 * @param {number} x - La coordenada x donde se generará el power-up.
 * @param {number} y - La coordenada y donde se generará el power-up.
 */
function generatePowerUp(x, y) {
    var type = Math.floor(Math.random() * 3); // Genera un número aleatorio entre 0 y 2 para determinar el tipo de power-up
    powerUps.push({ x: x, y: y, type: type, activationTime: Date.now() });
}

/**
 * Actualiza la posición de los power-ups en función de su velocidad y verifica si han expirado sus efectos.
 * @param {number} powerUpSpeed - La velocidad a la que se mueven los power-ups en el eje y.
 * @param {number} powerUpEffectDuration - La duración en milisegundos del efecto de los power-ups.
 */
function updatePowerUps(powerUpSpeed, powerUpEffectDuration) {
    for (var i = 0; i < powerUps.length; i++) {
        var powerUp = powerUps[i];
        powerUp.y += powerUpSpeed;
        if (Date.now() > powerUp.activationTime + powerUpEffectDuration) {
            powerUps.splice(i, 1);
            i--;
        }
    }
}


/**
 * Detecta y maneja las colisiones entre la paleta y los power-ups, aplicando los efectos correspondientes.
 * @param {number} paddleX - La posición horizontal actual de la paleta.
 * @param {number} paddleWidth - El ancho actual de la paleta.
 * @param {number} paddleHeight - La altura de la paleta.
 * @param {number} dx - La velocidad horizontal actual de la bola.
 * @param {number} dy - La velocidad vertical actual de la bola.
 */
function paddlePowerUpCollision(paddleX, paddleWidth, paddleHeight, dx, dy) {
    for (var i = 0; i < powerUps.length; i++) {
        var powerUp = powerUps[i];
        if (
            powerUp.x < paddleX + paddleWidth &&
            powerUp.x + powerUpWidth > paddleX &&
            powerUp.y < canvas.height &&
            powerUp.y + powerUpHeight > canvas.height - paddleHeight
        ) {
            switch (powerUp.type) {
                case 0:
                    paddleWidth += 20;
                    setTimeout(function() {
                        paddleWidth -= 20;
                    }, 10000);
                    break;
                case 1:
                    dx *= 2;
                    dy *= 2;
                    setTimeout(function() {
                        dx /= 2;
                        dy /= 2;
                    }, 10000);
                    break;
                case 2:
                    break;
                default:
                    break;
            }

            powerUps.splice(i, 1);
            i--;
        }
    }
}