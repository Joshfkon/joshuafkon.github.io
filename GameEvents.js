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
                            adjustCulturalTraits('perishableFood', 20); // Adjust perishableFood separately
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
                            adjustCulturalTraits('animism', 5,);
                            adjustCulturalTraits('sedentary', 5);
                            adjustCulturalTraits('perishableFood', 15); // Adjust perishableFood separately
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
                            adjustCulturalTraits('perishableFood', 35);
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
    },

    'feud': {
        title: "Choose Your Action",
        description: "Members of your tribe are feuding",
        options: [
            {
                text: "Mediate the conflict and seek a peaceful resolution",
                outcomes: [
                    {
                        probability: 0.6,
                        outcome: "Your mediation skills bring peace to the tribe, and your people become more harmonious.",
                        effect: () => {
                            adjustCulturalTraits('cohesion', 10);
                            adjustCulturalTraits('pacifism', 5);
                        }
                    },
                    {
                        probability: 0.4,
                        outcome: "Despite your efforts, the conflict persists, and the tribe remains divided.",
                        effect: () => {
                            adjustCulturalTraits('cohesion', -5);
                        }
                    }
                ]
            },
            {
                text: "Take sides and support one faction over the other",
                outcomes: [
                    {
                        probability: 0.5,
                        outcome: "The faction you support emerges victorious, and your influence grows.",
                        effect: () => {
                            adjustCulturalTraits('authority', 10);
                            adjustCulturalTraits('cohesion', -5);
                        }
                    },
                    {
                        probability: 0.5,
                        outcome: "The faction you support loses, and your reputation suffers.",
                        effect: () => {
                            adjustCulturalTraits('authority', -5);
                            adjustCulturalTraits('cohesion', -10);
                        }
                    }
                ]
            },
            {
                text: "Ignore the conflict and focus on other matters",
                outcomes: [
                    {
                        probability: 0.7,
                        outcome: "The conflict resolves itself without your intervention, but the tribe remains somewhat divided.",
                        effect: () => {
                            adjustCulturalTraits('cohesion', -5);
                        }
                    },
                    {
                        probability: 0.3,
                        outcome: "The conflict escalates, leading to violence and loss of life.",
                        effect: () => {
                            adjustCulturalTraits('cohesion', -15);
                            gameState.population -= 2;
                            updateDisplay();
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

// GameEvents.js

export function adjustCulturalTraits(trait, value) {
    if (gameState.culturalTraits.hasOwnProperty(trait)) {
        const oldValue = gameState.culturalTraits[trait];
        gameState.culturalTraits[trait] += value;
        // Ensure the trait value stays within a valid range (e.g., 0 to 100)
        gameState.culturalTraits[trait] = Math.max(0, Math.min(100, gameState.culturalTraits[trait]));
        const newValue = gameState.culturalTraits[trait];
        console.log(`Adjusted ${trait} by ${value}. New value: ${newValue}`);
        
        return `${trait.charAt(0).toUpperCase() + trait.slice(1)} changed from ${oldValue} to ${newValue}.\n`;
    } else if (trait === 'perishableFood') {
        const oldValue = gameState.perishableFood;
        gameState.perishableFood += value;
        const newValue = gameState.perishableFood;
        console.log(`Adjusted ${trait} by ${value}. New value: ${newValue}`);
        
        return `${trait.charAt(0).toUpperCase() + trait.slice(1)} changed from ${oldValue} to ${newValue}.\n`;
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

