// mapGeneration.js

export function generateMap() {
    const map = document.getElementById('map');
    const terrainTypes = ['lightgreen', 'darkgreen', 'saddlebrown', 'gray', 'sandybrown'];

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
            map.appendChild(cell);
        }
    }
}