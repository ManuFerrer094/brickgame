
function generatePowerUp() {
    var type = Math.floor(Math.random() * 3);
    powerUps.push({ x: x, y: y, type: type, activationTime: Date.now() });
}


function updatePowerUps() {
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