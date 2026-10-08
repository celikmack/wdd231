// Get data from array and animal cards
import { renderAnimals } from "./output.mjs";

export function initFilters(animals) {

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const filterType = e.target.dataset.filter;

            if (filterType === "all") {
                renderAnimals(animals);
            } else {
                const filteredAnimals = animals.filter(animal => animal.type === filterType);
                renderAnimals(filteredAnimals);
            }
        });
    });
}