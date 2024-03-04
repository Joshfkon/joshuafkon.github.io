    
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
    let totalAdults = men + women; // Ensure these are updated

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
    



 