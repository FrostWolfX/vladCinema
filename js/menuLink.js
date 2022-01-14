import {
    getPopular,
    getTop
} from "./services.js";
import renderCard from "./renderCard.js";
import { getTriends } from "./services.js";

const title = document.querySelector('.other-films__title');
const filmWeek = document.querySelector('.film-week');
const getNav = document.querySelectorAll('.get-nav');
const pageInput = document.querySelector('#page');

const menuLink = () => {
    getNav.forEach(nav => {
        nav.addEventListener('click', (event) => {

            const target = event.target.closest('.get-nav__link');
            if (target) {
                //event.preventDefault();
                filmWeek.style.display = 'none';
                title.textContent = target.textContent;

                if (target.classList.contains('get-nav__link_triends')) {
                    getTriends()
                        .then(data => {
                            renderCard(data.results);

                            localStorage.setItem('section', JSON.stringify('link_triends'));
                            localStorage.setItem('type', JSON.stringify(''));
                            localStorage.setItem('page', JSON.stringify(1));
                            pageInput.value = 1;
                        });
                }

                if (target.classList.contains('get-nav__link_popular-movies')) {
                    getPopular('movie')
                        .then(data => {
                            renderCard(data.results, 'movie');
                            localStorage.setItem('section', JSON.stringify('popular-movies'));
                            localStorage.setItem('type', JSON.stringify('movie'));
                            localStorage.setItem('page', JSON.stringify(1));
                            pageInput.value = 1;
                        });
                }
                if (target.classList.contains('get-nav__link_popular-tv')) {
                    getPopular('tv')
                        .then(data => {
                            renderCard(data.results, 'tv');
                            localStorage.setItem('section', JSON.stringify('popular-tv'));
                            localStorage.setItem('type', JSON.stringify('tv'));
                            localStorage.setItem('page', JSON.stringify(1));
                            pageInput.value = 1;
                        });
                }

                if (target.classList.contains('get-nav__link_top-movies')) {
                    getTop('movie')
                        .then(data => renderCard(data.results, 'movie'));
                    localStorage.setItem('section', JSON.stringify('top-movies'));
                    localStorage.setItem('type', JSON.stringify('movie'));
                    localStorage.setItem('page', JSON.stringify(1));
                    pageInput.value = 1;
                }
                if (target.classList.contains('get-nav__link_top-tv')) {
                    getTop('tv')
                        .then(data => renderCard(data.results, 'tv'));
                    localStorage.setItem('section', JSON.stringify('top-tv'));
                    localStorage.setItem('type', JSON.stringify('tv'));
                    localStorage.setItem('page', JSON.stringify(1));
                    pageInput.value = 1;
                }
            }
        });
    });
};

export default menuLink;