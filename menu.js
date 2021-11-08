class Menu {
    constructor() {
        this.id = 'sidebar-menu';
        this.x = WORLD_WIDTH * BLOCK_WIDTH;
        this.y = 0;
        this.width = SIDEBAR_WIDTH;
        this.height = WORLD_HEIGHT * BLOCK_WIDTH;
        this.button1 = {x: this.x + 0, y: 128, name: 'CO2 Collector'};
        this.button2 = {x: this.x + 0, y: 256, name: 'Solar Panel'};
        this.button3 = {x: this.x + 128, y: 128, name: 'Glass Factory'};
        this.button4 = {x: this.x + 128, y: 256, name: 'Greenhouse'};
        this.buttonPadding = 12;
        this.buttonWidth = this.width / 2;
        this.buttonHeight = this.height / 4;
        this.buildingSelected = null;
    }

    render() {
        fill(SIDEBAR_GRAY);
        rect(this.x, this.y, this.width, this.height);
        textSize(36);
        fill(RED_ROCK);
        text('MENU', this.x + 72, this.y + 12, this.width, this.height);
        // Populate buttons
        fill(BLUE_ICE);
        rect(this.button1.x, this.button1.y, this.buttonWidth, this.buttonHeight);
        rect(this.button2.x, this.button2.y, this.buttonWidth, this.buttonHeight);
        rect(this.button3.x, this.button3.y, this.buttonWidth, this.buttonHeight);
        rect(this.button4.x, this.button4.y, this.buttonWidth, this.buttonHeight);
        // Label buttons
        fill(RED_ROCK);
        textSize(16);
        text(this.button1.name, this.button1.x + this.buttonPadding, this.button1.y + this.buttonPadding, 256, 128);
        text(this.button2.name, this.button2.x + this.buttonPadding, this.button2.y + this.buttonPadding, 256, 128);
        text(this.button3.name, this.button3.x + this.buttonPadding, this.button3.y + this.buttonPadding, 256, 128);
        text(this.button4.name, this.button4.x + this.buttonPadding, this.button4.y + this.buttonPadding, 256, 128);
    }

    checkForClick(mouseX, mouseY) {
        const buttons = [this.button1, this.button2, this.button3, this.button4];
        buttons.forEach((button) => {
            this.isButtonClicked(button, mouseX, mouseY);
        })
    }

    isButtonClicked(button, mouseX, mouseY) {
        const xMatch = (mouseX >= button.x && mouseX < button.x + this.buttonWidth);
        const yMatch = (mouseY >= button.y && mouseY < button.y + this.buttonWidth);
        if (xMatch && yMatch) {
            // Clicking the button once selects the building; clicking again toggles it off:
            if (!(this.buildingSelected === button.name))  {
                this.buildingSelected = button.name;
            } else {
                this.buildingSelected = null;
            }
        }
    }

}