// GameEvents.js
// EventTree.js
import { popupsConfig } from './GameEvents.js';
import { gameState } from './gameSetup.js';

// ... (existing code for popupsConfig and adjustCulturalTraits)

export function checkForPopups() {
    if (gameState.isGamePaused) return; // Check if the game is paused

    // Check if a popup has already been shown for the current year
    if (gameState.popupShown) return;

    // Define the probability of triggering an event (adjust as needed)
    const eventProbability = 0.5; // 10% chance of an event occurring each day

    // Check if an event should be triggered based on probability
    if (Math.random() < eventProbability) {
        // Choose a random event from the popupsConfig
        const events = Object.keys(popupsConfig);
        const randomEvent = events[Math.floor(Math.random() * events.length)];

        // Check if the event should be triggered based on cultural traits and tech tree
        if (shouldTriggerEvent(randomEvent)) {
            // Trigger the event popup
            triggerPopup(randomEvent);
            gameState.popupShown = true; // Set the flag to indicate that a popup has been shown for the current year
        }
    }
}

function shouldTriggerEvent(event) {
    // Implement the logic to determine if an event should be triggered based on cultural traits and tech tree
    // For example, you can check if certain cultural traits or technologies are above or below certain thresholds
    // Return true if the event should be triggered, false otherwise

 

    switch (event) {
        case 'drought':
            // Trigger the drought event if the user's agriculture trait is below a certain threshold
            return gameState.perishableFood < 10;
        
        case 'bountifulHarvest':
            return gameState.currentSeasonIndex === 2 && Math.random() < 0.1;

        case 'diseaseOutbreak':
            return gameState.population >= 10 && Math.random() < 0.05;

        case 'traderArrival':
             return gameState.day % 30 === 0 && Math.random() < 0.15;

        case 'fishingOpportunity':
            return (gameState.currentSeasonIndex === 0 || gameState.currentSeasonIndex === 1) && Math.random() < 0.15;


        case 'wildfire':
            return gameState.currentSeasonIndex === 1 && Math.random() < 0.05;
                
        default:
            return false;
    }
}

function triggerPopup(event) {
    // Implement the logic to display the event popup based on the triggered event
    // You can use the data from popupsConfig to populate the popup content
    gameState.isPopupActive = true; // Set the flag to indicate that a popup is active

    const popup = popupsConfig[event];
    // Display the popup using your UI framework or DOM manipulation
    // Example:
    document.getElementById('popup-title').textContent = popup.title;
    document.getElementById('popup-description').textContent = popup.description;

    // Clear existing options
    document.getElementById('popup-options').innerHTML = '';

    // Add new options
    popup.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.addEventListener('click', function handleOptionClick() {
            // Select an outcome based on probabilities
            const randomNumber = Math.random();
            let cumulativeProbability = 0;
            let selectedOutcome = null;

            for (const outcome of option.outcomes) {
                cumulativeProbability += outcome.probability;
                if (randomNumber <= cumulativeProbability) {
                    selectedOutcome = outcome;
                    break;
                }
            }

            if (selectedOutcome) {
                // Handle the selected outcome
                console.log(selectedOutcome.outcome);
                let resultText = selectedOutcome.outcome; // Display the result to the user
                const traitChanges = selectedOutcome.effect();
                if (traitChanges) {
                    resultText += '\n\nCultural Trait Changes:\n' + traitChanges;
                }
                document.getElementById('result-text').textContent = resultText;
                document.getElementById('result-close-button').style.display = 'block'; // Show the close button
                document.getElementById('popup-title').style.display = 'none'; // Hide the popup title
                document.getElementById('popup-description').style.display = 'none'; // Hide the popup description
                // Remove the option buttons
                document.getElementById('popup-options').innerHTML = '';
            } else {
                console.error('No outcome selected for the chosen option.');
            }
        });
        document.getElementById('popup-options').appendChild(button);
    });

    // Show the popup
    document.getElementById('popup-container').style.display = 'block';

    // Add event listener to the close button
    document.getElementById('result-close-button').addEventListener('click', closePopup);
}

function closePopup() {
    // Implement the logic to close the event popup
    // Example:
    document.getElementById('popup-container').style.display = 'none';
    gameState.isPopupActive = false; // Unset the flag when the popup is closed
    document.getElementById('result-text').textContent = ''; // Clear the result text
    document.getElementById('result-close-button').style.display = 'none'; // Hide the close button
    document.getElementById('popup-title').style.display = 'none'; // Hide the popup title
    document.getElementById('popup-description').style.display = 'none'; // Hide the popup description
}
