class Player {
    constructor() {
        this.startX = (WORLD_WIDTH / 4) * PLAYER_WIDTH - BLOCK_WIDTH * 2;
        this.startY = WORLD_HEIGHT / 2 * PLAYER_WIDTH - PLAYER_WIDTH;
        this.x = this.startX;
        this.y = this.startY
        this.maxMiningRange = 5 * BLOCK_WIDTH;  // How many blocks' width away can the player mine?
        this.rangeTraveled = 0;                 // How far have you travelled on the current energy unit?
        this.rangePerEnergyUnit = PLAYER_WIDTH; // How far does one unit of energy take you?
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

    // Keydown responders handle movement, which requires economy data since movement costs energy:
    handleKeyDowns(economy) {
        const enoughPower = economy.power > 0;  // Only allow movement with sufficient power supply
        // S key moves to the right
        if (keyIsDown(68) && this.x + PLAYER_WIDTH < WORLD_WIDTH * BLOCK_WIDTH && enoughPower) {
            this.x ++;
            this.rangeTraveled ++;
            this.handleMovementEnergyCosts(economy);
        // A key moves to the left
        } else if (keyIsDown(65) && this.x > 0 && enoughPower){
            this.x --;
            this.rangeTraveled ++;
            this.handleMovementEnergyCosts(economy);
        }
    }

    // This runs as part of the movement handling sequence, to deduct power at every interval of distance travelled:
    handleMovementEnergyCosts(economy) {
        if (this.rangeTraveled >= this.rangePerEnergyUnit) {
            this.rangeTraveled = 0;
            economy.power --;
        }
    }

    handleUpdates(map, economy) {
        this.handleKeyDowns(economy);
        this.detectTerrainBeneath(map);
    }

    detectTerrainBeneath(map) {
        // Show the block that's directly below the middle wheel, as well as the block that's just above it (inside the actual wheel radius) to trigger an elevation increase
        const columnX = Math.floor(this.x / BLOCK_WIDTH);
        const gridY = Math.floor(this.y / BLOCK_WIDTH) * BLOCK_WIDTH;
        const insideWheelRadius = map.columns[columnX].filter((block) => block.y === gridY);
        const directlyBelow = map.columns[columnX].filter((block) => block.y === gridY + BLOCK_WIDTH);
        // Reduce elevation if there is nothing 'directly below':
        if (directlyBelow.length === 0) {
            this.y += BLOCK_WIDTH;
        }
        // Increase elevation if there is a block within the wheel radius:
        if (insideWheelRadius.length > 0) {
            this.y -= BLOCK_WIDTH;
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

}