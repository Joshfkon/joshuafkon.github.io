let perishableFood = 0;
let preservedFood = 0;
let population = 0;
const foodPerPerson = 1; // Each person consumes 1 food unit per cycle
const updateInterval = 5000; // Update every 5 seconds
const spoilageRate = 0.3; // 10% of perishable food spoils each interval
const spoilageInterval = 10000; // Frequency of spoilage in milliseconds, e.g., every 10 seconds

setInterval(spoilFood, spoilageInterval);

let preservationRate = 0; // Default rate is 0%

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('set-preservation-rate').addEventListener('click', function() {
        const enteredRate = parseFloat(document.getElementById('preservation-rate').value);
        if (!isNaN(enteredRate) && enteredRate >= 0 && enteredRate <= 100) {
            preservationRate = enteredRate / 100; // Convert percentage to a decimal for calculations
            console.log(`Preservation rate set to ${preservationRate * 100}%`);
        } else {
            alert('Please enter a valid preservation rate between 0 and 100.');
        }
    });
});


document.getElementById('gather-food').addEventListener('click', function() {
    perishableFood += 1;
    updateDisplay();
});

document.getElementById('buy-population').addEventListener('click', function() {
    if (perishableFood >= 10) {
        perishableFood-= 10;
        population += 1;
        updateDisplay();
    }
});


function updateDisplay() {
    document.getElementById('perishable-food-count').textContent = perishableFood;
    document.getElementById('preserved-food-count').textContent = preservedFood;
    document.getElementById('population-count').textContent = population;
}

// Automatically update population based on food availability
function updatePopulation() {
    const foodNeeded = population * foodPerPerson;
    if (perishableFood >= foodNeeded) {
        perishableFood -= foodNeeded;
    } else {
        let shortfall = foodNeeded - perishableFood;
        perishableFood = 0; // All perishable food is used
        if (preservedFood >= shortfall) {
            preservedFood -= shortfall; // Use preserved food to cover the shortfall
        } else {
            // Not enough food, population decreases
            preservedFood = 0; // Use up what's left
            population -= 1; // Adjust population decrease based on your game's mechanics
        }
    }
    updateDisplay();
}

function spoilFood() {
    let spoiledFood = perishableFood * spoilageRate;
    perishableFood -= spoiledFood;
    console.log(`${spoiledFood} food spoiled.`);
    updateDisplay(); // Update your display accordingly
}

function preserveFood(amount) {
    if (perishableFood >= amount) {
        perishableFood -= amount;
        preservedFood += amount; // Convert directly for simplicity
        console.log(`${amount} food preserved.`);
    } else {
        console.log("Not enough perishable food to preserve.");
    }
    updateDisplay();
}


// Calculate food production from tasks
function updateResources() {
    // Automatically preserve a portion of perishable food based on the preservation rate
    const amountToPreserve = perishableFood * preservationRate; // Calculate amount based on rate
    perishableFood -= amountToPreserve; // Deduct from perishable
    preservedFood += amountToPreserve; // Add to preserved
    console.log(`${amountToPreserve.toFixed(2)} food preserved automatically.`);

    // Example logic for variable food production from hunting
    for (const task in tasks) {
        const taskInfo = tasks[task];
        if (task === 'hunting') {
            // Generate variable food for hunting
            const baseFoodPerTick = 0; // Minimum food per person per tick
            const variability = 4; // Maximum additional food per person per tick
            let foodFromHunting = 0;
            for (let i = 0; i < taskInfo.population; i++) {
                foodFromHunting += baseFoodPerTick + Math.floor(Math.random() * variability);
            }
            perishableFood += foodFromHunting; // Add to perishable food
        } else {
            // For other tasks, use the fixed foodPerTick value
            perishableFood += taskInfo.population * taskInfo.foodPerTick; // Add to perishable food
        }
    }

    // Update the display to reflect the new amounts of perishable and preserved food
    updateDisplay();
}


setInterval(updatePopulation, updateInterval); // Update population every 5 seconds
setInterval(updateResources, updateInterval); // Optionally update resources at a different interval

let tasks = {
    hunting: { population: 0, foodPerTick: 2 },
    gathering: {population:0, foodPerTick: 1 },

};

function assignToTask(task) {
    if (population > getTotalAssignedPopulation()) {
        tasks[task].population += 1;
        updateResourcesDisplay(); // Remember to implement this
    }
}

function removeFromTask(task) {
    if (tasks[task].population > 0) {
        tasks[task].population -= 1;
        updateResourcesDisplay(); // Remember to implement this
    }
}

function getTotalAssignedPopulation() {
    return Object.values(tasks).reduce((total, task) => total + task.population, 0);
}

function updateResourcesDisplay() {
    for (const task in tasks) {
        document.getElementById(task + '-pop').textContent = tasks[task].population;
    }
}


