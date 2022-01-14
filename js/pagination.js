import {
    getPopular,
    getTop
} from "./services.js";
import renderCard from "./renderCard.js";
import { getTriends } from "./services.js";

const pagePrev = document.querySelector('.page-prev');
const pageNext = document.querySelector('.page-next');
const paginationForm = document.querySelector('.pagination-form');
const pageInput = document.querySelector('#page');

const filmWeek = document.querySelector('.film-week');


const basePages = () => {
    const basePage = {
        page: getPageLS(),
        section: getSectionLS(),

        updatePage(pageNumber) {
            pageNumber = +pageNumber;

            const page = pageNumber;
            basePage.page = page;

            return page;
        },
    }

    const pageInputText = async(event) => {
        event.preventDefault();
        filmWeek.style.display = 'none';
        const page = +pageInput.value;
        if (typeof(page) === 'number') {
            const section = JSON.parse(localStorage.getItem('section'));
            const type = JSON.parse(localStorage.getItem('type'));

            const data = await getData(section, type, page);

            if (page > 0 && data !== undefined) {
                if (page <= data.total_pages) {
                    basePage.updatePage(page);
                    setPageLS();

                    getData(section, type, page);
                    pageInput.value = page;
                }
            }
        } else {
            console.log('не число или страницы не существует');
        }

    }

    function pagePrevClick(event) {
        //event.preventDefault();
        filmWeek.style.display = 'none';
        if (!(+getPageLS() <= 1)) {
            const prevPage = +getPageLS() - 1;
            basePage.updatePage(prevPage);
            setPageLS();

            const section = JSON.parse(localStorage.getItem('section'));
            const type = JSON.parse(localStorage.getItem('type'));
            getData(section, type, prevPage);
            pageInput.value = prevPage;
        } else {
            console.log('Предыдущих страниц нет');
        }
    }

    function pageNextClick(event) {
        //event.preventDefault();
        filmWeek.style.display = 'none';
        const nextPage = +getPageLS() + 1;
        basePage.updatePage(nextPage);
        setPageLS();

        const section = JSON.parse(localStorage.getItem('section'));
        const type = JSON.parse(localStorage.getItem('type'));
        getData(section, type, nextPage);
        pageInput.value = nextPage;
    }

    const getData = async(section, type, page) => {
        console.log('section: ', section);
        switch (section) {
            case 'link_triends':
                return await getTriends('all', 'week', page)
                    .then(data => {
                        if (data) {
                            renderCard(data.results, type);
                        }
                        return data;
                    });
                break;
            case 'popular-movies':
                return await getPopular(type, page)
                    .then(data => {
                        if (data) {
                            renderCard(data.results, type);
                        }
                        return data;
                    });
                break;
            case 'popular-tv':
                return await getPopular(type, page)
                    .then(data => {
                        if (data) {
                            renderCard(data.results, type);
                        }
                        return data;
                    });
                break;
            case 'top-movies':
                return await getTop(type, page)
                    .then(data => {
                        if (data) {
                            renderCard(data.results, type);
                        }
                        return data;
                    });
                break;
            case 'top-tv':
                return await getTop(type, page)
                    .then(data => {
                        if (data) {
                            renderCard(data.results, type);
                        }
                        return data;
                    });
                break;

            default:
                break;
        }
    }


    /**
     * прочитать из Local Storage браузера
     */
    function getPageLS() {
        if (localStorage.getItem('page')) {
            return JSON.parse(localStorage.getItem('page'));
        }
        return 1;
    }

    function getSectionLS() {
        if (localStorage.getItem('section')) {
            return JSON.parse(localStorage.getItem('section'));
        }
        return 'link_triends';
    }

    /**
     * запись в Local Storage браузера
     */
    function setPageLS() {
        localStorage.setItem('page', JSON.stringify(basePage.page));
    }
    setPageLS();

    function setSectionLS() {
        localStorage.setItem('section', JSON.stringify(basePage.section));
    }
    setSectionLS();

    paginationForm.addEventListener('submit', pageInputText);
    pagePrev.addEventListener('click', pagePrevClick);
    pageNext.addEventListener('click', pageNextClick);
}
export default basePages;