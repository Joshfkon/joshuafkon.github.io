// updateResources.test.js

import { JSDOM } from 'jsdom';
import { gameState } from './gameSetup.js';
import { updateResources } from './gameResourceManagement.js';

// Set up the DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <div id="hunt-results"></div>
    <div id="gathering-results"></div>
</body></html>`);
global.document = dom.window.document;

// Test case 1
test('Preserve a portion of perishable food automatically', () => {
    const initialPerishableFood = gameState.perishableFood;
    const initialPreservedFood = gameState.preservedFood;
    updateResources();
    expect(gameState.perishableFood).toBeLessThan(initialPerishableFood);
    expect(gameState.preservedFood).toBeGreaterThan(initialPreservedFood);
});

// Test case 2
test('Produce food from hunting and gathering tasks', () => {
    const initialPerishableFood = gameState.perishableFood;
    gameState.tasks.hunting.adultPopulation = 5;
    gameState.tasks.gathering.adultPopulation = 5;
    updateResources();
    expect(gameState.perishableFood).toBeGreaterThan(initialPerishableFood);
});

// Test case 3
test('Consume food based on population size', () => {
    const initialPerishableFood = gameState.perishableFood;
    const initialPreservedFood = gameState.preservedFood;
    updateResources();
    expect(gameState.perishableFood).toBeLessThan(initialPerishableFood);
    expect(gameState.preservedFood).toBeLessThanOrEqual(initialPreservedFood);
});

// Test case 4
test('Do not update resources when the game is paused', () => {
    gameState.isGamePaused = true;
    const pausedPerishableFood = gameState.perishableFood;
    const pausedPreservedFood = gameState.preservedFood;
    updateResources();
    expect(gameState.perishableFood).toBe(pausedPerishableFood);
    expect(gameState.preservedFood).toBe(pausedPreservedFood);
});