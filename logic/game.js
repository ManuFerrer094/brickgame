var nivelActual = 1;
var partidaIniciada = false;

function iniciarNuevoNivel() {
    brickRowCount++;
    resetearPelotaYPaleta();
    crearLadrillos();
    
    partidaIniciada = false;
    cancelAnimationFrame(animationId);
}

document.getElementById("startButton").addEventListener("click", function() {
    if (!partidaIniciada) { 
        partidaIniciada = true;
        draw();
    }
});

document.getElementById("finishLevelButton").addEventListener("click", function() {
    if (partidaIniciada) {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 0;
            }
        }
    }
});

