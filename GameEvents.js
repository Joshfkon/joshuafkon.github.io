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
    },
    'bountifulHarvest': {
        title: "Bountiful Harvest",
        description: "A particularly good harvest season leads to an abundance of food.",
        options: [
            {
                text: "Celebrate with a feast",
                outcomes: [
                    {
                        probability: 0.8,
                        outcome: "The feast boosts morale and strengthens social bonds.",
                        effect: () => {
                            adjustCulturalTraits('cohesion', 10);
                            adjustCulturalTraits('perishableFood', -20);
                        }
                    },
                    {
                        probability: 0.2,
                        outcome: "The feast depletes food reserves, leaving the tribe vulnerable.",
                        effect: () => {
                            adjustCulturalTraits('perishableFood', -40);
                        }
                    }
                ]
            },
            {
                text: "Store the extra food for later",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The extra food is preserved, providing a buffer against future hardships.",
                        effect: () => {
                            adjustCulturalTraits('perishableFood', 50);
                        }
                    }
                ]
            }
        ]
    },
    'diseaseOutbreak': {
        title: "Disease Outbreak",
        description: "A mysterious disease spreads through the tribe, affecting the population.",
        options: [
            {
                text: "Isolate the sick and provide care",
                outcomes: [
                    {
                        probability: 0.7,
                        outcome: "The disease is contained, and the affected population recovers.",
                        effect: () => {
                            adjustCulturalTraits('population', -5);
                            adjustCulturalTraits('medicine', 10);
                        }
                    },
                    {
                        probability: 0.3,
                        outcome: "Despite efforts, the disease claims many lives.",
                        effect: () => {
                            adjustCulturalTraits('population', -15);
                            adjustCulturalTraits('medicine', 5);
                        }
                    }
                ]
            },
            {
                text: "Perform rituals to appease the spirits",
                outcomes: [
                    {
                        probability: 0.5,
                        outcome: "The rituals provide comfort, but the disease persists.",
                        effect: () => {
                            adjustCulturalTraits('population', -10);
                            adjustCulturalTraits('spirituality', 5);
                        }
                    },
                    {
                        probability: 0.5,
                        outcome: "The rituals have no effect, and the disease spreads further.",
                        effect: () => {
                            adjustCulturalTraits('population', -20);
                            adjustCulturalTraits('spirituality', -5);
                        }
                    }
                ]
            }
        ]
    },
    'traderArrival': {
        title: "Trader Arrival",
        description: "A group of traders arrives at the tribe, offering goods and the opportunity for trade.",
        options: [
            {
                text: "Trade valuable resources for tools and supplies",
                outcomes: [
                    {
                        probability: 0.6,
                        outcome: "The trade is successful, and the tribe acquires useful tools and supplies.",
                        effect: () => {
                            adjustCulturalTraits('tools', 10);
                            adjustCulturalTraits('perishableFood', -20);
                        }
                    },
                    {
                        probability: 0.4,
                        outcome: "The traders drive a hard bargain, and the tribe gains little from the trade.",
                        effect: () => {
                            adjustCulturalTraits('tools', 5);
                            adjustCulturalTraits('perishableFood', -30);
                        }
                    }
                ]
            },
            {
                text: "Decline to trade and send the traders away",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The traders leave peacefully, and the tribe retains its resources.",
                        effect: () => {
                            // No effect
                        }
                    }
                ]
            }
        ]
    },
    'fishingOpportunity': {
        title: "Fishing Opportunity",
        description: "The tribe discovers a rich fishing spot, providing an opportunity to gather additional food.",
        options: [
            {
                text: "Spend time fishing",
                outcomes: [
                    {
                        probability: 0.8,
                        outcome: "The fishing expedition is successful, yielding a bountiful catch.",
                        effect: () => {
                            adjustCulturalTraits('fishing', 10);
                            adjustCulturalTraits('perishableFood', 30);
                        }
                    },
                    {
                        probability: 0.2,
                        outcome: "The fishing expedition yields a modest catch.",
                        effect: () => {
                            adjustCulturalTraits('fishing', 5);
                            adjustCulturalTraits('perishableFood', 10);
                        }
                    }
                ]
            },
            {
                text: "Continue the journey without fishing",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The tribe moves on, missing out on the fishing opportunity.",
                        effect: () => {
                            // No effect
                        }
                    }
                ]
            }
        ]
    },
    'wildfire': {
        title: "Wildfire",
        description: "A wildfire spreads near the tribe's settlement, threatening their safety and resources.",
        options: [
            {
                text: "Attempt to contain the fire",
                outcomes: [
                    {
                        probability: 0.6,
                        outcome: "The tribe successfully contains the fire, minimizing damage.",
                        effect: () => {
                            adjustCulturalTraits('firefighting', 10);
                            adjustCulturalTraits('perishableFood', -10);
                        }
                    },
                    {
                        probability: 0.4,
                        outcome: "The fire proves too strong, and the tribe suffers significant losses.",
                        effect: () => {
                            adjustCulturalTraits('perishableFood', -30);
                            adjustCulturalTraits('population', -5);
                        }
                    }
                ]
            },
            {
                text: "Evacuate the settlement",
                outcomes: [
                    {
                        probability: 0.8,
                        outcome: "The tribe successfully evacuates, avoiding casualties but losing resources.",
                        effect: () => {
                            adjustCulturalTraits('perishableFood', -20);
                            adjustCulturalTraits('tools', -10);
                        }
                    },
                    {
                        probability: 0.2,
                        outcome: "The evacuation is chaotic, and some tribe members are injured.",
                        effect: () => {
                            adjustCulturalTraits('population', -3);
                            adjustCulturalTraits('perishableFood', -15);
                        }
                    }
                ]
            }
        ]
    },
    'birth': {
        title: "A New Life",
        description: "A new child is born into the tribe.",
        options: [
            {
                text: "Celebrate the birth with a feast",
                outcomes: [
                    {
                        probability: 0.8,
                        outcome: "The tribe celebrates the new life, boosting morale and unity.",
                        effect: () => {
                            adjustCulturalTraits('cohesion', 5);
                            adjustCulturalTraits('perishableFood', -10);
                        }
                    },
                    {
                        probability: 0.2,
                        outcome: "The feast depletes food reserves, leaving the tribe hungry.",
                        effect: () => {
                            adjustCulturalTraits('perishableFood', -20);
                        }
                    }
                ]
            },
            {
                text: "Perform a blessing ritual",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The tribe blesses the child, hoping for a prosperous future.",
                        effect: () => {
                            adjustCulturalTraits('spirituality', 5);
                        }
                    }
                ]
            }
        ]
    },
    'adulthood': {
        title: "Coming of Age",
        description: "A child has reached adulthood and is now a contributing member of the tribe.",
        options: [
            {
                text: "Assign the new adult to hunting",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The new adult joins the hunting party, strengthening the tribe's food gathering capabilities.",
                        effect: () => {
                            adjustCulturalTraits('hunting', 5);
                        }
                    }
                ]
            },
            {
                text: "Assign the new adult to gathering",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The new adult contributes to gathering resources, increasing the tribe's food supplies.",
                        effect: () => {
                            adjustCulturalTraits('gathering', 5);
                        }
                    }
                ]
            }
        ]
    },
    'oldAgeDeath': {
        title: "Eternal Rest",
        description: "An elder member of the tribe has passed away due to old age.",
        options: [
            {
                text: "Conduct a burial ceremony",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The tribe honors the elder's memory with a solemn burial ceremony.",
                        effect: () => {
                            adjustCulturalTraits('spirituality', 5);
                            adjustCulturalTraits('cohesion', 5);
                        }
                    }
                ]
            },
            {
                text: "Mourn the loss and move on",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The tribe mourns the elder's passing but focuses on the challenges ahead.",
                        effect: () => {
                            adjustCulturalTraits('resilience', 5);
                        }
                    }
                ]
            }
        ]
    },
    'childDeath': {
        title: "Tragedy Strikes",
        description: "A child has succumbed to disease, leaving the tribe in mourning.",
        options: [
            {
                text: "Perform a healing ritual",
                outcomes: [
                    {
                        probability: 0.6,
                        outcome: "The healing ritual brings comfort to the tribe, but the child cannot be saved.",
                        effect: () => {
                            adjustCulturalTraits('spirituality', 5);
                        }
                    },
                    {
                        probability: 0.4,
                        outcome: "The healing ritual fails to save the child, and the tribe loses faith.",
                        effect: () => {
                            adjustCulturalTraits('spirituality', -5);
                        }
                    }
                ]
            },
            {
                text: "Focus on preventing future deaths",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The tribe learns from the tragedy and takes measures to improve health and hygiene.",
                        effect: () => {
                            adjustCulturalTraits('medicine', 5);
                        }
                    }
                ]
            }
        ]
    },
    'adultDeath': {
        title: "A Warrior Falls",
        description: "An adult member of the tribe has fallen victim to disease.",
        options: [
            {
                text: "Honor the fallen with a warrior's funeral",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The tribe pays tribute to the fallen warrior, boosting morale and unity.",
                        effect: () => {
                            adjustCulturalTraits('cohesion', 5);
                            adjustCulturalTraits('warriorSpirit', 5);
                        }
                    }
                ]
            },
            {
                text: "Intensify training to strengthen the tribe",
                outcomes: [
                    {
                        probability: 1,
                        outcome: "The tribe focuses on training and strengthening its members to prevent future losses.",
                        effect: () => {
                            adjustCulturalTraits('warriorSpirit', 5);
                            adjustCulturalTraits('resilience', 5);
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

