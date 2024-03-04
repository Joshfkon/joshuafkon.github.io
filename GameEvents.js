const popupsConfig = {
    'drought': {
        title: "Choose Your Action",
        description: "Food has grown scarce, and it has not rained for weeks.",
        options: [
            {
                text: "Move to find better conditions elsewhere",
                outcome: "Your tribe finds a fertile land with ample resources. Your people become more resilient.",
                effect: () => {
                    adjustCulturalTraits('resilience', 10); // Adjust resilience by +10
                    adjustCulturalTraits('exploration', 5); // Adjust exploration by +5
                }
            },
            {
                text: "Make a Sacrifice to the Cloud Spirit for Rain",
                outcome: "Your sacrifice pleased the Cloud Spirit. Rain rejuvenates your lands, and your people's faith grows stronger.",
                effect: () => {
                    adjustCulturalTraits('faith', 10); // Adjust faith by +10
                    adjustCulturalTraits('agriculture', 5); // Adjust agriculture by +5
                }
            },
            {
                text: "Raid a Neighboring Tribe for their resources",
                outcome: "The raid is successful, but it leads to ongoing conflicts. Your tribe becomes more warlike.",
                effect: () => {
                    adjustCulturalTraits('warfare', 10); // Adjust warfare by +10
                    adjustCulturalTraits('diplomacy', -5); // Adjust diplomacy by -5
                }
            }
        ]
    }
};

function adjustCulturalTraits(trait, value) {
    // This function would adjust the specified cultural trait by the given value.
    // For demonstration purposes, we'll just log the adjustments to the console.
    console.log(`Adjusted ${trait} by ${value}.`);
}



function updateResourcesDisplay() {
    if (isGamePaused) return; // Check if the game is paused
    // Implement based on your UI needs. For example:
    document.getElementById('hunting-pop').textContent = tasks.hunting.population;
    document.getElementById('gathering-pop').textContent = tasks.gathering.population;
    // Add more tasks as needed
}

function getTotalAssignedPopulation() {
    if (isGamePaused) return; // Check if the game is paused
    return Object.values(tasks).reduce((total, task) => total + task.population, 0);
}

