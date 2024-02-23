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
    const foodNeeded = population * foodPerPerson;
    if (food >= foodNeeded) {
        // Enough food for everyone, attempt to grow population
        food -= foodNeeded; // Consume food for existing population
        // Optionally, grow population here if you want automatic growth
    } else {
        // Not enough food, decrease population
        population = Math.max(0, population - (foodNeeded - food)); // Ensure population doesn't go negative
        food = 0; // All available food has been consumed
    }
    updateDisplay();
}

setInterval(updatePopulation, updateInterval); // Update population every 5 seconds

