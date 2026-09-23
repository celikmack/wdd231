// Select all open and close buttons
const openBtn = document.querySelectorAll('.open-btn');
const closeBtn = document.querySelectorAll('.close-btn');

// Open the corresponding modal based on the clicked button
openBtn.forEach(button => {
    button.addEventListener('click', () => {
        const data = button.getAttribute('data-modal');
        const modal = document.getElementById(data);
        if (modal) {
            modal.showModal();
        }
    });
});

// Close the corresponding modal
closeBtn.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});

// Display user information on Thankyou page
document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toLocaleString();
    }
});
