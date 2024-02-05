/**
 * Elemento canvas y su contexto.
 * @type {HTMLCanvasElement}
 */
var canvas = document.getElementById("myCanvas");

/**
 * Contexto 2D del lienzo.
 * @type {CanvasRenderingContext2D}
 */
var ctx = canvas.getContext("2d");

/**
 * Radio de la pelota.
 * @type {number}
 */
var ballRadius = 10;

/**
 * Posición inicial en el eje x de la pelota.
 * @type {number}
 */
var x = canvas.width / 2;

/**
 * Posición inicial en el eje y de la pelota.
 * @type {number}
 */
var y = canvas.height - 30;

/**
 * Velocidad de la pelota en el eje x.
 * @type {number}
 */
var dx = 2;

/**
 * Velocidad de la pelota en el eje y.
 * @type {number}
 */
var dy = -2;

/**
 * Ancho de la paleta.
 * @type {number}
 */
var paddleWidth = 75;

/**
 * Altura de la paleta.
 * @type {number}
 */
var paddleHeight = 10;

/**
 * Posición inicial en el eje x de la paleta.
 * @type {number}
 */
var paddleX = (canvas.width - paddleWidth) / 2;

/**
 * Indicador del estado de la tecla derecha.
 * @type {boolean}
 */
var rightPressed = false;

/**
 * Indicador del estado de la tecla izquierda.
 * @type {boolean}
 */
var leftPressed = false;

/**
 * Número de filas de ladrillos.
 * @type {number}
 */
var brickRowCount = 3;

/**
 * Número de columnas de ladrillos.
 * @type {number}
 */
var brickColumnCount = 5;

/**
 * Ancho de cada ladrillo.
 * @type {number}
 */
var brickWidth = 75;

/**
 * Altura de cada ladrillo.
 * @type {number}
 */
var brickHeight = 20;

/**
 * Espacio entre los ladrillos.
 * @type {number}
 */
var brickPadding = 10;

/**
 * Desplazamiento vertical inicial para los ladrillos.
 * @type {number}
 */
var brickOffsetTop = 30;

/**
 * Desplazamiento horizontal inicial para los ladrillos.
 * @type {number}
 */
var brickOffsetLeft = 30;

/**
 * Puntuación inicial del juego.
 * @type {number}
 */
var puntuacion = 0;

/**
 * Número de vidas iniciales del jugador.
 * @type {number}
 */
var vidas = 3;

/**
 * Matriz que almacena la información sobre los ladrillos.
 * @type {Array<Array<{ x: number, y: number, status: number }>>}
 */
var bricks = [];

// Inicialización de la matriz de ladrillos
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        // Cada ladrillo tiene una posición (x, y) y un estado (activo o inactivo)
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

/**
 * Arreglo que almacena los power-ups.
 * @type {Array<{ x: number, y: number, type: number, activationTime: number }>}
 */
var powerUps = [];

/**
 * Ancho de los power-ups.
 * @type {number}
 */
var powerUpWidth = 20;

/**
 * Altura de los power-ups.
 * @type {number}
 */
var powerUpHeight = 10;

/**
 * Velocidad de los power-ups.
 * @type {number}
 */
var powerUpSpeed = 2;

/**
 * Duración del efecto de los power-ups en milisegundos.
 * @type {number}
 */
var powerUpEffectDuration = 8000;
