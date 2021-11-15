// This file contains a dictionary-like listing of all of the data for the game's buildable structures.

const buildings = [
    {
        id: 1,
        name: 'Glass Factory',
        width: 3,   // Width in block units
        height: 3,  // Height in block units
        color: GLASS_FACTORY_BLUE,
        costs: {     // Resource codenames match economy fields
            rock: 4,
            sand: 4
        },
        outputs: {
            glass: 1
        },
        consumes: {
            sand: 1,
            power: 1
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
    {
        id: 2,
        name: 'Metal Smelter',
        width: 4,   // Width in block units
        height: 3,  // Height in block units
        color: SMELTER_GRAY,
        costs: {     // Resource codenames match economy fields
            rock: 4,
            sand: 6
        },
        outputs: {
            metal: 1
        },
        consumes: {
            rock: 1,
            power: 1
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
            metal: 3,
            glass: 3
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
        name: 'CO2 Collector',
        width: 2,   // Width in block units
        height: 3,  // Height in block units
        color: CO2_COLLECTOR_YELLOW,
        costs: {     // Resource codenames match economy fields
            ice: 4,
            rock: 4,
            glass: 2
        },
        outputs: {  // Resource codenames match economy fields; outputs are added on a 'tick' basis similar to how food is reduced.
            cO2: 1
        },
        consumes: { // Represents the cost of running this structure, again on a per-tick basis (so for this structure, 1 tick would reduce your ice reserves by 1 and add 1 cO2).
            power: 1
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
    {
        id: 5,
        name: 'O2 Separator',
        width: 1,   // Width in block units
        height: 3,  // Height in block units
        color: OXYGEN_RED,
        costs: {     // Resource codenames match economy fields
            metal: 3,
            rock: 2,
            glass: 2
        },
        outputs: {  // Resource codenames match economy fields; outputs are added on a 'tick' basis similar to how food is reduced.
            air: 1
        },
        consumes: { // Represents the cost of running this structure, again on a per-tick basis (so for this structure, 1 tick would reduce your ice reserves by 1 and add 1 cO2).
            power: 2,
            rock: 1
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
    {
        id: 6,
        name: 'Greenhouse',
        width: 3,   // Width in block units
        height: 3,  // Height in block units
        color: GREENHOUSE_GREEN,
        costs: {     // Resource codenames match economy fields
            sand: 3,
            metal: 6,
            glass: 8
        },
        outputs: {
            food: 1,
            air: 1
        },
        consumes: {
            power: 2,
            cO2: 1,
            ice: 1
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
    {
        id: 7,
        name: 'Pressure Dome',
        width: 5,   // Width in block units
        height: 4,  // Height in block units
        color: BLUEGREEN,
        costs: {     // Resource codenames match economy fields
            metal: 8,
            glass: 12,
            air: 8
        },
        outputs: {
            food: 0
        },
        consumes: {
            power: 4,
            air: 1
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
    {
        id: 8,
        name: 'Comms Tower',
        width: 1,       // Width in block units
        height: 6,      // Height in block units
        color: DARK_GRAY,
        costs: {        // Resource codenames match economy fields
            rock: 6,
            metal: 6,
            glass: 3
        },
        outputs: {
            power: 0
        },
        consumes: {
            power: 4,
        },
        buildTime: 0    // Will use this later to represent structures being built gradually
    },
];