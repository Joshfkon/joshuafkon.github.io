    
    // IINITIAL CONDITIONS / SET VARIABLES

    let isGamePaused = false;
    
    // Global flag to control the game loop execution
    
    let gameLoopInterval;

    let perishableFood = 100;
    let preservedFood = 50;
    let tools =10;
    let men = 10;
    let women = 10;
    let children = 5;
    let population = men + women + children;

    // Assuming adults and children consume food at the same rate for simplicity
    const adultPopulation = men + women; // Or any other calculation that excludes children from task populations
      // Assuming a constant food consumption rate per person
    const foodConsumptionPerPerson = 0.5; // Adjust this value as needed for your game's logic
    const totalFoodConsumption = (adultPopulation + children) * foodConsumptionPerPerson;




    //Time Variables
    let day = 1;
    let year = 0;
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
    let currentSeasonIndex = 0;
    let popupShown = false; // Flag to track if the popup has been shown

    
    const foodPerPerson = 1;

    //One day
    const updateInterval = 5000;

    const spoilageRate = 0.3;
    const spoilageInterval = 30000;
    let preservationRate = 0;

    // Initialize intervals for updating population and resources
    
    setInterval(updateResources, updateInterval);
    setInterval(spoilFood, spoilageInterval);
    
    

    let tasks = {
        hunting: { adultPopulation: 0, foodPerTick: 1, rate: 50 },
        gathering: { adultPopulation: 0, foodPerTick: 1, rate: 50 },
        // Ensure 'rate' is set correctly and represents the desired initial percentage
    };
    



 //** CENTRAL GAME LOOP 
    function startGameLoop() {
        if (gameLoopInterval) {
            console.log("Game loop is already running.");
            return; // Prevent multiple loops from starting
        }
    
        // Define the game loop logic
        function gameLoop() {
            if (!isGamePaused) {
              // Call your game logic functions here in the order that makes sense for your game
        
        console.log("Game loop START");      
        // 1. Update resources based on current tasks, preservation, etc.
        updateResources();
        

        // 2. Adjust the population based on the current food situation
        adjustPopulationForFood();

        // 3. Simulate population dynamics (births, deaths from old age or disease, etc.)
        simulatePopulationDynamics();

        console.log("INCREMENT DAY");   
        incrementTime();

        // Finally, update the UI to reflect the new state after all logic has been processed
        updateDisplay(); // This function should refresh your UI based on the latest game state

      
            }
        }
    
        // Set the game loop to run every second (1000 milliseconds)
        gameLoopInterval = setInterval(gameLoop, 5000);
        console.log("Game loop started.");
    }
    
    function pauseGameLoop() {
        if (gameLoopInterval) {
            clearInterval(gameLoopInterval); // Stop the loop
            gameLoopInterval = null; // Clear the interval ID
            console.log("Game loop paused.");
        }
    }
    
    function resumeGameLoop() {
        if (!gameLoopInterval) {
            startGameLoop(); // Restart the game loop if it's not running
            console.log("Game loop resumed.");
        }
    }
    
    // Example usage:
    document.addEventListener('DOMContentLoaded', function() {
        startGameLoop(); // Start the game loop when the document is ready
    });
    
    // Assuming you have pause and resume buttons in your UI:
   // document.getElementById('pauseButton').addEventListener('click', pauseGameLoop);
    //document.getElementById('resumeButton').addEventListener('click', resumeGameLoop);




 //** FUNCTIONAL FUNCTIONS - I.E. NOT GAME LOGIC

 //Functions to handle popups
    
function showPopup() {
    // Show the popup only if it hasn't been shown yet
    if (!popupShown) {
        document.getElementById('popup-container').style.display = 'flex';
        popupShown = true; // Update the flag so the popup isn't shown again
    }
}

