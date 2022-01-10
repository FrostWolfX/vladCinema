
const switchHeader = () => {
    const logoText = document.querySelectorAll('.header__logoText');
    const logo = document.querySelector('.header__logo');
    logo.addEventListener('mouseenter', () => {
        logoText.forEach(element => {
            element.classList.toggle('header__logo-primary');
        });
    });
    logo.addEventListener('mouseleave', () => {
        logoText.forEach(element => {
            element.classList.toggle('header__logo-primary');
        });
    });
}

export default switchHeader;

