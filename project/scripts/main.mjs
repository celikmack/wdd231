// Main module
import { renderAnimals } from "./output.mjs";
import { initFilters } from "./filters.mjs";
import { setupModal } from "./modal.mjs";

async function initApp() {
    try {
        // Fetch the local JSON data file asynchronously
        const response = await fetch("./data/animals.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const animals = await response.json();

        // Call the initial render to show all animals on load
        renderAnimals(animals);

        // Initialize the filter buttons with the fetched data
        initFilters(animals);

    } catch (error) {
        console.error("Failed to load animal data:", error);
    }
}

setupModal();
initApp();