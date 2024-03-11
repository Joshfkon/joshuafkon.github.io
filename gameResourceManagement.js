import { gameState } from './gameSetup.js';
import { updateDisplay } from './UIManagement.js';

//** GAME LOGIC FUNCTIONS 
//One day
const updateInterval = 5000;
const spoilageRate = 0.3;
const spoilageInterval = 30000;
let preservationRate = 0;
setInterval(updateResources, updateInterval);
setInterval(spoilFood, spoilageInterval);

export function updateResources() {
    if (gameState.isGamePaused || gameState.isPopupActive) return; // Check if the game is paused
    
    // Automatically preserve a portion of perishable food
    const amountToPreserveAutomatically = gameState.perishableFood * preservationRate;
    gameState.perishableFood -= amountToPreserveAutomatically;
    gameState.preservedFood += amountToPreserveAutomatically;
    console.log(`${amountToPreserveAutomatically.toFixed(2)} food preserved automatically.`);
    
    // Proceed with food production from tasks
    Object.keys(gameState.tasks).forEach(task => {
        const taskInfo = gameState.tasks[task];
        let foodProduced = 0; // Initialize foodProduced
        
        if (taskInfo.adultPopulation > 0) {
            if (task === 'hunting') {
                // Example: 50% chance of success for hunting
                let success = Math.random() < 0.25;
                if (success) {
                    foodProduced = taskInfo.adultPopulation * taskInfo.foodPerTick * (Math.random() * 5.95 + 1);
                    const huntResultsElement = document.getElementById('hunt-results');
                    if (huntResultsElement) {
                        huntResultsElement.textContent = `Success! Hunt yielded ${foodProduced.toFixed(2)} food.`;
                    }
                    console.log(`Hunting Population: ${gameState.tasks.hunting.adultPopulation}, Food Produced: ${foodProduced}`);
                    console.log(`Total adults: ${gameState.men + gameState.women}, Hunting rate: ${gameState.tasks.hunting.rate}`);
                    console.log(`Assigned hunters: ${gameState.tasks.hunting.adultPopulation}`);
                } else {
                    foodProduced = 0; // No food produced on failure
                    const huntResultsElement = document.getElementById('hunt-results');
                    if (huntResultsElement) {
                        huntResultsElement.textContent = "Hunt failed. Better luck next time!";
                    }
                    console.log(`Hunting Population: ${gameState.tasks.hunting.adultPopulation}, Food Produced: ${foodProduced}`);
                }
            } else if (task === 'gathering') {
                // Introduce variability in gathering
                let variabilityFactor = Math.random() * 0.5 + 0.75; // Random factor between 0.75 and 1.25
                foodProduced = taskInfo.adultPopulation * taskInfo.foodPerTick * variabilityFactor;
                const gatheringResultsElement = document.getElementById('gathering-results');
                if (gatheringResultsElement) {
                    gatheringResultsElement.textContent = `Gathering yielded ${foodProduced.toFixed(2)} food.`;
                }
            }
        }
        
        gameState.perishableFood += foodProduced;
    });
    
    // Food consumption, including children
    const foodConsumptionPerPerson = 1.0; // Example consumption rate
    const totalFoodConsumption = (gameState.men + gameState.women + gameState.children) * foodConsumptionPerPerson;
    
    // Subtract consumption, starting with perishable food
    if (gameState.perishableFood >= totalFoodConsumption) {
        gameState.perishableFood -= totalFoodConsumption;
    } else {
        // If perishable food is not enough, use preserved food
        const remainingConsumption = totalFoodConsumption - gameState.perishableFood;
        gameState.perishableFood = 0; // All perishable food is consumed
        gameState.preservedFood = Math.max(gameState.preservedFood - remainingConsumption, 0); // Ensure preservedFood doesn't go negative
    }
    
    updateDisplay(); // Update the UI with the new values
}

