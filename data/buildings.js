// This file contains a dictionary-like listing of all of the data for the game's buildable structures.

const buildings = [
    {
        id: 1,
        name: 'CO2 Collector',
        width: 2,   // Width in block units
        height: 3,  // Height in block units
        color: CO2_COLLECTOR_YELLOW,
        costs: {     // Resource codenames match economy fields
            ice: 2,
            rock: 2,
            glass: 2
        },
        outputs: {  // Resource codenames match economy fields; outputs are added on a 'tick' basis similar to how food is reduced.
            cO2: 1
        },
        consumes: { // Represents the cost of running this structure, again on a per-tick basis (so for this structure, 1 tick would reduce your ice reserves by 1 and add 1 cO2).
            ice: 1
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
    {
        id: 2,
        name: 'Glass Factory',
        width: 3,   // Width in block units
        height: 3,  // Height in block units
        color: GLASS_FACTORY_BLUE,
        costs: {     // Resource codenames match economy fields
            rock: 2,
            sand: 3
        },
        outputs: {
            glass: 1
        },
        consumes: {
            sand: 2
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
    {
        id: 3,
        name: 'Solar Panel',
        width: 2,   // Width in block units
        height: 1,  // Height in block units
        color: SOLAR_PANEL_BLUE,
        costs: {     // Resource codenames match economy fields
            rock: 5,
            sand: 2,
            glass: 2
        },
        outputs: {
            power: 1
        },
        consumes: {
            glass: 0    // TODO: Establish how to treat 'zero-cost' structures
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
    {
        id: 4,
        name: 'Greenhouse',
        width: 3,   // Width in block units
        height: 3,  // Height in block units
        color: GREENHOUSE_GREEN,
        costs: {     // Resource codenames match economy fields
            rock: 3,
            sand: 3,
            glass: 2
        },
        outputs: {
            food: 1
        },
        consumes: {
            power: 2,
            cO2: 1,
            ice: 1
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
];