class Map {
    constructor() {
        this.horizontalOffset = 0;
        this.columns = [];
    }

    renderMap() {
        this.columns.forEach((column) => {
            column.forEach((block) => {
                block.render();
            })
        })
    }

    // Initial terrain renderer (Blockland style but with array for columns list as well as for blocks within a column)
    renderTerrainColumns(columns) {
        columns.forEach((column, idx) => {
            this.columns.push([]);
            column.forEach((blockType, jdx) => {
                if (blockType.type != 0) {  // Ignore 'empty' blocks (ensures easy compatibility with BlockLand map editor!)
                    const x = idx * BLOCK_WIDTH;
                    const y = (WORLD_HEIGHT * BLOCK_WIDTH) - (jdx * BLOCK_WIDTH) - BLOCK_WIDTH;
                    const protoBlock = new Block(x, y, blockType);
                    this.columns[idx].push(protoBlock);
                    protoBlock.render();
                }
            })
        });
    }

}