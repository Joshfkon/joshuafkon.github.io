    
    let perishableFood = 0;
    let preservedFood = 5;
    let men = 10;
    let women = 10;
    let children = 2;
    let population = men + women + children;

    const foodPerPerson = 1;
    const updateInterval = 10000;
    const spoilageRate = 0.3;
    const spoilageInterval = 20000;
    let preservationRate = 0;
  // At the beginning of your script, adjust the tasks object to include a rate property
    let tasks = {
    hunting: { population: 0, foodPerTick: 2.5, rate: 0 }, // Add rate: 0
    gathering: { population: 0, foodPerTick: 1.2, rate: 0 }, // Add rate: 0
    };

    document.getElementById("population-label").addEventListener("click", function() {
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
    


    document.addEventListener('DOMContentLoaded', function() {
    const preservationRateInput = document.getElementById('preservation-rate');
    const preservationRateValueDisplay = document.getElementById('preservation-rate-value');

        // Update the display value in real-time as the slider moves
        preservationRateInput.addEventListener('input', function() {
            preservationRateValueDisplay.textContent = `${this.value}%`;
            // Optionally, update the preservation rate in real-time as well
            preservationRate = this.value / 100;
        });

        // Optionally, remove the "Set Rate" button if real-time update is sufficient
        // document.getElementById('set-preservation-rate').addEventListener('click', function() {
        //     console.log(`Preservation rate set to ${preservationRate * 100}%`);
        // });

        // Initialization - display the initial slider value on page load
        preservationRateValueDisplay.textContent = `${preservationRateInput.value}%`;
    });

    
    

    // Gather food button
   // document.getElementById('gather-food').addEventListener('click', function() {
    //    perishableFood += 1;
      //  updateDisplay();
   // });

    // Increase population button
   // document.getElementById('buy-population').addEventListener('click', function() {
 //       if (perishableFood >= 10) {
  //          perishableFood -= 10;
   //         population += 1;
   //         updateDisplay();
   //     }
   // });

    // Task assignment buttons
    // Event listener for the hunting rate slider
    document.addEventListener('DOMContentLoaded', function() {
        const huntingRateInput = document.getElementById('hunting-rate');
        const huntingRateValueDisplay = document.getElementById('hunting-rate-value');
    
        huntingRateInput.addEventListener('input', function() {
            huntingRateValueDisplay.textContent = `${this.value}%`;
            tasks.hunting.rate = this.value / 100;
            updateTaskPercentages(); // Adjust task assignments based on new rates
        });
    
        const gatheringRateInput = document.getElementById('gathering-rate');
        const gatheringRateValueDisplay = document.getElementById('gathering-rate-value');
    
        gatheringRateInput.addEventListener('input', function() {
            gatheringRateValueDisplay.textContent = `${this.value}%`;
            tasks.gathering.rate = this.value / 100;
            updateTaskPercentages(); // Adjust task assignments based on new rates
        });
    
        // Initialization - display the initial slider values on page load
        huntingRateValueDisplay.textContent = `${huntingRateInput.value}%`;
        gatheringRateValueDisplay.textContent = `${gatheringRateInput.value}%`;
    });
    
    


    // Initialize intervals for updating population and resources
    setInterval(updatePopulation, updateInterval);
    setInterval(updateResources, updateInterval);
    setInterval(spoilFood, spoilageInterval);



    function adjustPopulationForFood() {
        const totalFood = perishableFood + preservedFood;
        let foodPerPerson = totalFood / population;
    
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
    }
    function simulatePopulationDynamics() {
        // Birth
        for (let i = 0; i < women; i++) {
            if (Math.random() < 1 / 125) {
                children++;
            }
        }
    
        // Growth
        let childrenBecomingAdults = 0;
        for (let i = 0; i < children; i++) {
            if (Math.random() < 1 / 365) {
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
    

function updateDisplay() {
    document.getElementById('perishable-food-count').textContent = parseFloat(perishableFood).toFixed(2);
    document.getElementById('preserved-food-count').textContent = parseFloat(preservedFood).toFixed(2);
    document.getElementById('population-count').textContent = population;
}

// Function to update task percentages
function updateTaskPercentages() {
    const totalPopulation = population;
    Object.keys(tasks).forEach(task => {
        const taskPercentage = tasks[task].rate;
        tasks[task].population = Math.floor(totalPopulation * taskPercentage);
    });
    updateDisplay(); // Make sure this function updates UI to reflect task population changes
}

function adjustTaskAssignments() {
    let totalAssigned = getTotalAssignedPopulation();
    while (totalAssigned > population) {
        Object.keys(tasks).forEach(taskName => {
            if (tasks[taskName].population > 0 && totalAssigned > population) {
                tasks[taskName].population -= 1;
                totalAssigned -= 1;
            }
        });
    }
    updateResourcesDisplay(); // Ensure this updates your UI to reflect the changes.
}

document.addEventListener('DOMContentLoaded', function() {
    let day = 1;
    let year = 0;
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
    let currentSeasonIndex = 0;

    function updateDisplay() {
        document.getElementById('day').textContent = day;
        document.getElementById('season').textContent = seasons[currentSeasonIndex];
        document.getElementById('year').textContent = year;
    }

    function incrementTime() {
        day++;
        if (day > 364) {
            day = 1; // Reset day to 1
            year++; // Increment year
        }

        if (day % 91 === 0) { // Change season every 91 days
            currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length; // Cycle through the seasons
        }

        updateDisplay(); // Update the display with the new day, season, and year
    }

    setInterval(incrementTime, 10000); // Increment time every 10 seconds
    updateDisplay(); // Initialize display
});



function updatePopulation() {
    const foodNeeded = population * foodPerPerson;
    if (perishableFood >= foodNeeded) {
        let surplusFood = perishableFood - foodNeeded;
        perishableFood -= foodNeeded;
        
        // Assuming 5 units of surplus food are needed for one new population member
        const surplusThreshold = 5;
        while (surplusFood >= surplusThreshold) {
            surplusFood -= surplusThreshold;
            population += women - children; // Modify population based on women and children
            perishableFood -= surplusThreshold;
        }
    } else {
        let shortfall = foodNeeded - perishableFood;
        perishableFood = 0;
        if (preservedFood >= shortfall) {
            preservedFood -= shortfall;
        } else {
            shortfall -= preservedFood;
            preservedFood = 0;
            // For every unit of shortfall, reduce the population, not just by 1
            const peoplePerFoodUnit = 1; // How many people are affected per unit of food shortfall
            population = Math.max(0, population - Math.ceil(shortfall / peoplePerFoodUnit)); // Adjust for more realistic decline
        }
    }
    updateDisplay(); // Make sure this function updates your display with the new values
}

// Assuming you have a function to periodically call updatePopulation
setInterval(updatePopulation, 270000);

function updateDisplay() {
    console.log(`Population: ${population}, Perishable Food: ${perishableFood}, Preserved Food: ${preservedFood}`);
}



function spoilFood() {
    let spoiledFood = perishableFood * spoilageRate;
    perishableFood -= spoiledFood; // Reduce perishable food by the spoilage rate
    updateDisplay();
}

function preserveFood(amount) {
    // Assuming this function is manually called to convert perishable to preserved
    if (perishableFood >= amount) {
        perishableFood -= amount;
        preservedFood += amount;
        updateDisplay();
    } else {
        console.log("Not enough perishable food to preserve.");
    }
}

function updateResources() {
    // Automatically preserve a portion of perishable food based on the user-set preservation rate
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
            let success = Math.random() < 0.5;
            if (success) {
                foodProduced = taskInfo.population * taskInfo.foodPerTick;
                document.getElementById('hunt-results').textContent = `Success! Hunt yielded ${foodProduced.toFixed(2)} food.`;
            } else {
                foodProduced = 0; // No food produced on failure
                document.getElementById('hunt-results').textContent = "Hunt failed. Better luck next time!";
            }
        } else if (task === 'gathering') {
            // Introduce variability in gathering
            let variabilityFactor = Math.random() * 0.5 + 0.75; // Random factor between 0.75 and 1.25
            foodProduced = taskInfo.population * taskInfo.foodPerTick * variabilityFactor;
            // Optionally, display gathering results if you have a dedicated element for it
            // document.getElementById('gathering-results').textContent = `Gathered ${foodProduced.toFixed(2)} food.`;
        }

        perishableFood += foodProduced;
    });

    updateDisplay();
}



function updateResourcesDisplay() {
    // Implement based on your UI needs. For example:
    document.getElementById('hunting-pop').textContent = tasks.hunting.population;
    document.getElementById('gathering-pop').textContent = tasks.gathering.population;
    // Add more tasks as needed
}

function getTotalAssignedPopulation() {
    return Object.values(tasks).reduce((total, task) => total + task.population, 0);
}

function updateCulturalTraits(cohesiveness, warriorSpirit) {
    document.getElementById('cohesiveness').textContent = cohesiveness;
    document.getElementById('warrior-spirit').textContent = warriorSpirit;
}

// Example usage
updateCulturalTraits(5, 10); // Update with actual values based on game logic