document.addEventListener('DOMContentLoaded', function() {
    // Set preservation rate
    document.getElementById('set-preservation-rate').addEventListener('click', function() {
        const enteredRate = parseFloat(document.getElementById('preservation-rate').value);
        if (!isNaN(enteredRate) && enteredRate >= 0 && enteredRate <= 100) {
            preservationRate = enteredRate / 100; // Convert percentage to a decimal
            console.log(`Preservation rate set to ${preservationRate * 100}%`);
        } else {
            alert('Please enter a valid preservation rate between 0 and 100.');
        }
    });

    // Gather food button
    document.getElementById('gather-food').addEventListener('click', function() {
        perishableFood += 1;
        updateDisplay();
    });

    // Increase population button
    document.getElementById('buy-population').addEventListener('click', function() {
        if (perishableFood >= 10) {
            perishableFood -= 10;
            population += 1;
            updateDisplay();
        }
    });

    // Task assignment buttons
    document.getElementById('assign-hunting').addEventListener('click', function() {
        assignToTask('hunting');
    });
    document.getElementById('remove-hunting').addEventListener('click', function() {
        removeFromTask('hunting');
    });
    document.getElementById('assign-gathering').addEventListener('click', function() {
        assignToTask('gathering');
    });
    document.getElementById('remove-gathering').addEventListener('click', function() {
        removeFromTask('gathering');
    });

    // Initialize intervals for updating population and resources
    setInterval(updatePopulation, updateInterval);
    setInterval(updateResources, updateInterval);
    setInterval(spoilFood, spoilageInterval);
});

let perishableFood = 0;
let preservedFood = 0;
let population = 0;
const foodPerPerson = 1;
const updateInterval = 5000;
const spoilageRate = 0.3;
const spoilageInterval = 10000;
let preservationRate = 0;

function updateDisplay() {
    document.getElementById('perishable-food-count').textContent = perishableFood;
    document.getElementById('preserved-food-count').textContent = preservedFood;
    document.getElementById('population-count').textContent = population;
}

function updatePopulation() {
    // Your existing logic for updating the population
}

function spoilFood() {
    // Your existing logic for spoiling food
}

function preserveFood(amount) {
    // Your existing logic for preserving food
}

function updateResources() {
    // Your existing logic for updating resources, including automatic preservation
}

let tasks = {
    hunting: { population: 0, foodPerTick: 2 },
    gathering: { population: 0, foodPerTick: 1 },
};

function assignToTask(taskName) {
    // Your logic for assigning a population to a task
}

function removeFromTask(taskName) {
    // Your logic for removing a population from a task
}

function updateResourcesDisplay() {
    // Update the display for resources, if necessary
}

function getTotalAssignedPopulation() {
    // Calculate and return the total assigned population
    return Object.values(tasks).reduce((total, task) => total + task.population, 0);
}
