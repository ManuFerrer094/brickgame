var nivelActual = 1;
var partidaIniciada = false; // Variable para controlar si la partida ha sido iniciada

function iniciarNuevoNivel() {
    brickRowCount++; // Aumenta el número de filas de ladrillos
    resetearPelotaYPaleta();
    crearLadrillos();
    
    // Detiene la animación y reinicia la partidaIniciada a false
    partidaIniciada = false;
    cancelAnimationFrame(animationId);
}

document.getElementById("startButton").addEventListener("click", function() {
    if (!partidaIniciada) { // Verifica si la partida ya está en curso
        partidaIniciada = true; // Marca la partida como iniciada
        draw(); // Llama a la función principal de dibujo y animación del juego
    }
});

document.getElementById("finishLevelButton").addEventListener("click", function() {
    if (partidaIniciada) { // Verifica si la partida está en curso
        // Destruye todos los ladrillos
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 0;
            }
        }
    }
});

