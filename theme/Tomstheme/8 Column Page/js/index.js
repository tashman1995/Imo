///////////////////////////////////////////
// NAVBAR SHOW ON SCROLL UP
///////////////////////////////////////////

const nav = document.getElementById('nav')
const logo = document.querySelector('.nav__logo');

let previousScroll = 0;

window.addEventListener('scroll', () => {
    let currentScroll = document.documentElement.scrollTop;
    if(currentScroll <= 0 || currentScroll < previousScroll) //If top of the page is hit, show navbar
    {
        nav.classList.remove('nav--hidden')
    } else if (currentScroll > 80) {
        nav.classList.add('nav--hidden')
    }
    previousScroll = currentScroll;
})



