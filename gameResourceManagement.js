 //** GAME LOGIC FUNCTIONS 
    //One day
    const updateInterval = 5000;
 setInterval(updateResources, updateInterval);

 export function updateResources() {
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
 export function adjustPopulationForFood() {
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
export function simulatePopulationDynamics() {
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
   export function incrementTime() {
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













    export function spoilFood() {
    if (isGamePaused) return; // Check if the game is paused
    let spoiledFood = perishableFood * spoilageRate;
    perishableFood -= spoiledFood; // Reduce perishable food by the spoilage rate
    updateDisplay();
}

export function preserveFood(amount) {
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

