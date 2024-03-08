import { updateTaskPercentages } from './UIManagement.js';   
import { adjustPopulationForFood } from './gameResourceManagement.js';   
import { simulatePopulationDynamics } from './gameResourceManagement.js';   
import { incrementTime } from './gameResourceManagement.js';   
import { updateResources } from './gameResourceManagement.js';
import { gameState } from './gameSetup.js';
import { checkForPopups } from './EventTree.js';   
import { updateDisplay } from './UIManagement.js';
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
            if (!gameState.isGamePaused) {
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
    
    // Example usage:
    document.addEventListener('DOMContentLoaded', function() {
        startGameLoop(); // Start the game loop when the document is ready
    });
    
    // Assuming you have pause and resume buttons in your UI:
   // document.getElementById('pauseButton').addEventListener('click', pauseGameLoop);
    //document.getElementById('resumeButton').addEventListener('click', resumeGameLoop);





    
 


