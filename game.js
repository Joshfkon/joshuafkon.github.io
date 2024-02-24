    
    let perishableFood = 0;
    let preservedFood = 5;
    let population = 10;
    const foodPerPerson = 1;
    const updateInterval = 5000;
    const spoilageRate = 0.3;
    const spoilageInterval = 10000;
    let preservationRate = 0;
  // At the beginning of your script, adjust the tasks object to include a rate property
    let tasks = {
    hunting: { population: 0, foodPerTick: 2, rate: 0 }, // Add rate: 0
    gathering: { population: 0, foodPerTick: 1, rate: 0 }, // Add rate: 0
    };



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
        document.getElementById('hunting-rate').addEventListener('input', function() {
            tasks.hunting.rate = this.value / 100;
            updateTaskPercentages(); // Adjust task assignments based on new rates
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('gathering-rate').addEventListener('input', function() {
            tasks.gathering.rate = this.value / 100;
            updateTaskPercentages(); // Adjust task assignments based on new rates
        });
        
    });
    


    // Initialize intervals for updating population and resources
    setInterval(updatePopulation, updateInterval);
    setInterval(updateResources, updateInterval);
    setInterval(spoilFood, spoilageInterval);






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


function updatePopulation() {
    const foodNeeded = population * foodPerPerson;
    if (perishableFood >= foodNeeded) {
        let surplusFood = perishableFood - foodNeeded;
        perishableFood -= foodNeeded;
        
        // Assuming 5 units of surplus food are needed for one new population member
        const surplusThreshold = 5;
        while (surplusFood >= surplusThreshold) {
            surplusFood -= surplusThreshold;
            population += 1; // Increase population
            //perishableFood -= surplusThreshold; // Assume surplus food is consumed for growth
        }
    } else {
        let shortfall = foodNeeded - perishableFood;
        perishableFood = 0;
        if (preservedFood >= shortfall) {
            preservedFood -= shortfall;
        } else {
            preservedFood = 0;
            population = Math.max(0, population - 1); // Prevent negative population
        }
    }
    updateDisplay();
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
        let foodProduced = taskInfo.population * taskInfo.foodPerTick;
        if (task === 'hunting') {
            let success = Math.random() < 0.5; // Example: 50% chance of success
            if (success) {
                foodProduced = taskInfo.population * taskInfo.foodPerTick; // Or some other calculation
                document.getElementById('hunt-results').textContent = `Success! Hunt yielded ${foodProduced.toFixed(2)} food.`;
            } else {
                foodProduced = 0; // No food produced on failure
                document.getElementById('hunt-results').textContent = "Hunt failed. Better luck next time!";
            }
        }
        perishableFood += foodProduced;
    }); // This closing bracket was missing.

    updateDisplay();
}



function assignToTask(hunting) {
    if (population > getTotalAssignedPopulation()) {
        tasks[hunting].population += 1;
        updateResourcesDisplay(); // Implement this if needed or simply call updateDisplay();
    } else {
        console.log("Not enough available population.");
    }
}

function removeFromTask(hunting) {
    if (tasks[hunting].population > 0) {
        tasks[hunting].population -= 1;
        updateResourcesDisplay(); // Implement this if needed or simply call updateDisplay();
    }
}

function assignToTask(gathering) {
    if (population > getTotalAssignedPopulation()) {
        tasks[gathering].population += 1;
        updateResourcesDisplay(); // Implement this if needed or simply call updateDisplay();
    } else {
        console.log("Not enough available population.");
    }
}

function removeFromTask(gathering) {
    if (tasks[gathering].population > 0) {
        tasks[gathering].population -= 1;
        updateResourcesDisplay(); // Implement this if needed or simply call updateDisplay();
    }
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
