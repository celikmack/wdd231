// CHAMBER OF COMMERCE PROJECT

// Path to the local members data source
const url = 'data/members.json'; 

// Get randomly 2 gold or silver members
async function getSpotlights() {
    try { 
        // Fetch data from the json file
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const companies = await response.json();
        
        const goldCompanies = companies.filter(company => {
            const level = company.membershipLevel || company.membership || company.membership_level; 
            return level === "Gold";
        });

        const silverCompanies = companies.filter(company => {
            const level = company.membershipLevel || company.membership || company.membership_level; 
            return level === "Silver";
        });

        let chosenPool = [];
        const randomTier = Math.random() < 0.5 ? goldCompanies : silverCompanies;
        
        if (randomTier.length >= 2) {
            chosenPool = randomTier;
        } else {
            chosenPool = goldCompanies.length >= 2 ? goldCompanies : silverCompanies;
        }

        chosenPool.sort(() => 0.5 - Math.random());

        const selectedCompanies = chosenPool.slice(0, 2);

        displaySpotlights(selectedCompanies);

    } catch (error) {
        console.error("Failed to load spotlight companies:", error);
    }
}

// Display company cards 
function displaySpotlights(companies) {
    const container = document.querySelector('.spotlight');
    if (!container) return;

    companies.forEach(company => {
        const card = document.createElement('div');
        card.classList.add('company-card');

        const level = company.membershipLevel || company.membership || company.membership_level;
        const companyUrl = company.url || company.website || "#";
        const cleanUrl = companyUrl.replace(/^https?:\/\//, '');

        card.innerHTML = `
            <h2>${company.name}</h2>
            <div class="card-content">
                <img src="images/${company.image}" alt="${company.name} logo" width="120" height="60" loading="lazy">
                <p>${company.services || company.address || ""}</p>
            </div>
            <p><strong>Homepage:</strong> <a href="https://${cleanUrl}" target="_blank">${companyUrl}</a></p>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Member:</strong> ${level}</p>
        `;

        container.appendChild(card);
    });
}

// Initialize on page load
getSpotlights();