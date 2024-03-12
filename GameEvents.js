import { gameState } from './gameSetup.js';

export const popupsConfig = {
    'drought': {
        title: "Choose Your Action",
        description: "Food has grown scarce, and it has not rained for weeks.",
        options: [
            {
                text: "Move to find better conditions elsewhere",
                outcomes: [
                    {
                        probability: 0.7,
                        outcome: "Your tribe finds a fertile land with ample resources. Your people become more resilient.",
                        effect: () => {
                            adjustCulturalTraits('resilience', 10);
                            adjustCulturalTraits('nomadic', 5);
                        }
                    },
                    {
                        probability: 0.3,
                        outcome: "Your tribe struggles to find a suitable new location and loses some of its members.",
                        effect: () => {
                            adjustCulturalTraits('population', -2);
                            adjustCulturalTraits('nomadic', 2);
                        }
                    }
                ]
            },
            {
                text: "Make a Sacrifice to the Cloud Spirit for Rain",
                outcomes: [
                    {
                        probability: 0.6,
                        outcome: "Your sacrifice pleased the Cloud Spirit. Rain rejuvenates your lands, and your people's faith grows stronger.",
                        effect: () => {
                            adjustCulturalTraits('animism', 5, 20);
                            adjustCulturalTraits('sedentary', 5);
                        }
                    },
                    {
                        probability: 0.4,
                        outcome: "The Cloud Spirit is not satisfied with your sacrifice. The drought persists, and your people lose faith.",
                        effect: () => {
                            adjustCulturalTraits('animism', -5);
                            adjustCulturalTraits('sedentary', -2);
                        }
                    }
                ]
            },
            {
                text: "Raid a Neighboring Tribe for their resources",
                outcomes: [
                    {
                        probability: 0.5,
                        outcome: "The raid is successful, and your tribe gains resources and becomes more warlike.",
                        effect: () => {
                            adjustCulturalTraits('warriorSpirit', 10);
                            adjustCulturalTraits('pacifism', -5);
                            adjustCulturalTraits('perishableFood', 15);
                        }
                    },
                    {
                        probability: 0.5,
                        outcome: "The raid fails, and your tribe suffers casualties and damages to its reputation.",
                        effect: () => {
                            adjustCulturalTraits('warriorSpirit', -5);
                            gameState.men = Math.max(0, gameState.men - 3); // Decrease the number of men by 3, ensuring it doesn't go below 0
                            updateDisplay(); // Update the UI to reflect the changes
                        }
                    }
                ]
            }
        ]
    }
};

// GameEvents.js

// GameEvents.js

// GameEvents.js

export function adjustCulturalTraits(trait, value, foodBonus = 0) {
    if (gameState.culturalTraits.hasOwnProperty(trait)) {
        const oldValue = gameState.culturalTraits[trait];
        gameState.culturalTraits[trait] += value;
        // Ensure the trait value stays within a valid range (e.g., 0 to 100)
        gameState.culturalTraits[trait] = Math.max(0, Math.min(100, gameState.culturalTraits[trait]));
        const newValue = gameState.culturalTraits[trait];
        console.log(`Adjusted ${trait} by ${value}. New value: ${newValue}`);
        
        // Add the food bonus to perishable food
        gameState.perishableFood += foodBonus;
        
        return `${trait.charAt(0).toUpperCase() + trait.slice(1)} changed from ${oldValue} to ${newValue}. Perishable food increased by ${foodBonus}.\n`;
    } else {
        console.warn(`Cultural trait '${trait}' not found.`);
        return '';
    }
}



export function updateResourcesDisplay() {
    if (isGamePaused) return; // Check if the game is paused
    // Implement based on your UI needs. For example:
    document.getElementById('hunting-pop').textContent = tasks.hunting.population;
    document.getElementById('gathering-pop').textContent = tasks.gathering.population;
    // Add more tasks as needed
}

export function getTotalAssignedPopulation() {
    if (isGamePaused) return; // Check if the game is paused
    return Object.values(tasks).reduce((total, task) => total + task.population, 0);
}

