import { getTriends } from "./services.js";

const otherFilmsList = document.querySelector('.other-films__list');

const otherFilmsHTML = data => {
    let tempData = '';
    for (let i = 1; i < data.length; i++) {
        const element = data[i];
        tempData += `
            <li class="other-films__item">
                <a class="other-films__link" data-rating="${element.vote_average}">
                    <img class="other-films__img" 
                        src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${element.poster_path}" 
                        alt="постер">
                </a>
            </li>
        `;
    }
    
    otherFilmsList.innerHTML = tempData; 
};

const renderVideo = async () => {
    const data = await getTriends();
    otherFilmsHTML(data.results)
};

export default renderVideo;