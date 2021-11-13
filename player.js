class Player {
    constructor() {
        this.startX = (WORLD_WIDTH / 4) * PLAYER_WIDTH - BLOCK_WIDTH * 2;
        this.startY = WORLD_HEIGHT / 2 * PLAYER_WIDTH - PLAYER_WIDTH;
        this.x = this.startX;
        this.y = this.startY
        this.maxMiningRange = 5 * BLOCK_WIDTH; // How many blocks' width away can the player mine?
    }

    render() {
        // Wheels
        fill('#593D1B')
        circle(this.x + PLAYER_WIDTH, this.y, PLAYER_WIDTH);
        circle(this.x - PLAYER_WIDTH, this.y, PLAYER_WIDTH);
        circle(this.x, this.y, PLAYER_WIDTH);
        // Chassis
        fill('#C6C9D1');
        rect(this.x - PLAYER_WIDTH, this.y - PLAYER_WIDTH, PLAYER_WIDTH * 2, PLAYER_WIDTH);
    }

    handleKeyDowns() {
        if (keyIsDown(68)) {
            this.x ++;
        } else if (keyIsDown(65)){
            this.x --;
        }
    }

    handleUpdates() {
        this.handleKeyDowns();
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

}