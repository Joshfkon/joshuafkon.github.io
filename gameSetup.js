// Initial game state and configuration
const gameState = {
    isGamePaused: false,
    gameLoopInterval = setInterval(gameLoop, 5000);
    perishableFood: 100,
    preservedFood: 50,
    tools: 10,
    men: 10,
    women: 10,
    children: 5,
    // Note: population and totalAdults will be functions to ensure they always return the current value
    get population() {
        return this.men + this.women + this.children;
    },
    get totalAdults() {
        return this.men + this.women;
    },
    foodConsumptionPerPerson: 0.5,
    get totalFoodConsumption() {
        return (this.totalAdults + this.children) * this.foodConsumptionPerPerson;
    },
    day: 1,
    year: 0,
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    currentSeasonIndex: 0,
    popupShown: false,
    foodPerPerson: 1,
    spoilageRate: 0.3,
    spoilageInterval: 30000,
    preservationRate: 0,
    tasks: {
        hunting: { adultPopulation: 0, foodPerTick: 1, rate: 50 },
        gathering: { adultPopulation: 0, foodPerTick: 1, rate: 50 },
    },
};

// Export the gameState object
export { gameState };
