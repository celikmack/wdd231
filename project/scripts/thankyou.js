// Get the user informaton
const userInfo = new URLSearchParams(window.location.search);

const formType = userInfo.get('formType');

const results = document.querySelector('.results');
const heading = document.querySelector('h1');
const intro = document.querySelector('.thankyou p');

// Cofirmation message for Contatc Form
if (formType === 'contact') {

    heading.textContent = 'Thanks for your message!';

    intro.textContent =
        'We guarantee that your data will be kept confidential in the event of a report regarding animal abuse or trafficking.';

    results.innerHTML = `
        <ul>
            <li><strong>Name:</strong> ${userInfo.get('full-name')}</li>
            <li><strong>Email:</strong> ${userInfo.get('email')}</li>
            <li><strong>Phone Number:</strong> ${userInfo.get('phone')}</li>
            <li><strong>Subject:</strong> ${userInfo.get('subject')}</li>
        </ul>
    `;

// Cofirmation message for Donation Form
} else if (formType === 'donation') {

    heading.textContent = 'Thank You for Your Support!';

    intro.textContent =
        'Your contribution helps us protect Brazil\'s wildlife and their habitats.';

    results.innerHTML = `
        <ul>
            <li><strong>Donation Type:</strong> ${userInfo.get('frequency')}</li>
            <li><strong>Card Type:</strong> ${userInfo.get('card-type')}</li>
        </ul>
    `;
}


