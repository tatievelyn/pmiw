// URL video explicativo=  https://youtu.be/eu7S9njocRw
// alumno: montenegro evelyn
//comision 5


let imagen;
let cant = 10; // Número de casilleros por fila y columna
let tam;
let ellipseSize = 17;
let alternateColorBW = true; // Comienza en blanco y negro
let alternateColorRA = false;
let reset = false;
let colorMode = 0;
let randomColors = false;

function preload() {
  imagen = loadImage('data/imagen.png');
}

function setup() {
  createCanvas(800, 400);
  tam = width / 2 / cant; // Tamaño de cada casillero
  noLoop(); // Dibuja solo una vez
}

function draw() {
  if (reset) {
    resetProgram();
    reset = false;
  }
  
  // Dibuja la imagen en la mitad izquierda
  image(imagen, 0, 0, width / 2, height);
  
  // Dibuja la recreación en la mitad derecha
  drawGrid(imagen, cant, tam, ellipseSize, alternateColorBW, alternateColorRA, colorMode, randomColors);
}

function mousePressed() {
  // Alterna entre blanco y negro y colores aleatorios
  if (!randomColors) {
    alternateColorBW = !alternateColorBW;
    alternateColorRA = false;
  }
  redraw();
}

function keyPressed() {
  if (key === 'T' || key === 't') {
    // Alterna entre rojo y azul
    alternateColorRA = !alternateColorRA;
    alternateColorBW = false;
    randomColors = false;
  } else if (key === 'C' || key === 'c') {
    // Activa colores aleatorios
    alternateColorRA = false;
    alternateColorBW = false;
    randomColors = true;
  } else if (key === ' ') {
    // Reinicia el programa
    reset = true;
  }
  redraw();
}

function resetProgram() {
  alternateColorBW = true; // Reiniciar a blanco y negro
  alternateColorRA = false;
  colorMode = 0;
  randomColors = false;
  ellipseSize = 17;
  redraw();
}

function drawGrid(img, cant, tam, ellipseSize, altBW, altRA, mode, randColors) {
  for (let i = 0; i < cant; i++) {
    for (let j = 0; j < cant; j++) {
      let x = i * tam + width / 2; // Coloca la cuadrícula en la mitad derecha
      let y = j * tam;

      // Determinar los colores alternos
      let isEven = (i + j) % 2 === 0;
      let squareColor;
      let ellipseColor;

      if (randColors) {
        // Colores aleatorios
        squareColor = color(random(255), random(255), random(255));
        ellipseColor = color(random(255), random(255), random(255));
      } else if (altBW) {
        // Blanco y negro alternados
        squareColor = isEven ? color(255) : color(0);
        ellipseColor = isEven ? color(0) : color(255);
      } else if (altRA) {
        // Rojo y azul alternados
        squareColor = isEven ? color(255, 0, 0) : color(0, 0, 255);
        ellipseColor = isEven ? color(0, 0, 255) : color(255, 0, 0);
      } else if (mode === 1) {
        // Modo 1: Colores de la imagen
        let imgColor = img.get(i * tam + tam / 2, j * tam + tam / 2);
        squareColor = imgColor;
        ellipseColor = imgColor.levels[0] > 128 ? color(0) : color(255);
      } else if (mode === 2) {
        // Modo 2: Solo blanco y negro
        squareColor = isEven ? color(255) : color(0);
        ellipseColor = isEven ? color(0) : color(255);
      } else {
        // Modo por defecto blanco y negro
        squareColor = isEven ? color(255) : color(0);
        ellipseColor = isEven ? color(0) : color(255);
      }

      // Dibuja el cuadrado de fondo
      stroke(0);
      fill(squareColor);
      rect(x, y, tam, tam);

      // Dibuja la elipse en el centro del cuadrado
      noStroke();
      fill(ellipseColor);
      ellipse(x + tam / 2, y + tam / 2, ellipseSize, ellipseSize);
    }
  }
}
