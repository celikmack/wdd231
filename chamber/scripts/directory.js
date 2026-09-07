// Fetch JSON and Display Directory Cards 
const url = 'data/members.json'; 
const cardsContainer = document.querySelector('#direct-cards');

async function getCompaniesData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const companies = await response.json();
        displayCompanies(companies);
    } catch (error) {
        console.error('Error fetching company data:', error);
    }
}

function displayCompanies(companies) {
    if (!cardsContainer) return;
    
    // Clear container first
    cardsContainer.innerHTML = '';

    companies.forEach(company => {
        let card = document.createElement('section');
        card.classList.add('company-card');

        card.innerHTML = `
        <div class="card-header">
            <h2>${company.name}</h2>
            <span class="membership-badge ${company.membership_level.toLowerCase()}">${company.membership_level}</span>
        </div>
        <div class="card-body">
            <img src="images/${company.image}" alt="${company.name} logo" loading="lazy">
            <p class="services"><em>${company.services}</em></p>
            <div class="company-details">
                <p class="address"><strong>Address: </strong>${company.address}</p>
                <p class="phone"><strong>Phone: </strong>${company.phone}</p>
            </div>
            <a href="https://${company.url.replace(/^https?:\/\//, '')}" target="_blank" class="website-link">Visit Website &rarr;</a>
        </div>
    `;
        cardsContainer.appendChild(card);
    });
}

// Run the fetch function if we are on the directory page
if (cardsContainer) {
    getCompaniesData();
}

// Grid and List View Toggle 
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

if (gridButton && listButton && cardsContainer) {
    // Default to grid on load
    cardsContainer.classList.add('grid-view');

    gridButton.addEventListener('click', () => {
        cardsContainer.classList.add('grid-view');
        cardsContainer.classList.remove('list-view');
    });

    listButton.addEventListener('click', () => {
        cardsContainer.classList.add('list-view');
        cardsContainer.classList.remove('grid-view');
    });
}