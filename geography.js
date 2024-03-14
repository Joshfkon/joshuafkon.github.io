// geography.js

export function generateGeography() {
    const geographyTypes = ['Hills', 'Mountains', 'Forest', 'Temperate'];
    return geographyTypes[Math.floor(Math.random() * geographyTypes.length)];
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