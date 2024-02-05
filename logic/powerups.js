
/**
 * Genera un nuevo power-up y lo añade al arreglo de power-ups.
 * @param {number} x - Coordenada x donde se generará el power-up.
 * @param {number} y - Coordenada y donde se generará el power-up.
 * @param {array} powerUps - Arreglo que contiene la información de los power-ups.
 */
function generatePowerUp(x, y, powerUps) {
    var type = Math.floor(Math.random() * 3);
    powerUps.push({ x: x, y: y, type: type, activationTime: Date.now() });
}


/**
 * Actualiza la posición y el estado de los power-ups en el juego.
 * @param {array} powerUps - Arreglo que contiene la información de los power-ups.
 * @param {number} powerUpSpeed - Velocidad a la que se mueven los power-ups en el juego.
 * @param {number} powerUpEffectDuration - Duración del efecto activo de los power-ups.
 */
function updatePowerUps(powerUps, powerUpSpeed, powerUpEffectDuration) {
    for (var i = 0; i < powerUps.length; i++) {
        var powerUp = powerUps[i];
        powerUp.y += powerUpSpeed;
        if (Date.now() > powerUp.activationTime + powerUpEffectDuration) {
            powerUps.splice(i, 1);
            i--;
        }
    }
}

function paddlePowerUpCollision() {
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
                    }, 7000);
                    break;
                case 1:
                    dx *= 2;
                    dy *= 2;
                    setTimeout(function() {
                        dx /= 2;
                        dy /= 2;
                    }, 7000);
                    break;
                case 2:
                    paddleWidth -= 20;
                    setTimeout(function() {
                        paddleWidth += 20;
                    }, 7000);
                    break;
                default:
                    break;
            }

            powerUps.splice(i, 1);
            i--;
        }
    }
}

/**
 * Dibuja los power-ups en el lienzo.
 * @param {CanvasRenderingContext2D} ctx - Contexto del lienzo en el que se dibujarán los power-ups.
 * @param {array} powerUps - Arreglo que contiene la información de los power-ups.
 * @param {number} powerUpWidth - Ancho de cada power-up.
 * @param {number} powerUpHeight - Altura de cada power-up.
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