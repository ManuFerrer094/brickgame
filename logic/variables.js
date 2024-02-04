// Obtener el elemento canvas y su contexto
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Tamaño de la pelota
var ballRadius = 10;

// Posición inicial de la pelota
var x = canvas.width / 2;
var y = canvas.height - 30;

// Velocidad de la pelota en las direcciones x e y
var dx = 2;
var dy = -2;

// Dimensiones de la paleta
var paddleHeight = 10;
var paddleWidth = 75;

// Posición inicial de la paleta
var paddleX = (canvas.width - paddleWidth) / 2;

// Estados de las teclas de dirección
var rightPressed = false;
var leftPressed = false;

// Configuración de los ladrillos
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Puntuación y vidas iniciales
var puntuacion = 0;
var vidas = 3;

// Matriz para almacenar información sobre los ladrillos
var bricks = [];

// Inicializar la matriz de ladrillos
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        // Cada ladrillo tiene una posición (x, y) y un estado (activo o inactivo)
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
