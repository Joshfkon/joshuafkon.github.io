 //** FUNCTIONAL FUNCTIONS - I.E. NOT GAME LOGIC

 //Functions to handle popups
    
import { gameState } from './gameSetup.js';

export function handleOption(option) {
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

export function closePopup() {
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
 
 export function updateDisplay() {
    if (gameState.isGamePaused) return; // Check if the game is paused

    // Update UI for food counts
    document.getElementById('perishable-food-count').textContent = parseFloat(gameState.perishableFood).toFixed(2);
    document.getElementById('preserved-food-count').textContent = parseFloat(gameState.preservedFood).toFixed(2);

    //document.getElementById('hunting-population').textContent = tasks.hunting.population;
    //document.getElementById('gathering-population').textContent = tasks.gathering.population;


    // Update UI for population counts
    document.getElementById('population-count').textContent = gameState.population;
    document.getElementById('men-count').textContent = gameState.men;
    document.getElementById('women-count').textContent = gameState.women;
    document.getElementById('children-count').textContent = gameState.children;

    // Update UI for day, year, and season based on the provided HTML structure
    document.getElementById('day').textContent = day;
    document.getElementById('season').textContent = seasons[currentSeasonIndex];
    document.getElementById('year').textContent = year;

    // Also log to console
    console.log(`Day: ${gameState.day}, Season: ${gameState.seasons[currentSeasonIndex]}, Year: ${gameState.year}, Population: ${gameState.population}, Men: ${gameState.men}, Women: ${gameState.women}, Children: ${gameState.children}, Perishable Food: ${gameState.perishableFood.toFixed(2)}, Preserved Food: ${gameState.preservedFood.toFixed(2)}`);
}


    
// Event Popups Functionallity
export function showPopup() {
        if (!popupShown) {
            document.getElementById('popup-container').style.display = 'flex';
            popupShown = true; // Update the flag so the popup isn't shown again
            gameState.isGamePaused = true; // Pause the game
        }
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
    export function adjustTaskAssignments() {
    if (gameState.isGamePaused) return; // Check if the game is paused
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
export function updateTaskPercentages() {
    if (gameState.isGamePaused) return;

    let totalAdults = gameState.gameState.men + gameState.women; // Ensure these are updated
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
    