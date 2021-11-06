class Map {
    constructor() {
        this.blocks = [];
        this.horizontalOffset = 0;
    }

    renderInitialMap() {
        for (let i = 0; i < WORLD_WIDTH; i++) {
            const block = new Block(i * BLOCK_WIDTH, 496, 1);
            block.render();
            this.blocks.push(block);
            if (i % 3 == 0) {
                const otherBlock = new Block(i * BLOCK_WIDTH, 480, 3);
                otherBlock.render();
                this.blocks.push(otherBlock);
            } else {
                const otherBlock = new Block(i * BLOCK_WIDTH, 480, 2);
                otherBlock.render();
                this.blocks.push(otherBlock);
            }
        }
    }

}