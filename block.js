class Block {
    constructor(x, y, type) {
        this.x = x; // x = pixel location of left edge
        this.y = y; // y = pixel location of top edge
        this.type = type;   // Numerical code corresponding to value in map array
        this.resourceName = ''  // Corresponds with resource names in the 'economy' class
        this.timesClicked = 0;  // Introducing depletable resources!
        this.maxClicks = 100;   // When the block has been clicked this many times, it is 'used up' and disappears forever!
    }

    render() {
        switch (this.type) {
            // Red Rocks!
            case 1:
                fill(RED_ROCK);
                this.resourceName = 'rock' ;
                break;
            // Martian Sand
            case 2:
                fill(YELLOW_SAND);
                this.resourceName = 'sand';
                break;
            // Water Ice
            case 3:
                fill(BLUE_ICE);
                this.resourceName = 'ice';
                break;
        }
        rect(this.x, this.y, BLOCK_WIDTH, BLOCK_WIDTH,);
    }

    // When mouseups are checked by the economy, only allow mining if player vehicle is sufficiently close:
    checkForRoverDistance(player) {
        const withinRangeLeft = this.x >= player.x - player.maxMiningRange;
        const withinRangeRight = this.x <= player.x + player.maxMiningRange;
        // return only if true:
        if (withinRangeLeft && withinRangeRight) return true;
    }

    incrementClicks() {
        this.timesClicked ++;
    }

}