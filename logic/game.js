/**
 * Variable global que representa el nivel actual del juego.
 * @type {number}
 */
var nivelActual = 1;

/**
 * Variable global que indica si la partida está iniciada o no.
 * @type {boolean}
 */
var partidaIniciada = false;

/**
 * Función para iniciar un nuevo nivel del juego.
 */
function iniciarNuevoNivel() {
    brickRowCount++;
    resetearPelotaYPaleta();
    crearLadrillos();
    
    partidaIniciada = false;
    cancelAnimationFrame(animationId);
}

/**
 * Event listener para el botón de iniciar partida.
 */
document.getElementById("startButton").addEventListener("click", function() {
    if (!partidaIniciada) { 
        partidaIniciada = true;
        draw();
    }
});

/**
 * Event listener para el botón de finalizar nivel.
 */
document.getElementById("finishLevelButton").addEventListener("click", function() {
    if (partidaIniciada) {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 0;
            }
        }
    }
});