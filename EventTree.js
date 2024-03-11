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
            return gameState.culturalTraits.agriculture < 50;
        // Add more cases for other events and their triggering conditions
        default:
            return false;
    }
}

function triggerPopup(event) {
    // Implement the logic to display the event popup based on the triggered event
    // You can use the data from popupsConfig to populate the popup content

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
        button.addEventListener('click', () => {
            // Handle the selected option
            console.log(option.outcome);
            option.effect();
            // Close the popup
            closePopup();
        });
        document.getElementById('popup-options').appendChild(button);
    });
    // Show the popup
    document.getElementById('popup-container').style.display = 'block';
}

function closePopup() {
    // Implement the logic to close the event popup
    // Example:
    document.getElementById('popup-container').style.display = 'none';
}