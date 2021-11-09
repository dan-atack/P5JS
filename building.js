class Building {
    constructor(x, y, buildingData) {
        this.x = x;
        this.y = y;
        this.name = buildingData.name;   // TODO: Tag with a serial number when build by the Infra class, to individuate buildings?
        this.color = buildingData.color;
        this.width = buildingData.width * BLOCK_WIDTH;
        this.height = buildingData.height * BLOCK_WIDTH;
        this.output = buildingData.output;
        this.consumes = buildingData.consumes;
    }

    render()  {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }

}