function handleOption(option) {
    // Example result text, customize as needed
    const resultText = "You selected: " + option + ". Here's the outcome...";
    document.getElementById('result-text').textContent = resultText;
    document.getElementById('result-text').style.display = 'block';
    
    // Hide the option buttons
    document.querySelectorAll('#popup-content button:not(#close-button)').forEach(button => {
        button.style.display = 'none';
    });

    // Show the close button
    document.getElementById('close-button').style.display = 'inline-block';
}

function closePopup() {
    document.getElementById('popup-container').style.display = 'none';
    document.getElementById('result-text').style.display = 'none';
    document.getElementById('close-button').style.display = 'none';
    // Reset option buttons for next time
    document.querySelectorAll('#popup-content button:not(#close-button)').forEach(button => {
        button.style.display = 'inline-block';
    });
    popupShown = false; // Allow the popup to be shown again next year
}

 //Function to UpdateDisplay
 
function updateDisplay() {
    if (isGamePaused) return; // Check if the game is paused

    // Update UI for food counts
    document.getElementById('perishable-food-count').textContent = parseFloat(perishableFood).toFixed(2);
    document.getElementById('preserved-food-count').textContent = parseFloat(preservedFood).toFixed(2);

    //document.getElementById('hunting-population').textContent = tasks.hunting.population;
    //document.getElementById('gathering-population').textContent = tasks.gathering.population;


    // Update UI for population counts
    document.getElementById('population-count').textContent = population;
    document.getElementById('men-count').textContent = men;
    document.getElementById('women-count').textContent = women;
    document.getElementById('children-count').textContent = children;

    // Update UI for day, year, and season based on the provided HTML structure
    document.getElementById('day').textContent = day;
    document.getElementById('season').textContent = seasons[currentSeasonIndex];
    document.getElementById('year').textContent = year;

    // Also log to console
    console.log(`Day: ${day}, Season: ${seasons[currentSeasonIndex]}, Year: ${year}, Population: ${population}, Men: ${men}, Women: ${women}, Children: ${children}, Perishable Food: ${perishableFood.toFixed(2)}, Preserved Food: ${preservedFood.toFixed(2)}`);
}


    
// Event Popups Functionallity
    function showPopup() {
        if (!popupShown) {
            document.getElementById('popup-container').style.display = 'flex';
            popupShown = true; // Update the flag so the popup isn't shown again
            isGamePaused = true; // Pause the game
        }
    }
    
    function closePopup() {
        document.getElementById('popup-container').style.display = 'none';
        // Other reset logic here...
        isGamePaused = false; // Resume the game
    }
    
//Expands Population for gender / age breakdown
    document.getElementById("population-label").addEventListener("click", function() {
        console.log("Label clicked"); // Check if this logs when you click
        var detailsDiv = document.getElementById("population-details");
        if (detailsDiv.style.display === "none") {
            detailsDiv.style.display = "block";
            // Optional: Indicate that details are shown, if needed
            // this.textContent = "Population (Hide Details):"; 
        } else {
            detailsDiv.style.display = "none";
            // Optional: Change back the label if you're indicating state with text
            // this.textContent = "Population:";
        }
    });

    // Function to make sure the total number of tasks assigned to the population does not exceed the total population itself 
function adjustTaskAssignments() {
    if (isGamePaused) return; // Check if the game is paused
    let totalAssigned = getTotalAssignedPopulation();
    while (totalAssigned > adultPopulationn) {
        Object.keys(tasks).forEach(taskName => {
            if (tasks[taskName].adultPopulation > 0 && totalAssigned > adultPopulation ) {
                tasks[taskName].adultPopulation  -= 1;
                totalAssigned -= 1;
            }
        });
    }
    updateResourcesDisplay(); // Ensure this updates your UI to reflect the changes.
}

// Function to update task percentages
function updateTaskPercentages() {
    if (isGamePaused) return;

    let totalAdults = men + women; // Ensure these are updated
    Object.keys(tasks).forEach(task => {
        const taskPercentage = tasks[task].rate / 100;
        tasks[task].adultPopulation = Math.floor(totalAdults * taskPercentage);
    });

    updateDisplay();
}



