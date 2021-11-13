class Building {
    constructor(x, y, buildingData) {
        this.x = x;
        this.y = y;                      // Y is the height of the ceiling (as height goes downward)
        this.name = buildingData.name;   // TODO: Tag with a serial number when build by the Infra class, to individuate buildings?
        this.color = buildingData.color;
        this.width = buildingData.width * BLOCK_WIDTH;
        this.height = buildingData.height * BLOCK_WIDTH;
        this.outputs = buildingData.outputs;
        this.consumes = buildingData.consumes;
        this.shortfalls = [];           // Keep a list of shortfalls, to display symbols for missing resources (TODO)
        this.productionToggled = true  // Optional toggle for resource production (placement click sets to false)
    }

    render()  {
        fill(this.color);
        if (this.productionToggled) fill(TOGGLED_RED);
        rect(this.x, this.y, this.width, this.height);
        // Show shortfalls if there are any:
        if (this.shortfalls.length > 0) {
            this.renderShortfalls();
        }
    }

    checkForClick(mouseX, mouseY) {
        const xMatch = mouseX >= this.x && mouseX < this.x + this.width;
        const yMatch = mouseY >= this.y && mouseY < this.y + this.height;
        if (xMatch && yMatch) {
            if (this.productionToggled) {
                this.productionToggled = false;
            } else {
                this.productionToggled = true;
            }
        }
    }

    renderShortfalls() {
        this.shortfalls.forEach((resource, idx) => {
            fill(NEGATIVE_RED);
            circle(this.x + 4 + 16 * idx, this.y + 4, 12);
        })
    }

}