// updateResources.test.js

import { gameState } from './gameSetup.js';
import { updateResources } from './gameResourceManagement.js';

// Test case 1
console.log('Test case 1: Preserve a portion of perishable food automatically');
const initialPerishableFood = gameState.perishableFood;
const initialPreservedFood = gameState.preservedFood;
updateResources();
console.assert(gameState.perishableFood < initialPerishableFood, 'Perishable food should decrease after updating resources');
console.assert(gameState.preservedFood > initialPreservedFood, 'Preserved food should increase after updating resources');

// Test case 2
console.log('Test case 2: Produce food from hunting and gathering tasks');
gameState.tasks.hunting.adultPopulation = 5;
gameState.tasks.gathering.adultPopulation = 5;
updateResources();
console.assert(gameState.perishableFood > initialPerishableFood, 'Perishable food should increase after updating resources with hunting and gathering tasks');

// Test case 3
console.log('Test case 3: Consume food based on population size');
updateResources();
console.assert(gameState.perishableFood < initialPerishableFood, 'Perishable food should decrease after consumption');
console.assert(gameState.preservedFood <= initialPreservedFood, 'Preserved food should decrease or remain the same after consumption');

// Test case 4
console.log('Test case 4: Do not update resources when the game is paused');
gameState.isGamePaused = true;
const pausedPerishableFood = gameState.perishableFood;
const pausedPreservedFood = gameState.preservedFood;
updateResources();
console.assert(gameState.perishableFood === pausedPerishableFood, 'Perishable food should not change when the game is paused');
console.assert(gameState.preservedFood === pausedPreservedFood, 'Preserved food should not change when the game is paused');