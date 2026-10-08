
// Hamburger Menu and Navigation
const hambutton = document.querySelector('#ham-btn');
const navFlex = document.querySelector('.nav-flex');
;

if (hambutton) {
  hambutton.addEventListener('click', () => {
    hambutton.classList.toggle('show');
    if (navFlex) navFlex.classList.toggle('show');
  });
}