document.getElementById('hunting-rate').addEventListener('input', function(event) {
    tasks.hunting.rate = parseInt(event.target.value, 10);
    updateTaskPercentages();
});

document.getElementById('gathering-rate').addEventListener('input', function(event) {
    tasks.gathering.rate = parseInt(event.target.value, 10);
    updateTaskPercentages();
});


document.getElementById('hunting-rate').addEventListener('input', function(event) {
    tasks.hunting.rate = parseInt(event.target.value, 10);
    document.getElementById('hunting-rate-value').textContent = tasks.hunting.rate + '%';
    updateTaskPercentages();
});

document.getElementById('gathering-rate').addEventListener('input', function(event) {
    tasks.gathering.rate = parseInt(event.target.value, 10);
    document.getElementById('gathering-rate-value').textContent = tasks.gathering.rate + '%';
    updateTaskPercentages();
});


    //ToolTip Fuctionallity
    
    document.addEventListener('DOMContentLoaded', function() {
        // Select all tooltip elements
        var tooltips = document.querySelectorAll('.tooltip');
    
        tooltips.forEach(function(tooltip) {
            // Mouse events
            tooltip.addEventListener('mouseover', showTooltip);
            tooltip.addEventListener('mouseout', hideTooltip);
    
            // Touch events
            tooltip.addEventListener('touchstart', toggleTooltip);
        });
    
        function showTooltip(event) {
            var tooltipText = event.currentTarget.querySelector('.tooltip-text');
            tooltipText.style.visibility = 'visible';
        }
    
        function hideTooltip(event) {
            var tooltipText = event.currentTarget.querySelector('.tooltip-text');
            tooltipText.style.visibility = 'hidden';
        }
    
        function toggleTooltip(event) {
            // Prevent the page from scrolling when you tap the tooltip
            event.preventDefault();
    
            var tooltipText = event.currentTarget.querySelector('.tooltip-text');
            var isTooltipVisible = tooltipText.style.visibility === 'visible';
    
            // Hide all other tooltips
            document.querySelectorAll('.tooltip .tooltip-text').forEach(function(el) {
                el.style.visibility = 'hidden';
            });
    
            // Show or hide the current tooltip based on its previous state
            tooltipText.style.visibility = isTooltipVisible ? 'hidden' : 'visible';
        }
    });
    
