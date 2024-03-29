import { updateTaskPercentages, updateDisplay } from './UIManagement.js';
import { adjustPopulationForFood } from './gameResourceManagement.js';   
import { simulatePopulationDynamics } from './gameResourceManagement.js';   
import { incrementTime } from './gameResourceManagement.js';   
import { updateResources } from './gameResourceManagement.js';
import { gameState } from './gameSetup.js';
import { checkForPopups } from './EventTree.js';   
import { generateGeographyGrid, generateMap, renderTribeLocation } from './mapGeneration.js';

document.addEventListener('DOMContentLoaded', function() {
    gameState.geographyGrid = generateGeographyGrid();
    generateMap();
    placeTribeMarker(gameState.tribePosition.x, gameState.tribePosition.y);
    renderTribeLocation();
    startGameLoop();
});

let gameLoopInterval = null;


 //** CENTRAL GAME LOOP 
    function startGameLoop() {
        // Assuming gameLoop and gameState are defined, start the interval
        gameState.gameLoopInterval = setInterval(gameLoop, 5000);
        if (gameLoopInterval) {
            console.log("Game loop is already running.");
            return; // Prevent multiple loops from starting
        }

     
    
        // Define the game loop logic
        function gameLoop() {
            if (!gameState.isGamePaused && !gameState.isPopupActive) {
              // Call your game logic functions here in the order that makes sense for your game
        
        console.log("Game loop START"); 
        checkForPopups(); // Check if we should show a popup     +
        console.log("check for events"); 

        updateTaskPercentages();
        // 1. Update resources based on current tasks, preservation, etc.
        updateResources();

        updateTaskPercentages();
        

        // 2. Adjust the population based on the current food situation
        adjustPopulationForFood();

        updateTaskPercentages();

        // 3. Simulate population dynamics (births, deaths from old age or disease, etc.)
        simulatePopulationDynamics();

        console.log("INCREMENT DAY");   
        incrementTime();

        // Check if the population has dropped to 0
        if (gameState.population === 0) {
            updateDisplay(); // This function should refresh your UI based on the latest game state
            gameOver();
            return; // Exit the game loop
        }

        // Finally, update the UI to reflect the new state after all logic has been processed
        updateDisplay(); // This function should refresh your UI based on the latest game state

      
            }
        }
    
        // Set the game loop to run every second (1000 milliseconds)
       
        console.log("Game loop started.");
    }
    
    function pauseGameLoop() {
        if (gameLoopInterval) {
            clearInterval(gameLoopInterval); // Stop the loop
            gameLoopInterval = null; // Clear the interval ID
            console.log("Game loop paused.");
        }
    }
    
    function resumeGameLoop() {
        if (!gameLoopInterval) {
            startGameLoop(); // Restart the game loop if it's not running
            console.log("Game loop resumed.");
        }
    }
    

    // Assuming you have pause and resume buttons in your UI:
   // document.getElementById('pauseButton').addEventListener('click', pauseGameLoop);
    //document.getElementById('resumeButton').addEventListener('click', resumeGameLoop);

    function gameOver() {
        // Stop the game loop
        clearInterval(gameState.gameLoopInterval);
    
        // Display the game over message
        alert("Game Over! You have led your people to ruin.");
    
        // You can add additional logic here, such as displaying a game over screen,
        // providing options to restart the game, or updating the UI to reflect the game over state.
    }




    
 


