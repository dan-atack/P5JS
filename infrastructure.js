// Like the Economy and Map classes, Infrastructure is the disembodied list of your buildings

class Infrastructure {
    constructor() {
        this.buildings = [];
        this.justBuilt = false; // When a building has just been added, set this to the building's data
        this.missingResources = []  // When a building fails the cost check, list the resources needed
    }

    checkForClick(mouseX, mouseY, buildingData, economy) {
        // Only act on mouse click events if a building type has been selected:
        if (buildingData.name) {
            this.placeBuilding(mouseX, mouseY, buildingData, economy);
        }
    }

    // Handles all of the pre-build checks (cost, obstruction) before going ahead with the placement
    placeBuilding(x, y, buildingData, economy) {
        // Ensure building is within the map:
        if (x < WORLD_WIDTH * BLOCK_WIDTH && y < WORLD_HEIGHT * BLOCK_WIDTH) {
            if (this.determineBuildingIsAffordable(economy, buildingData)) {
                // Round mouse position to nearest grid location:
                const gridX = Math.floor(mouseX / BLOCK_WIDTH) * BLOCK_WIDTH;
                const gridY = Math.floor(mouseY / BLOCK_WIDTH) * BLOCK_WIDTH;
                const building = new Building(gridX, gridY, buildingData);
                this.buildings.push(building);
            } else {
                console.log(this.missingResources); // TODO: Add in-game visual display of this message
            }
        } else {
            console.log('out of bounds'); // TODO: Add in-game visual display of this message
        }
    }

    determineBuildingIsAffordable(economy, buildingData) {
        const affordable = true;
        const shortages = []; // Keep track of any shortages - if you have insufficient of a resource it will be noted.
        const costs = Object.keys(buildingData.costs);    // Get the names of the resources you will need
        costs.forEach((resource) => {
            if (economy[resource] < buildingData.costs[resource]) {
                shortages.push(resource);   // If you have less of a resource than is needed, record the name of the resource
            }
        })
        if (shortages.length > 0) {
            this.missingResources = shortages;   // If there are shortages, keep track of their names
        } else {
            return affordable;  // Otherwise return true, meaning green-light the building
        }
    }

    renderBuildings() {
        this.buildings.forEach((building) => building.render());
    }

}