//Sliders Functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Define slider inputs and display elements
        const preservationRateInput = document.getElementById('preservation-rate');
        const preservationRateValueDisplay = document.getElementById('preservation-rate-value');
        const huntingRateInput = document.getElementById('hunting-rate');
        const huntingRateValueDisplay = document.getElementById('hunting-rate-value');
        const gatheringRateInput = document.getElementById('gathering-rate');
        const gatheringRateValueDisplay = document.getElementById('gathering-rate-value');
    
        // Function to adjust sliders so their total does not exceed 100%
        function adjustSliders(currentSlider) {
            let sliders = {
                preservation: preservationRateInput,
                hunting: huntingRateInput,
                gathering: gatheringRateInput
            };
    
            let totalRate = Object.values(sliders).reduce((total, slider) => total + parseFloat(slider.value), 0);
    
            if (totalRate > 100) {
                let excess = totalRate - 100;
                Object.keys(sliders).forEach(key => {
                    if (sliders[key] !== currentSlider) {
                        let currentValue = parseFloat(sliders[key].value);
                        let adjustedValue = Math.max(0, currentValue - (excess / (Object.keys(sliders).length - 1)));
                        sliders[key].value = adjustedValue.toFixed(2);
    
                        if (key === 'preservation') {
                            preservationRateValueDisplay.textContent = `${adjustedValue.toFixed(2)}%`;
                            // Adjust your model or state here if needed
                        } else if (key === 'hunting') {
                            huntingRateValueDisplay.textContent = `${adjustedValue.toFixed(2)}%`;
                            // Adjust your model or state here if needed
                        } else if (key === 'gathering') {
                            gatheringRateValueDisplay.textContent = `${adjustedValue.toFixed(2)}%`;
                            // Adjust your model or state here if needed
                        }
                    }
                });
    
                // Optionally, call a function to update other aspects of your application
                // updateTaskPercentages(); 
            }
        }
    
        // Set up event listeners for sliders
        [preservationRateInput, huntingRateInput, gatheringRateInput].forEach(input => {
            input.addEventListener('input', function() {
                let display = input === preservationRateInput ? preservationRateValueDisplay :
                              input === huntingRateInput ? huntingRateValueDisplay :
                              gatheringRateValueDisplay;
    
                display.textContent = `${this.value}%`;
                // Adjust your model or state here if needed
                
                adjustSliders(this);
            });
        });
    
        // Initial display update (optional, if you want to set initial values from the sliders on page load)
        preservationRateValueDisplay.textContent = `${preservationRateInput.value}%`;
        huntingRateValueDisplay.textContent = `${huntingRateInput.value}%`;
        gatheringRateValueDisplay.textContent = `${gatheringRateInput.value}%`;
    });
    
    
  //** GAME LOGIC FUNCTIONS 

  function updateResources() {
    if (isGamePaused) return; // Check if the game is paused

    // Automatically preserve a portion of perishable food
    const amountToPreserveAutomatically = perishableFood * preservationRate;
    perishableFood -= amountToPreserveAutomatically;
    preservedFood += amountToPreserveAutomatically;
    console.log(`${amountToPreserveAutomatically.toFixed(2)} food preserved automatically.`);

    // Proceed with food production from tasks
    Object.keys(tasks).forEach(task => {
        const taskInfo = tasks[task];
        let foodProduced = 0; // Initialize foodProduced

        if (task === 'hunting') {
            // Example: 50% chance of success for hunting
            let success = Math.random() < 0.25;
            if (success) {
                foodProduced = taskInfo.adultPopulation * taskInfo.foodPerTick * (Math.random() * 5.95 + 1);
                document.getElementById('hunt-results').textContent = `Success! Hunt yielded ${foodProduced.toFixed(2)} food.`;
                console.log(`Hunting Population: ${tasks.hunting.adultPopulation}, Food Produced: ${foodProduced}`);
                console.log(`Total adults: ${totalAdults}, Hunting rate: ${tasks.hunting.rate}`);
                console.log(`Assigned hunters: ${tasks.hunting.adultPopulation}`);

            } else {
                foodProduced = 0; // No food produced on failure
                document.getElementById('hunt-results').textContent = "Hunt failed. Better luck next time!";
                console.log(`Hunting Population: ${tasks.hunting.adultPopulation}, Food Produced: ${foodProduced}`);
            }
        } else if (task === 'gathering') {
            // Introduce variability in gathering
            let variabilityFactor = Math.random() * 0.5 + 0.75; // Random factor between 0.75 and 1.25
            foodProduced = taskInfo.adultPopulation * taskInfo.foodPerTick * variabilityFactor;
            document.getElementById('gathering-results').textContent = `Gathering yielded ${foodProduced.toFixed(2)} food.`;
        }

        perishableFood += foodProduced;
    });

    // Food consumption, including children
    const foodConsumptionPerPerson = 1.0; // Example consumption rate
    const totalFoodConsumption = (men + women + children) * foodConsumptionPerPerson;

    // Subtract consumption, starting with perishable food
    if (perishableFood >= totalFoodConsumption) {
        perishableFood -= totalFoodConsumption;
    } else {
        // If perishable food is not enough, use preserved food
        const remainingConsumption = totalFoodConsumption - perishableFood;
        perishableFood = 0; // All perishable food is consumed
        preservedFood = Math.max(preservedFood - remainingConsumption, 0); // Ensure preservedFood doesn't go negative
    }

    updateDisplay(); // Update the UI with the new values
}



 //Population reduced in starvation (add hunger metric that increases mortality rate)
    function adjustPopulationForFood() {
        if (isGamePaused) return; // Check if the game is paused
        const totalFood = perishableFood + preservedFood;
        let foodPerPerson = totalFood / population;
        console.log(`Before adjustment: Population = ${population}, Food Per Person = ${foodPerPerson}`);

    
        while (foodPerPerson < 1 && population > 0) {
            if (children > 0) {
                children--;
            } else if (men > 0 && women > 0) {
                // Try to reduce men and women equally
                men--;
                women--;
            } else if (men > 0) {
                men--;
            } else if (women > 0) {
                women--;
            }
    
            // Update population and recalculate food per person
            population = men + women + children;
            foodPerPerson = (perishableFood + preservedFood) / population;
        }
        console.log(`After decrement: Men = ${men}, Women = ${women}, Children = ${children}, Food Per Person = ${foodPerPerson}`);

        updateDisplay(); // Ensure this updates your UI to reflect the changes
    }

