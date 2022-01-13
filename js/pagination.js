import {
    getPopular,
    getTop
} from "./services.js";
import renderCard from "./renderCard.js";
import { getTriends } from "./services.js";

const pagePrev = document.querySelector('.page-prev');
const pageNext = document.querySelector('.page-next');
const pageInput = document.querySelector('#page');


const basePages = () => {
    const basePage = {
        page: getPageLS(),

        updatePage(pageNumber) {
            pageNumber = +pageNumber;

            const page = pageNumber;
            basePage.page = page;

            return page;
        },
    }

    function pageInputText(event) {
        event.preventDefault();
        console.log(12);
    }

    function pagePrevClick(event) {
        event.preventDefault();
        if (!(+getPageLS() <= 1)) {
            const prevPage = +getPageLS() - 1;
            basePage.updatePage(prevPage);
            setPageLS();
            console.log(basePage.page);

            const section = JSON.parse(localStorage.getItem('section'));
            const type = JSON.parse(localStorage.getItem('type'));
            getData(section, type, prevPage);
            pageInput.value = prevPage;
        } else {
            console.log('Предыдущих страниц нет');
        }
    }

    function pageNextClick(event) {
        event.preventDefault();
        const nextPage = +getPageLS() + 1;
        basePage.updatePage(nextPage);
        setPageLS();
        console.log(basePage.page);

        const section = JSON.parse(localStorage.getItem('section'));
        const type = JSON.parse(localStorage.getItem('type'));
        getData(section, type, nextPage);
        pageInput.value = nextPage;
    }

    function getData(section, type, page) {
        switch (section) {
            case 'link_triends':
                getTriends('all', 'week', page)
                    .then(data => {
                        console.log('data: ', data);
                        renderCard(data.results, type);
                    });
                break;
            case 'popular-movies':
                getPopular(type, page)
                    .then(data => {
                        console.log('data: ', data);
                        renderCard(data.results, type);
                    });
                break;
            case 'popular-tv':
                getPopular(type, page)
                    .then(data => {
                        console.log('data: ', data);
                        renderCard(data.results, type);
                    });
                break;
            case 'top-movies':
                getTop(type, page)
                    .then(data => {
                        console.log('data: ', data);
                        renderCard(data.results, type);
                    });
                break;
            case 'top-tv':
                getTop(type, page)
                    .then(data => {
                        console.log('data: ', data);
                        renderCard(data.results, type);
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

    /**
     * запись в Local Storage браузера
     */
    function setPageLS() {
        localStorage.setItem('page', JSON.stringify(basePage.page));
    }
    setPageLS();

    pageInput.addEventListener('submit', pageInputText);
    pagePrev.addEventListener('click', pagePrevClick);
    pageNext.addEventListener('click', pageNextClick);
}
export default basePages;