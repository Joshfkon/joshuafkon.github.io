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


setInterval(updatePopulation, updateInterval); // Update population every 5 seconds

