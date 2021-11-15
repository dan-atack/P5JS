class Economy {
    constructor () {
        this.ice = 0;
        this.sand = 0;
        this.rock = 0;
        this.glass = 0;     // One of the two basic 'refined' resources, made from sand
        this.metal = 0;     // The other 'refined' resource, made from rock
        this.cO2 = 0;       // consumed by greenhouse to produce food
        this.power = 100;     // Initially at least, power will just be another thing you can produce, stockpile and spend.
        this.food = 100;    // goal of the game is to make more of this
        this.air = 100;     // GIVE DESE PEOPLE EAEAIR!!!
        this.lastTickStockpiles = { // Keep track of the previous values for all resources to establish rates of change:
            ice: [0, 0],    // Values are tuples; first is previous value, second is diff from previous
            sand: [0, 0], 
            rock: [0, 0],
            glass: [0, 0],
            metal: [0, 0],
            cO2: [0, 0], 
            power: [100, 0], 
            food: [181, -1],    // Make sure any initial values (plus initial change rates) and change rates are reflected here too
            air: [181, -1],
        }
        this.foodDepletionTick = 0; // Food is reduced by one unit whenever the depletion ticker hits zero
    }

    // This can also be used to reduce a resource count by 'adding a negative'
    addResource(resource, amount) {
        this[resource] += amount;
    }

    // loop through the blocks in the map to match to a mouse position
    checkForResources(map, mouseX, mouseY, player) {
        map.columns.forEach((column, idx) => {
            column.forEach((block) => {
                // Only allow mining to occur if player is sufficiently close:
                const roverInRange = block.checkForRoverDistance(player);
                // If mouse y = block y is the top of the block, mouse y + block width = bottom of block
                const yMatch = (mouseY >= block.y && mouseY < block.y + BLOCK_WIDTH);
                const xMatch = (mouseX >= block.x && mouseX < block.x + BLOCK_WIDTH);
                if (yMatch && xMatch && roverInRange) {
                    // If a block is clicked and the rover is in range, mine it:
                    this.addResource(block.resourceName, 2);    // TODO: Quantity extracted should be a block property and should vary
                    block.incrementClicks()                 // Keep track of how many times a block has been exploited
                    const filteredColumn = column.filter((unit) => unit.timesClicked < unit.maxClicks);
                    map.columns[idx] = filteredColumn;  // Replace column with 'filtered' column to remove blocks that are used up
                }
            })
        });
      }

    // Until we add a 'population' class, this function handles all deductions that aren't related to production (food and air)
    advanceFoodDepletionTicker() {
        // If ticker is not full, advance it by one:
        if (this.foodDepletionTick < ECONOMY_TICK_INTERVAL) {
            this.foodDepletionTick ++;
        } else {
            // If ticker is full, reset it and subtract one food
            this.foodDepletionTick = 0;
            this.food --;
            this.air --;
        }
    }

    // Display resource stockpile amounts on the main screen
    renderResourceDisplays() {
        // NOTE: For stockpile values and rates of change to align, ensure this list follows the sequence in the lastTickStockpiles object
        fill('#FCD63B');
        textSize(24);
        // Raw resources
        fill(BLUE_ICE);
        text(`Ice: ${this.ice}`, 0, 0, 256, 128);
        fill(YELLOW_SAND);
        text(`Sand: ${this.sand}`, 0, 32, 256, 128);
        fill(RED_ROCK);
        text(`Rock: ${this.rock}`, 0, 64, 256, 128);
        // Refined resources
        fill(GLASS_FACTORY_BLUE);
        text(`Glass: ${this.glass}`, 0, 96, 256, 128);
        fill(MINERAL_GRAY);
        text(`Metal: ${this.metal}`, 0, 128, 256, 128);
        // Renewable/Harvestable resources
        fill(SIDEBAR_GRAY);
        text(`CO2: ${this.cO2}`, 0, 160, 256, 128);
        fill(POWER_YELLOW);
        text(`Power: ${this.power}`, 0, 192, 256, 128)
        // Colonist provisions
        fill(FOOD_GREEN);
        text(`Food: ${this.food}`, 0, 224, 256, 128);
        fill(AIRY_GRAY);
        text(`Air: ${this.air}`, 0, 256, 256, 128);
        this.renderProductionRates();
    }

    // This goes next to the economy's resource stockpile displays on the main UI:
    renderProductionRates() {
        // Calculate diff by subtracting last tick's stockpile from the current one and printing the difference:
        Object.keys(this.lastTickStockpiles).forEach((resource, idx) => {
            // Only update diff on economic ticks
            if (this.foodDepletionTick === ECONOMY_TICK_INTERVAL) {
                this.lastTickStockpiles[resource][1] = this[resource] - this.lastTickStockpiles[resource][0];
                this.lastTickStockpiles[resource][0] = this[resource];  // Set the value for the next check
            }
            // Set colour: red for negative, green for positive/stable:
            textSize(24);
            if (this.lastTickStockpiles[resource][1] > 0) {
                fill(BRIGHT_GREEN);
                text(`(+ ${this.lastTickStockpiles[resource][1]})`, 32 + resource.length * 24, idx * 32, 256, 128);
            } else if (this.lastTickStockpiles[resource][1] === 0) {
                fill(GREENHOUSE_GREEN);
                text(`(+ ${this.lastTickStockpiles[resource][1]})`, 32 + resource.length * 24, idx * 32, 256, 128);
        } else {
                fill(NEGATIVE_RED);
                text(`( ${this.lastTickStockpiles[resource][1]})`, 32 + resource.length * 24, idx * 32, 256, 128);
            }
        })
    }

        reset() {
        this.ice = 0;
        this.sand = 0;
        this.rock = 0;
        this.glass = 0;
        this.metal = 0;
        this.cO2 = 0;
        this.power = 100;
        this.food = 180;
        this.air = 180;
        this.lastTickStockpiles = {
            ice: [0, 0],
            sand: [0, 0], 
            rock: [0, 0],
            glass: [0, 0],
            metal: [0, 0],
            cO2: [0, 0], 
            power: [100, 0], 
            food: [181, -1],
            air: [181, -1],
        }
        this.foodDepletionTick = 0;
    }

}