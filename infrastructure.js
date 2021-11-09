// Like the Economy and Map classes, Infrastructure is the disembodied list of your buildings

class Infrastructure {
    constructor() {
        this.buildings = [];
        this.justBuilt = null; // When a building has just been added, set this to the building's data
        this.missingResources = []  // When a building fails the cost check, list the resources needed
    }

    checkForClick(mouseX, mouseY, buildingData, economy) {
        // Only act on mouse click events if a building type has been selected:
        if (buildingData.name) {
            this.placeBuilding(mouseX, mouseY, buildingData, economy);
        }
    }

    // Handles the whole building process, from pre-build checks (cost, obstruction) to payment and setting just built flag:
    placeBuilding(x, y, buildingData, economy) {
        // Ensure building is within the map:
        if (x < WORLD_WIDTH * BLOCK_WIDTH && y < WORLD_HEIGHT * BLOCK_WIDTH) {
            if (this.determineBuildingIsAffordable(economy, buildingData)) {
                // Round mouse position to nearest grid location:
                const gridX = Math.floor(mouseX / BLOCK_WIDTH) * BLOCK_WIDTH;
                const gridY = Math.floor(mouseY / BLOCK_WIDTH) * BLOCK_WIDTH;
                const building = new Building(gridX, gridY, buildingData);
                this.buildings.push(building);
                this.payForBuilding(economy, buildingData.costs);
                this.justBuilt = buildingData;
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
            console.log('shortage reported')
            this.missingResources = shortages;   // If there are shortages, keep track of their names
        } else {
            return affordable;  // Otherwise return true, meaning green-light the building
        }
    }

    // For the payment, economy is the economy object and costs is a the building's costs dictionary object:
    payForBuilding(economy, costs) {
        console.log(costs);
        const resources = Object.keys(costs);
        resources.forEach((resource) => {
            console.log(costs[resource]);
            economy.addResource(resource, -costs[resource]);
        })
    }

    // Unset missing resources and just built flags:
    resetFlags() {
        console.log('reset')
        this.justBuilt = null;
        this.missingResources = [];
    }

    calculateIncome(building) {
        // Get the dictionary or a building's resource outputs
    }

    calculateMaintenance(building) {
        // Get the dictionary for a building's resource consumption needs
    }

    handleProduction(economy) {
        // Go through buildings list; for each building check its resource output fields AND resource consumption fields
        // When the consumption needs are available, reduce their quantity/ies and add the output/s to the economy
    }

    renderBuildings() {
        this.buildings.forEach((building) => building.render());
    }

}