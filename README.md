# Welcome to Project P5JS AKA Da Game Jamm

## Game Prototype 0: The sidescrolling resource-management survival game!

This game aims to be an extremely crude prototype for the up-and-coming Mars Colony simulator game that I hope to someday build. Will P5JS prove itself worthy of further use? Is this the future of web-based gaming? Can the player collect enough resources to survive until they are rescued? Only time will tell!

## Dev Notes

### Phase 0 - November 3, 2021

1. Installed P5JS extension and related libraries and re-familiarized myself with the Live server.

2. Watched some tutorials and checked out a demo project (eerily similar to Blockland, I was vaguely pleased to see).

3. Created very simple demo of a bar that shrinks but when you click the mouse it gets bigger again. This is the entire game in a nutshell.

### Phase 1 - Initial Classes and Key Inputs - November 5, 2021

1. Create block object class with render method that creates a square (with one of three colors depending on the block's type).

2. Create map object class with render method that will be called in the sketch's draw function.

3. Create player object class, which is a little rover that can be moved from side to side with the A and S keys.

4. Create Constants file for top-level game parameters.

### Phase 2 - Mouse Click Handlers and Sidebar - November 6, 2021

1. Make a mouse-click handler function as a global event listener.

2. Create an Economy object class, which will keep track of different resources that the player has. This will control the resource quantity displays in the game's UI.

3. Give the Economy class a method for detecting if a block has been clicked, and have it increment the resource type of the block.

4. Create a sidebar for the game.

5. Add a food quantity to the economy and have it decrement automatically.

6. Add dummy buttons as placeholders to sidebar UI.

### Phase 3 - Mouse Pointer Following and Buildings - November 7, 2021

1. Create Infrastructure class, which will be like the map of the infrastructure the player builds.

2. Create Building class, which will be used for the individual buildings the player builds.

3. Add method to Menu class to check if any building's button has been clicked.

4. When that button is clicked, have a 'ghost' image of the structure follow the mouse pointer.
