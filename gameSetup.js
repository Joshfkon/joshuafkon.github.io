// gameSetup.js

// Initial game state and configuration
let gameState = {
    isGamePaused: false,
    gameLoopInterval: null,
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

    culturalTraits: {
        agriculture: 50,
        resilience: 50,
        exploration: 50,
        faith: 50,
        warfare: 50,
        diplomacy: 50,
        // Add more cultural traits as needed
},
}
// Export the gameState object
export { gameState };