//Function to simulate Population dynamics
    function simulatePopulationDynamics() {
    if (isGamePaused) return; // Check if the game is paused
        // Birth
        for (let i = 0; i < women; i++) {
            if (Math.random() < 1 / 125) {
                console.log("Birth");
                children++;
            }
        }
    
        // Growth
        let childrenBecomingAdults = 0;
        for (let i = 0; i < children; i++) {
            if (Math.random() < 1 / 365) {
                console.log("Adult Ceremody");
                childrenBecomingAdults++;
            }
        }
        children -= childrenBecomingAdults;
        // Assume half of the children become men and half become women, for simplicity
        men += Math.floor(childrenBecomingAdults / 2);
        women += Math.ceil(childrenBecomingAdults / 2);
    
        // Death from Old Age
        ['men', 'women'].forEach(gender => {
            for (let i = 0; i < window[gender]; i++) {
                if (Math.random() < 1 / 10950) {
                    console.log("Old Age Death");
                    window[gender]--;
                }
            }
        });
    
        // Death from Disease - Children
        for (let i = 0; i < children; i++) {
            if (Math.random() < 1 / 1825) {
                children--;
            }
        }
    
        // Death from Disease - Adults
        ['men', 'women'].forEach(gender => {
            for (let i = 0; i < window[gender]; i++) {
                if (Math.random() < 1 / 13140) {
                    window[gender]--;
                }
            }
        });
    
        // Update total population count
        population = men + women + children;
        updateDisplay(); // Make sure the display is updated with the new values
    }
    
   //Function to Increment Time
    function incrementTime() {
        if (isGamePaused) return; // Check if the game is paused
        day++;
        if (day > 364) {
            day = 1; // Reset day to 1
            year++; // Increment year
            currentSeasonIndex = 0; // Optionally reset the season
            popupShown = false; // Reset the popup shown flag each year
        }
    
        if (day % 91 === 0) { // Change season every 91 days
            currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
        }
    
        updateDisplay(); // Make sure the display is updated with the new values
    }













function spoilFood() {
    if (isGamePaused) return; // Check if the game is paused
    let spoiledFood = perishableFood * spoilageRate;
    perishableFood -= spoiledFood; // Reduce perishable food by the spoilage rate
    updateDisplay();
}

function preserveFood(amount) {
    if (isGamePaused) return; // Check if the game is paused
    // Assuming this function is manually called to convert perishable to preserved
    if (perishableFood >= amount) {
        perishableFood -= amount;
        preservedFood += amount;
        updateDisplay();
    } else {
        console.log("Not enough perishable food to preserve.");
    }
}




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

function updateCulturalTraits(cohesiveness, warriorSpirit) {
    document.getElementById('cohesiveness').textContent = cohesiveness;
    document.getElementById('warrior-spirit').textContent = warriorSpirit;
}

// Example usage
updateCulturalTraits(5, 10); // Update with actual values based on game logic