// gameSetup.js
import { generateGeography, generateClimate, generateFauna } from './geography.js';


// Initial game state and configuration
let gameState = {
    
    geography: '',
    climate: '',
    fauna: {
        largePrey: '',
        largePredators: ''
    },

    geography: generateGeography(),
    climate: generateClimate(),
    fauna: generateFauna(),
    isGamePaused: false,
    gameLoopInterval: null,
    hungerLevel: 0,
    perishableFood: 100,
    preservationRate: 0,
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
        warriorSpirit: 10,
        pacifism: 5,
        cohesiveness: 50,
        polygamy: 100,
        animism: 50,
        Polytheism: 5,
        nomadic: 50,
        pastoral: 3,
        semiNomadic: 5,
        sedentary: 1,
        resilience:25,
        fatalist: 2,
        // Add more cultural traits as needed
},
techTree: {
    agriculture: 10,
    fire: 100,
    clothing: 100,
    
    // Add more techs as needed
},
}
// Export the gameState object
export { gameState };