//Get data from dictionaries
import { openFactSheet } from "./modal.mjs";

export function renderAnimals(animalsData) {
    const gridContainer = document.querySelector("#flex-container");
    
    if (!gridContainer) return;
    gridContainer.innerHTML = "";

    const html = animalsData.map((animal, index) => {
        const isEven = index % 2 === 0;
        const cardClass = isEven ? 'card' : 'card-reverse';

    return `
        <div class="${cardClass}">
            <div class="card-header">
                <h3 class="title">${animal.common_name}</h3>
                <p class="subtitle"><em>${animal.scientific_name}</em></p>
            </div>
            <div class="card-body">
                <div class="thumb">
                    <img src="${animal.image}" alt="${animal.common_name}" loading="lazy">
                </div>
                <div class="content">
                    <p class="desc">${animal.description}</p>
                    <button class="button" data-name="${animal.common_name}">Fact Sheet</button>
                </div>
            </div>
        </div>
        `;   
    });

    gridContainer.innerHTML = html.join("");   
    
    const buttons = gridContainer.querySelectorAll(".button");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const animalName = e.target.dataset.name;
            const selectedAnimal = animalsData.find(a => a.common_name === animalName);
            if (selectedAnimal) {
                openFactSheet(selectedAnimal);
            }
        });
    });
}