let rectSize = 100;
const map1 = new Map();
const player = new Player();

function setup() {
  const canvasWidth = WORLD_WIDTH * BLOCK_WIDTH;
  const canvasHeight = WORLD_HEIGHT * BLOCK_WIDTH;
  createCanvas(canvasWidth, canvasHeight);
  map1.renderInitialMap();
  player.render();
  background('#87CEEB');
}

function mousePressed() {
  rectSize += 50;
}

function draw() {
  background(0);
  map1.renderInitialMap();
  player.render();
  player.handleUpdates();
  fill('#FCD63B');
  rect(100,100,rectSize,50);
  rectSize --;
}
