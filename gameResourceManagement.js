import { gameState } from './gameSetup.js';
import { updateDisplay } from './UIManagement.js';

//** GAME LOGIC FUNCTIONS 
//One day
const updateInterval = 5000;
const spoilageRate = 0.3;
const spoilageInterval = 30000;

setInterval(updateResources, updateInterval);
setInterval(spoilFood, spoilageInterval);

export function updateResources() {
    if (gameState.isGamePaused || gameState.isPopupActive) return; // Check if the game is paused

    // Automatically preserve a portion of perishable food
    const amountToPreserveAutomatically = gameState.perishableFood * gameState.preservationRate;
    gameState.perishableFood -= amountToPreserveAutomatically;
    gameState.preservedFood += amountToPreserveAutomatically;
    console.log(`${amountToPreserveAutomatically.toFixed(2)} food preserved automatically.`);

    // Determine the current season
    const currentSeason = gameState.seasons[gameState.currentSeasonIndex];

    // Define seasonal bonuses/penalties
    const seasonalFactors = {
        hunting: {
            Spring: 1,
            Summer: 1.2,
            Autumn: 1.5,
            Winter: 0.5
        },
        gathering: {
            Spring: 1.5,
            Summer: 2,
            Autumn: 3,
            Winter: 0.2
        }
    };

    // Proceed with food production from tasks
    if (!gameState.isPopupActive) {
        let totalFoodProduced = 0; // Track the total food produced

        Object.keys(gameState.tasks).forEach(task => {
            const taskInfo = gameState.tasks[task];
            let foodProduced = 0; // Initialize foodProduced

            if (taskInfo.adultPopulation > 0) {
                if (task === 'hunting') {
                    // Apply seasonal bonus/penalty for hunting
                    const huntingFactor = seasonalFactors.hunting[currentSeason];
                    // Example: 50% chance of success for hunting
                    let success = Math.random() < 0.25;
                    if (success) {
                        foodProduced = taskInfo.adultPopulation * taskInfo.foodPerTick * (Math.random() * 5.95 + 1) * huntingFactor;
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
                    // Apply seasonal bonus/penalty for gathering
                    const gatheringFactor = seasonalFactors.gathering[currentSeason];
                    // Introduce variability in gathering
                    let variabilityFactor = Math.random() * 0.5 + 0.75; // Random factor between 0.75 and 1.25
                    foodProduced = taskInfo.adultPopulation * taskInfo.foodPerTick * variabilityFactor * gatheringFactor;
                    const gatheringResultsElement = document.getElementById('gathering-results');
                    if (gatheringResultsElement) {
                        gatheringResultsElement.textContent = `Gathering yielded ${foodProduced.toFixed(2)} food.`;
                    }
                }
            }

            totalFoodProduced += foodProduced; // Add the food produced by the current task to the total
        });

        gameState.perishableFood += totalFoodProduced; // Add the total food produced to the perishable food store
    }

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
    const totalPopulation = gameState.men + gameState.women + gameState.children;
    let foodPerPerson = totalFood / totalPopulation;
    console.log(`Before adjustment: Population = ${totalPopulation}, Food Per Person = ${foodPerPerson}`);

    if (foodPerPerson < 1) {
        // Increase hunger level if food per person is less than 1
        gameState.hungerLevel = Math.min(gameState.hungerLevel + 1, 30);
    } else {
        // Decrease hunger level if food per person is 1 or more
        gameState.hungerLevel = Math.max(0, gameState.hungerLevel - 1);
    }

    // Check if hunger level reaches the threshold for population decline
    if (gameState.hungerLevel >= 30) {
        // Reduce population based on hunger level
        const populationLoss = Math.floor(totalPopulation * 0.1); // Example: Lose 10% of the population
        const menLoss = Math.min(gameState.men, Math.floor(populationLoss / 3));
        const womenLoss = Math.min(gameState.women, Math.floor(populationLoss / 3));
        const childrenLoss = Math.min(gameState.children, populationLoss - menLoss - womenLoss);

        gameState.men -= menLoss;
        gameState.women -= womenLoss;
        gameState.children -= childrenLoss;

        // Reset hunger level after population decline
        gameState.hungerLevel = 0;
    }

    console.log(`After adjustment: Men = ${gameState.men}, Women = ${gameState.women}, Children = ${gameState.children}, Hunger Level = ${gameState.hungerLevel}`);

    updateDisplay(); // Ensure this updates your UI to reflect the changes
}

    console.log(`After adjustment: Men = ${gameState.men}, Women = ${gameState.women}, Children = ${gameState.children}, Hunger Level = ${gameState.hungerLevel}`);

    updateDisplay(); // Ensure this updates your UI to reflect the changes

// Function to simulate Population dynamics
export function simulatePopulationDynamics() {
    if (gameState.isGamePaused) return; // Check if the game is paused
    
    // Birth
    for (let i = 0; i < gameState.women; i++) {
        if (Math.random() < 1 / 730) {
            console.log("Birth");
            gameState.children++;
        }
    }

    // Growth
    let childrenBecomingAdults = 0;
    for (let i = 0; i < gameState.children; i++) {
        if (Math.random() < 1 / 3650) {
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
    if (gameState.isGamePaused || gameState.isPopupActive) return; // Check if the game is paused
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