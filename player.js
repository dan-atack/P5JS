class Player {
    constructor() {
        this.x = (WORLD_WIDTH / 4) * PLAYER_WIDTH;
        this.y = WORLD_HEIGHT / 2 * PLAYER_WIDTH - PLAYER_WIDTH * 1.5;
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

}