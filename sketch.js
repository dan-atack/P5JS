const map1 = new Map();
const player = new Player();
const economy = new Economy();
const menu = new Menu();
const infra = new Infrastructure();

// Switch for "game on" determines when to stop rendering the game/running the engine:
let gameOn = true;
let victory = false;      // Use to set the tone of the game over message

let gameTick = 0;         // Updates with every frame update(1/60th second) and resets every economy tick interval
let gameTicksElapsed = 0  // Amount of game tick intervals have elapsed; when this number matches the rescue countdown global constant, you win the game.

function setup() {
  const canvasWidth = WORLD_WIDTH * BLOCK_WIDTH + SIDEBAR_WIDTH;
  const canvasHeight = WORLD_HEIGHT * BLOCK_WIDTH;
  createCanvas(canvasWidth, canvasHeight);
  map1.renderTerrainColumns(smars1);
  player.render();
  background('#87CEEB');
  menu.render();
}

// Whenever the mouse is clicked, check:
function mousePressed() {
  // Was a resource tile clicked? (economy)
  economy.checkForResources(map1, mouseX, mouseY, player);
  // Was a building placed? (infra)
  infra.checkForClick(mouseX, mouseY, menu.buildingSelected, economy); // Infra needs to know which building and what money you gots
  // Was a menu button clicked? (menu)
  menu.checkForClick(mouseX, mouseY);
  // Deselect building production if insufficient resources remain:
  menu.checkIfJustPurchased(infra, economy);
  // Handle resets:
  if (!gameOn) {
    player.reset();
    economy.reset();
    infra.reset();
    menu.deselectBuilding();
    gameTick = 0;
    gameTicksElapsed = 0;
    gameOn = true;
  }
}

function checkForGameOver(economy) {
  if (economy.food < 0 || economy.air < 0) {
    // If food drops below zero, you lose bad boy
    gameOn = false;
  } else if (gameTicksElapsed >= RESCUE_COUNTDOWN_IN_TICKS) {
    // If sufficient time has elapsed and you haven't run out of food however, you win. Good job!
    gameOn = false;
    victory = true;
  }
}

function draw() {
  // Check for win/loss:
  checkForGameOver(economy);
  // If game is still going, advance ticker:
  if (gameOn) {
    gameTick ++;
    // If ticker is at interval, reset ticker and increase ticks elapsed counter
    if (gameTick >= ECONOMY_TICK_INTERVAL) {
      gameTicksElapsed ++;
      gameTick = 0;
    }
    background(0);
    map1.renderMap();
    menu.render();
    infra.renderBuildings();
    infra.handleProduction(economy);
    economy.advanceFoodDepletionTicker();
    economy.renderResourceDisplays();
    player.render();
    player.handleUpdates(map1, economy);
    // Show ETA until rescue (aka victory):
    text(`Rescue ETA: ${RESCUE_COUNTDOWN_IN_TICKS - gameTicksElapsed} Days`, 256, 8, 256, 128);
    // Building ghost follows cursor and 'snaps to' map grid if building is selected:
    if (menu.buildingSelected.name) {
      // Round mouse position to nearest grid location:
      const gridX = Math.floor(mouseX / BLOCK_WIDTH) * BLOCK_WIDTH;
      const gridY = Math.floor(mouseY / BLOCK_WIDTH) * BLOCK_WIDTH;
      const buildingWidth = menu.buildingSelected.width * BLOCK_WIDTH;
      const buildingHeight = menu.buildingSelected.height * BLOCK_WIDTH;
      fill(BRIGHT_GREEN);
      rect(gridX, gridY, buildingWidth, buildingHeight);
    }
  } else {
    // End of Game messages:
    textSize(36);
    if (victory) {
      fill(BRIGHT_GREEN);
      text('YOU HAVE BEEN RESCUED. HURRAY!!! (Click to play again)', 256, 128, 512, 256);
    } else {
      text(`YOUR COLONY HAS DIED OF ${economy.food < 0 ? 'STARVATION' : 'ASPHYXIATION'} ${RESCUE_COUNTDOWN_IN_TICKS - gameTicksElapsed} DAYS BEFORE BEING RESCUED. Click to load into a parellel universe and try again.`, 256, 128, 512, 512);
    }
  }
}
