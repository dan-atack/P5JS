const map1 = new Map();
const player = new Player();
const economy = new Economy();
const menu = new Menu();

function setup() {
  const canvasWidth = WORLD_WIDTH * BLOCK_WIDTH + SIDEBAR_WIDTH;
  const canvasHeight = WORLD_HEIGHT * BLOCK_WIDTH;
  createCanvas(canvasWidth, canvasHeight);
  map1.renderInitialMap();
  player.render();
  background('#87CEEB');
  menu.render();
}

function mousePressed() {
  economy.checkForResources(map1, mouseX, mouseY);
  menu.checkForClick(mouseX, mouseY);
}

function draw() {
  background(0);
  map1.renderMap();
  player.render();
  player.handleUpdates();
  menu.render();
  fill('#FCD63B');
  textSize(24);
  fill(BLUE_ICE);
  text(`Ice: ${economy.ice}`, 0, 0, 256, 128);
  fill(RED_ROCK);
  text(`Sand: ${economy.sand}`, 0, 32, 256, 128);
  fill(MINERAL_GRAY);
  text(`Rock: ${economy.rock}`, 0, 64, 256, 128);
  fill(YELLOW_SAND);
  text(`Money: ${economy.money}`, 0, 96, 256, 128);
  fill(FOOD_GREEN);
  text(`Food: ${economy.food}`, 0, 128, 256, 128);
  economy.advanceFoodDepletionTicker();
  // Building ghost follows cursor and 'snaps to' map grid if building is selected:
  if (menu.buildingSelected) {
    // Round mouse position to nearest grid location:
    const gridX = Math.floor(mouseX / BLOCK_WIDTH) * BLOCK_WIDTH;
    const gridY = Math.floor(mouseY / BLOCK_WIDTH) * BLOCK_WIDTH;
    rect(gridX, gridY, BLOCK_WIDTH * 2, BLOCK_WIDTH * 2);
  }
}
