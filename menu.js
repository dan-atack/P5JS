class Menu {
    constructor() {
        this.id = 'sidebar-menu';
        this.x = WORLD_WIDTH * BLOCK_WIDTH;
        this.y = 0;
        this.width = SIDEBAR_WIDTH;
        this.height = WORLD_HEIGHT * BLOCK_WIDTH;
        this.button1 = {x: this.x + 0, y: 128, name: 'Glass Factory'};
        this.button2 = {x: this.x + 128, y: 128, name: 'Metal Smelter'};
        this.button3 = {x: this.x, y: 256, name: 'Solar Panel'};
        this.button4 = {x: this.x + 128, y: 256, name: 'CO2 Collector'};
        this.button5 = {x: this.x + 0, y: 128, name: 'O2 Separator'};
        this.button6 = {x: this.x + 128, y: 128, name: 'Greenhouse'};
        this.button7 = {x: this.x, y: 256, name: 'Pressure Dome'};
        this.button8 = {x: this.x + 128, y: 256, name: 'Comms Tower'};
        this.currentButtonsList = [1, 2, 3, 4]; // ID's of the first 4 buttons to be shown
        this.maxButtonId = 8;                    // Highest ID number for building options
        this.buttonPadding = 8;
        this.buttonWidth = this.width / 2;
        this.buttonHeight = this.height / 4;
        this.prev = {x: this.x, y: 384, name: 'Prev'}         // The 'prev' button to advance building options
        this.next = {x: this.x + 128, y: 384, name: 'Next'}   // The 'next' button to retrace building options
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
        this.showBuildings(this.currentButtonsList);
        fill(FOOD_GREEN);
        rect(this.next.x, this.next.y, 128, 64);
        rect(this.prev.x, this.prev.y, 128, 64);
        fill(0);
        textSize(16);
        text('PREV', this.prev.x + this.buttonPadding * 2, this.prev.y + this.buttonPadding * 2, 128, 64)
        text('NEXT', this.next.x + this.buttonPadding * 8, this.next.y + this.buttonPadding * 2, 128, 64)
    }

    // Takes a list of 4 buttons' numbers and prints the building requirements for them:
    showBuildings(buttons) {    // Initial 'buttons' list is [1, 2, 3, 4]
        buttons.forEach((button) => {
            this.renderButtonText(this[`button${button}`]);
        })
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
        const buttons = [this[`button${this.currentButtonsList[0]}`], this[`button${this.currentButtonsList[1]}`], this[`button${this.currentButtonsList[2]}`], this[`button${this.currentButtonsList[3]}`]];
        buttons.forEach((button) => {
            // If a button has been clicked, call the click handler to see which building was selected:
            this.isButtonClicked(button, mouseX, mouseY);
        })
        this.checkForPrevOrNext(mouseX, mouseY)
        // TODO: Also check if either the 'next' or 'prev' buttons have been clicked, to show different building options
    }

    // Determine if Prev or Next buttons have been clicked:
    checkForPrevOrNext(mouseX, mouseY) {
        const buttons = [this.prev, this.next];
        buttons.forEach((button) => {
            const xMatch = (mouseX >= button.x && mouseX < button.x + this.buttonWidth);
            const yMatch = (mouseY >= button.y && mouseY < button.y + this.buttonWidth / 2);
            if (xMatch && yMatch) {
                if (button.name === 'Prev') {
                    this.handlePrev();
                } else if (button.name === 'Next') {
                    this.handleNext();
                }
            }
        })
    }

    handlePrev() {
        // Only allow prev to respond if you're not on the first 'page' of the list:
        if (this.currentButtonsList[0] > 1) {
            this.currentButtonsList.forEach((button, idx) => this.currentButtonsList[idx] -= 4);
        } else {
            console.log('Already at beginning of build options list');
        }
    }

    handleNext() {
        // Only allow next to respond if you're not on the last 'page' of the list:
        if (this.currentButtonsList[3] < this.maxButtonId) {
            this.currentButtonsList.forEach((button, idx) => this.currentButtonsList[idx] += 4);
        } else {
            console.log('Already at end of build options list');
        }
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