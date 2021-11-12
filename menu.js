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
        this.buttonPadding = 8;
        this.buttonWidth = this.width / 2;
        this.buttonHeight = this.height / 4;
        this.nullBuildingShape = {   // Essentially a 'null' building template
            id: 0,
            name: '',
            width: 0,
            height: 0,
            color: 255,
            cost: {
                ice: 0
            },
            outputs: {
                cO2: 0
            },
            consumes: {
                ice: 0
            },
            buildTime: 0
        };
        this.buildingSelected = this.nullBuildingShape; // This value stores the currently selected building; null shape is the default.
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
        this.renderButtonText(this.button1);
        this.renderButtonText(this.button2);
        this.renderButtonText(this.button3);
        this.renderButtonText(this.button4);
    }

    // Separate sub-function to render the text for buttons:
    renderButtonText(button) {
        fill(SOLAR_PANEL_BLUE);
        textSize(16);
        text(button.name, button.x + this.buttonPadding, button.y + this.buttonPadding, 256, 128);
        // Render building cost:
        fill(RED_ROCK);
        textSize(14);
        text('Building Costs:', button.x + this.buttonPadding, button.y + this.buttonPadding * 3, 256, 128);
        textSize(12);
        // Building info is indexed to buildings list:
        const building = buildings.find((building) => building.name === button.name);
        // Display construction costs - resoure names above, and quantities below:
        Object.keys(building.costs).forEach((resource, idx) => {
            text(resource, button.x + this.buttonPadding + 32 * idx, button.y + this.buttonPadding * 5, 256, 128);
            text(building.costs[resource], button.x + this.buttonPadding + 16 + (idx * 32), button.y + this.buttonPadding * 7, 256, 128);
        })
        fill(GREENHOUSE_GREEN);
        textSize(14);
        // Display building production output:
        text(`Yields 1 ${Object.keys(building.outputs)[0]}`, button.x + this.buttonPadding, button.y + this.buttonPadding * 9, 256, 128)
        fill(NEGATIVE_RED);
        text('Consumes:', button.x + this.buttonPadding, button.y + this.buttonPadding * 11, 256, 128)
        const consumes = Object.keys(building.consumes);
        // Display building 'consumption' costs (upkeep):
        consumes.forEach((resource, idx) => {
            if (consumes.length > 1) {
                textSize(10);
            } else {
                textSize(12)
            }
            text(`${building.consumes[resource]} ${resource} `, button.x + this.buttonPadding + (42 * idx), button.y + this.buttonPadding * 13, 256, 128);
        })
    }

    // Engine calls this function whenever there is a click; it detects if a menu button was clicked
    checkForClick(mouseX, mouseY) {
        // Check each button's physical area for a click
        const buttons = [this.button1, this.button2, this.button3, this.button4];
        buttons.forEach((button) => {
            // If a button has been clicked, call the click handler to see which building was selected:
            this.isButtonClicked(button, mouseX, mouseY);
        })
    }

    // Select building for production:
    isButtonClicked(button, mouseX, mouseY) {
        const xMatch = (mouseX >= button.x && mouseX < button.x + this.buttonWidth);
        const yMatch = (mouseY >= button.y && mouseY < button.y + this.buttonWidth);
        if (xMatch && yMatch) {
            // Clicking the button once selects the building; clicking again toggles it off:
            if (!(this.buildingSelected.name === button.name))  {
                this.buildingSelected = buildings.find((building) => building.name === button.name);
            } else {
                this.deselectBuilding();
            }
        }
    }

    // Deselect building if there are not enough resources remaining to build the same structure again
    checkIfJustPurchased(infra, economy) {
        if (infra.justBuilt) {
            infra.determineBuildingIsAffordable(economy, infra.justBuilt);
            if (infra.missingResources.length > 0) {
                console.log('ping')
                infra.resetFlags();
                this.buildingSelected = this.nullBuildingShape;
            }
        } else if (infra.missingResources.length > 0) {
            infra.resetFlags();
            this.buildingSelected = this.nullBuildingShape;
        }
    }

    // Reset building selection to null:
    deselectBuilding() {
        this.buildingSelected = this.nullBuildingShape;
    }

}