export function adjustPopulationForFood() {
    if (gameState.isGamePaused) return; // Check if the game is paused
    const totalFood = gameState.perishableFood + gameState.preservedFood;
    let foodPerPerson = totalFood / gameState.population;
    console.log(`Before adjustment: Population = ${gameState.population}, Food Per Person = ${foodPerPerson}`);

    while (foodPerPerson < 1 && gameState.population > 0) {
        if (gameState.children > 0) {
            gameState.children--;
        } else if (gameState.men > 0 && gameState.women > 0) {
            // Try to reduce men and women equally
            gameState.men--;
            gameState.women--;
        } else if (gameState.men > 0) {
            gameState.men--;
        } else if (gameState.women > 0) {
            gameState.women--;
        }

        // Recalculate food per person
        foodPerPerson = (gameState.perishableFood + gameState.preservedFood) / gameState.population;
    }
    console.log(`After decrement: Men = ${gameState.men}, Women = ${gameState.women}, Children = ${gameState.children}, Food Per Person = ${foodPerPerson}`);

    updateDisplay(); // Ensure this updates your UI to reflect the changes
}

// Function to simulate Population dynamics
export function simulatePopulationDynamics() {
    if (gameState.isGamePaused) return; // Check if the game is paused
    
    // Birth
    for (let i = 0; i < gameState.women; i++) {
        if (Math.random() < 1 / 125) {
            console.log("Birth");
            gameState.children++;
        }
    }

    // Growth
    let childrenBecomingAdults = 0;
    for (let i = 0; i < gameState.children; i++) {
        if (Math.random() < 1 / 365) {
            console.log("Adult Ceremony");
            childrenBecomingAdults++;
        }
    }
    gameState.children -= childrenBecomingAdults;
    // Assume half of the children become men and half become women, for simplicity
    gameState.men += Math.floor(childrenBecomingAdults / 2);
    gameState.women += Math.ceil(childrenBecomingAdults / 2);

    // Death from Old Age
    ['men', 'women'].forEach(gender => {
        for (let i = 0; i < gameState[gender]; i++) {
            if (Math.random() < 1 / 10950) {
                console.log("Old Age Death");
                gameState[gender]--;
            }
        }
    });

    // Death from Disease - Children
    for (let i = 0; i < gameState.children; i++) {
        if (Math.random() < 1 / 1825) {
            gameState.children--;
        }
    }

    // Death from Disease - Adults
    ['men', 'women'].forEach(gender => {
        for (let i = 0; i < gameState[gender]; i++) {
            if (Math.random() < 1 / 13140) {
                gameState[gender]--;
            }
        }
    });

    updateDisplay(); // Make sure the display is updated with the new values
}

//Function to Increment Time
export function incrementTime() {
    if (gameState.isGamePaused) return; // Check if the game is paused
    gameState.day++;
    if (gameState.day > 364) {
        gameState.day = 1; // Reset day to 1
        gameState.year++; // Increment year
        gameState.currentSeasonIndex = 0; // Optionally reset the season
        gameState.popupShown = false; // Reset the popup shown flag each year
    }

    if (gameState.day % 91 === 0) { // Change season every 91 days
        gameState.currentSeasonIndex = (gameState.currentSeasonIndex + 1) % gameState.seasons.length;
    }

    updateDisplay(); // Make sure the display is updated with the new values
}

export function spoilFood() {
    if (gameState.isGamePaused) return; // Check if the game is paused
    let spoiledFood = gameState.perishableFood * spoilageRate;
    gameState.perishableFood -= spoiledFood; // Reduce perishable food by the spoilage rate
    updateDisplay();
}

export function preserveFood(amount) {
    if (gameState.isGamePaused) return; // Check if the game is paused
    // Assuming this function is manually called to convert perishable to preserved
    if (gameState.perishableFood >= amount) {
        gameState.perishableFood -= amount;
        gameState.preservedFood += amount;
        updateDisplay();
    } else {
        console.log("Not enough perishable food to preserve.");
    }
}