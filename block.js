class Block {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    render() {
        switch (this.type) {
            // Red Rocks!
            case 1:
                fill('#B13A1A');
                break;
            // Martian Sand
            case 2:
                fill('#FFA500');
                break;
            // Water Ice
            case 3:
                fill('#AED8E5');
                break;
        }
        rect(this.x, this.y, BLOCK_WIDTH, BLOCK_WIDTH,);
    }

}