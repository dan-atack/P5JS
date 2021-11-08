class Economy {
    constructor () {
        this.ice = 0;
        this.sand = 0;
        this.rock = 0;
        this.food = 180;    // goal of the game is to make more of this
        this.money = 0;     // you can't eat money!
        this.foodDepletionTick = 0; // Food is reduced by one unit whenever the depletion ticker hits zero
        this.foodDepletionInterval = 60;    // How many ticks does one unit of food last?
    }

    // This can also be used to reduce a resource count by 'adding a negative'
    addResource(resource, amount) {
        this[resource] += amount;
    }

    // loop through the blocks in the map to match to a mouse position
    checkForResources(map, mouseX, mouseY) {
        map.blocks.forEach((block) => {
            // If mouse y = block y is the top of the block, mouse y + block width = bottom of block
            const yMatch = (mouseY >= block.y && mouseY < block.y + BLOCK_WIDTH);
            const xMatch = (mouseX >= block.x && mouseX < block.x + BLOCK_WIDTH);
            if (yMatch && xMatch) {
                this.addResource(block.resourceName, 1);
            }
        });
      }

    advanceFoodDepletionTicker() {
        // If ticker is not full, advance it by one:
        if (this.foodDepletionTick < this.foodDepletionInterval) {
            this.foodDepletionTick ++;
        } else {
            // If ticker is full, reset it and subtract one food
            this.foodDepletionTick = 0;
            this.food --;
        }
    }

}