import { places } from '../data/places.mjs';

// Visit modal (Upon opening website)
document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('#visit');
    const message = document.querySelector('#message');
    const closeBtn = dialog.querySelector('.closeBtn');

    const lastVisit = localStorage.getItem('lastVisit');
    const today = Date.now();

    if (!lastVisit) {
        message.textContent = "Welcome! Let us know if you have any questions."
    } else {
        const days = Math.floor(
            (today - Number(lastVisit)) / (1000 * 60 * 60 * 24));

        if (days < 1) {
            message.textContent = 'Back so soon! Awesome!';
        } else if (days === 1) {
            message.textContent = 'You last visited 1 day ago.';
        } else {
            message.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', today);

    dialog.showModal();

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });       
});

// Cards and place modal
console.log(places);

const displayCards = document.querySelector("#card-places");

const modal = document.querySelector("#disc-placeModal");
const closeBtn = document.querySelector("#disc-closeBtn");
const modalTitle = document.querySelector("#disc-modalTitle");
const modalDescrip = document.querySelector("#disc-modalDescrip");
const modalCost = document.querySelector("#disc-modalCost");

function displayPlaces(places) {
    places.forEach((place, index) => {
        const card = document.createElement('div');

        const photo = document.createElement('img');
        photo.src = `images/${place.photo_link}`;
        photo.alt = place.name;

        if (index === 0) {
            photo.setAttribute('fetchpriority', 'high');
        } else {
            photo.setAttribute('loading', 'lazy');
        }

        card.appendChild(photo);

        const title = document.createElement('h2');
        title.innerText = place.name;
        card.appendChild(title);

        const address = document.createElement('address');
        address.innerText = place.address;
        card.appendChild(address);

        const description = document.createElement('p');
        description.innerText = place.short_description;
        card.appendChild(description);

        // Read More button
        const button = document.createElement('button');
        button.textContent = 'Read More';
        button.classList.add('disc-open-btn');

        button.addEventListener('click', () => {
            modalTitle.textContent = place.name;
            modalDescrip.textContent = place.full_description;
            modalCost.textContent = `Cost: ${place.cost}`;
            modal.showModal();
        });

        card.appendChild(button);
        displayCards.appendChild(card);
    });
}

// Close modal
closeBtn.addEventListener('click', () => {
    modal.close();
});

displayPlaces(places);

