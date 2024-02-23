let food = 0;
let population = 0;

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