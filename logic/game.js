var nivelActual = 1;
var partidaIniciada = false;

// Dibujar el botón "Jugar" en el canvas de botones
function drawButton() {
    var buttonCanvas = document.getElementById("buttonCanvas");
    var ctx = buttonCanvas.getContext("2d");
    
    // Dibujar el botón
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 50); // Coordenadas y tamaño del botón
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Jugar", 70, 85); // Texto del botón
}

// Llamar a la función para dibujar el botón cuando se cargue la página
window.onload = drawButton;

// Inicialización de ladrillos para cada nivel
function initBricksForLevel(level) {
    // Calcular la cantidad de ladrillos azules y marrones según la proporción deseada
    var blueBrickCount = Math.floor((brickRowCount * brickColumnCount) / 5) * 4;
    var brownBrickCount = (brickRowCount * brickColumnCount) - blueBrickCount;

    // Asignar las probabilidades de generación de ladrillos azules y marrones
    var blueBrickProbability = blueBrickCount / (brickRowCount * brickColumnCount);
    var brownBrickProbability = brownBrickCount / (brickRowCount * brickColumnCount);

    var bricks = [];
    var maxRows = Math.min(brickRowCount, 7);

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < maxRows; r++) {
            var brickType = Math.random() < blueBrickProbability ? NORMAL_BRICK : REINFORCED_BRICK;
            bricks[c][r] = { x: 0, y: 0, status: brickType };
        }
    }
    return bricks;
}

function iniciarNuevoNivel() {
    nivelActual++;
    brickRowCount++;
    resetearPelotaYPaleta();
    bricks = initBricksForLevel(nivelActual); // Inicializar ladrillos para el nuevo nivel
    partidaIniciada = false; // Marcar la partida como no iniciada
    cancelAnimationFrame(animationId); // Cancelar cualquier animación en curso
}

// Función para mostrar el canvas de botones con texto y botón de jugar
function mostrarButtonCanvas(texto) {
    var buttonCanvas = document.getElementById("buttonCanvas");
    var ctx = buttonCanvas.getContext("2d");
    
    // Mostrar el canvas
    buttonCanvas.style.display = "block";
    
    // Llamar a la función para dibujar el texto y el botón
    drawButton(ctx, texto);
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
