// mapGeneration.js
import { gameState } from './gameSetup.js';

export function generateGeographyGrid() {
    const geographyTypes = ['Hills', 'Mountains', 'Forest', 'Temperate'];
    const numCells = 6 * 6; // Assuming a 6x6 grid
    const geographyGrid = [];

    for (let i = 0; i < numCells; i++) {
        geographyGrid.push(geographyTypes[Math.floor(Math.random() * geographyTypes.length)]);
    }

    return geographyGrid;
}

export function renderTribeLocation() {
    const tribeMarker = document.querySelector('.tribe-marker');

    if (tribeMarker) {
        const population = gameState.population;
        tribeMarker.textContent = population;
    } else {
        console.error("Tribe marker not found.");
    }
}
export function generateClimate() {
    const climateTypes = ['Tropical', 'Desert', 'Subtropical'];
    return climateTypes[Math.floor(Math.random() * climateTypes.length)];
}

export function generateFauna() {
    const largePrey = ['Deer', 'Elk', 'Bison', 'Gazelle'];
    const largePredators = ['Lion', 'Tiger', 'Bear', 'Wolf'];
    return {
        largePrey: largePrey[Math.floor(Math.random() * largePrey.length)],
        largePredators: largePredators[Math.floor(Math.random() * largePredators.length)]
    };
}

export function generateMap(tribePositionX, tribePositionY) {
    const map = document.getElementById('map');

    if (map) {
        const geographyGrid = gameState.geographyGrid;
        const terrainColors = {
            Hills: 'lightgreen',
            Mountains: 'gray',
            Forest: 'darkgreen',
            Temperate: 'sandybrown'
        };

        let index = 0;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.backgroundColor = terrainColors[geographyGrid[index]];

                if (i === tribePositionX && j === tribePositionY) {
                    const tribeMarker = document.createElement('div');
                    tribeMarker.className = 'tribe-marker';
                    cell.appendChild(tribeMarker);
                }

                map.appendChild(cell);
                index++;
            }
        }
    } else {
        console.error("Element with ID 'map' not found.");
    }
}