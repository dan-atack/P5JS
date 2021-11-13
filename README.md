# Welcome to Project P5JS AKA Da Game Jamm

## Game Prototype 0: The sidescrolling resource-management survival game!

This game aims to be an extremely crude prototype for the up-and-coming Mars Colony simulator game that I hope to someday build. Will P5JS prove itself worthy of further use? Is this the future of web-based gaming? Can the player collect enough resources to survive until they are rescued? Only time will tell!

## Dev Notes

### Phase 0 - November 3, 2021

1. Installed P5JS extension and related libraries and re-familiarized myself with the Live server.

2. Watched some tutorials and checked out a demo project (surprisingly similar to Blockland, I was vaguely pleased to see).

3. Created very simple demo of a bar that shrinks but when you click the mouse it gets bigger again. This is the entire game in a nutshell.

### Phase 1 - Initial Classes and Key Inputs - November 5, 2021

1. Create Block object class with render method that creates a square (with one of three colors depending on the block's type).

2. Create Map object class with render method that will be called in the sketch's draw function. The Map has a method to render many blocks, to form the game's initial terrain.

3. Create Player object class, which is a little rover that can be moved from side to side with the A and S keys.

4. Create Constants file for top-level game parameters.

### Phase 2 - Mouse Click Handlers and Sidebar - November 6, 2021

1. Make a mouse-click handler function as a global event listener.

2. Create an Economy object class, which will keep track of different resources that the player has. This will control the resource quantity displays in the game's UI.

3. Give the Economy class a method for detecting if a block has been clicked, and have it increment the resource type of the block.

4. Create a sidebar for the game.

5. Add a food quantity to the economy and have it decrement automatically.

6. Add dummy buttons as placeholders to sidebar UI.

### Phase 3 - Mouse Pointer Following and Building Placement Preliminaries - November 7, 2021

1. Create Infrastructure class, which will be like the map of the infrastructure the player builds.

2. Create Building class, which will be used for the individual buildings the player builds.

3. Add method to Menu class to check if any building's button has been clicked.

4. When that button is clicked, have a 'ghost' image of the structure follow the mouse pointer.

5. Have the building's ghost image 'snap to' the map grid, by writing a function that rounds the mouseX/mouseY values to the nearest interval of block width.

### Phase 4 - Building Placement and Purchasing - November 8 + 9, 2021

1. Create a data file with details for each building option; each building's details can be given as a json-like object. Details include width and height (in block units), resource costs, resource outputs, name and description text (to be displayed on the button/below the buttons in the remaining space in the sidebar).

2. Change the Menu class's building Selected property to be an object instead of a string. Update the check in sketch.js to check for buildingSelected.name instead of just buildingSelected. When no building is selected the buildingSelected property should still be an object (not null) but all of its fields should be empty so that checking the name will be falsey without returning an error.

3. Add a new Infrastructure method, placeBuilding, to be called when the user clicks on the map after selecting a building. This will create a new instance of the Building class, add it to the Infrastructure's buildings list.

4. Add Infrastructure render method to actually show the buildings being created. Infra render method simply calls each of its buildings' render methods, of course.

5. When Infrastructure placeStructure method performs a build, have it set the addedBuilding flag to true, to signal the Engine to de-select the current building... only if the player can no longer afford the structure!

6. When a building is purchased, subtract the cost from the resource tallies.

7. Finally, prevent structures from piling up by adding a method to the Infra class to 'detect structures' - run as part of the build consideration process to check if there are other buildings potentially in the way of the cursor. Detecting terrain features will be handled separately at a later time.

### Phase 5 - Calculating Building Resource Production and Displaying that Info - November 10, 2021

1. Add method for the Infrastructure class to loop through its buildings list in order to call two other functions, call them 'produce' and 'consume' so that, whenever resource needs are met, a building will consume resources and produce its output.

2. Create Infrastructure produce function.

3. Create Infrastructure consume function.

4. Add text displays for resource production rates next to resource quantity displays. Include logic for setting text color to red or green if there is gain/loss for each cycle. NOTE: This and all other economy displays should be handled by the Economy class and called as part of the general-purpose economy render function.

5. When a building has insufficient resources to run, render it with a little red circle to denote the shortage.

6. Make buildings' production toggleable by clicking on the building - each building has a click handler function that toggles its activeProduction field true or false.

7. Have the Menu render additional info about each building option: build costs, resource use and resource outputs.

8. Add power to list of displayed resources.

### Phase 6 - Game Over Man - November 11, 2021

1. Add conditions for the game to end if the player's food supply goes below zero. At this point, all the game's operations cease and a message is shown with the option to start again.

2. Add another condition for a victory message to be shown after the player has survived for a certain amount of time. Again, it should allow the player to start a new game, should they wish to.

3. Add reset functions for the infra, economy, menu and player classes, to be called when the game is restarted.

### Phase 7 - Rover Mining Range and 2D Terrain - November 12, 2021

1. Introduce a maximum distance for the rover to be able to mine at. When the Economy checks the map it will also be given the Player's info so it can check for x distance and only permit mining if the player is close enough.

2. Make a new method for the Map class, to render column-based terrain when given an array of arrays. BONUS: Can benefit from the Blockland Map Editor!

### 3. Add a method for the Player to detect the terrain beneath them.

### 4. Add a method for the Player to detect the terrain behind and in front of them.

### 5. Add a method for the Player's elevation to increase if the terrain beneath them rises.

### Phase 8 And Beyond - Final Ideas for Monday, November 15 Presentation

### 1. Add new resource types, air and fuel, to the Economy class.

### 2. Add another 4 buildings to the Menu, along with two more buttons to cycle between building options:

    - Oxygen Extractor (rocks plus power into oxygen)
    - Fuel Plant (CO2 plus power into fuel)
    - Living Quarters (???)
    -

### 3. Add field to Block class: timesClicked, to determine when a resource gets 'tapped out' and disappears!

### 4. Add Player field, rover fuel, to limit how far you can travel in the rover!

### 5. Add oxygen to starting supply and to game-over calculus.

### 6. Change money resource to glass.

### 7. Re-adjust resource purchase costs for all buildings.
