


const url = 'data/members.json'; 
const cardsContainer = document.querySelector('#cards');

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
    
    cardsContainer.innerHTML = '';

    companies.forEach((company, index) => {
        let card = document.createElement('section');
        card.classList.add('company-card');

        const loadingAttr = index === 0 ? 'eager' : 'lazy';

        card.innerHTML = `
            <h2>${company.name}</h2>
            <div class="card-content">
                <img src="images/${company.image}" alt="${company.name} logo" width="120" height="60" loading="${loadingAttr}">
                <p>${company.services}</p>
            </div>
            <div class="info">
                <p><strong>Homepage:</strong> <a href="https://${company.url.replace(/^https?:\/\//, '')}" target="_blank">${company.url}</a></p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Member: <strong> ${company.membership_level}</p>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

if (cardsContainer) {
    getCompaniesData();
}

const gridButton = document.querySelector('#grid-screen');
const listButton = document.querySelector('#list-screen');

if (gridButton && listButton && cardsContainer) {
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
