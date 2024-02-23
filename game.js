let food = 0;
let population = 0;
const foodPerPerson = 1; // Each person consumes 1 food unit per cycle
const updateInterval = 5000; // Update every 5 seconds

document.getElementById('gather-food').addEventListener('click', function() {
    food += 1;
    updateDisplay();
});

document.getElementById('buy-population').addEventListener('click', function() {
    if (food >= 10) {
        food -= 10;
        population += 1;
        updateDisplay();
    }
});

function updateDisplay() {
    document.getElementById('food-count').textContent = food;
    document.getElementById('population-count').textContent = population;
}

// Automatically update population based on food availability
function updatePopulation() {
    console.log("Updating population..."); // Add this line to check if the function runs
    const foodNeeded = population * foodPerPerson;
    if (food >= foodNeeded) {
        food -= foodNeeded; // Consume food for existing population
    } else {
        population = Math.max(0, population - 1); // Decrease population if not enough food
        food = 0; // Assume all available food has been consumed
    }
    updateDisplay();
}

// Calculate food production from tasks
function updateResources() {
    for (const task in tasks) {
        const taskInfo = tasks[task];
        if (task === 'hunting') {
            // Generate variable food for hunting
            const baseFoodPerTick = 1; // Minimum food per person per tick
            const variability = 3; // Maximum additional food per person per tick
            let foodFromHunting = 0;
            for (let i = 0; i < taskInfo.population; i++) {
                foodFromHunting += baseFoodPerTick + Math.floor(Math.random() * variability);
            }
            food += foodFromHunting;
        } else {
            // For other tasks, use the fixed foodPerTick value
            food += taskInfo.population * taskInfo.foodPerTick;
        }
    }
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


