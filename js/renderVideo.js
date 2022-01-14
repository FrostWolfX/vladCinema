import { getTriends, getVideo, getDetails } from "./services.js";
import renderCard from "./renderCard.js";

const filmWeek = document.querySelector('.film-week');

const firstRender = (data, video) => {
        const key = video ? video.key : '';
        const {
            vote_average: voteAverage,
            backdrop_path: backdropPath,
            title,
            name,
            original_title: originalTitle,
            original_name: originalName,

        } = data;
        filmWeek.innerHTML = `
        <div class="container film-week__container" data-rating="${voteAverage}">
            <div class="film-week__poster-wrapper">
                <img class="film-week__poster" 
                    src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdropPath}" 
                    alt="${title || name}">
                <p class="film-week__title_origin">${originalTitle || originalName}</p>
            </div>
            <h2 class="film-week__title">${title || name}</h2>
            ${key ?
            `<a class="film-week__watch-trailer tube"
                 href="https://youtu.be/${key}"
                 aria-label="смотреть трейлер"></a>` :
            ''}
        </div>
    `;
};

const renderVideo = async () => {
    let data;
    let video;
    if($_GET('id') && $_GET('type')) {
        data = await getDetails($_GET('id'), $_GET('type'));
        video = await getVideo(data.id, $_GET('type'));
        firstRender(data, video.results[0]);
        console.log('video: ', video);
    } else {
        data = await getTriends();

        const [firstCard, ...otherCard] = data.results;
        otherCard.length = 16;

        video = await getVideo(firstCard.id, firstCard.media_type);

        firstRender(firstCard, video.results[0]);
        renderCard(otherCard);
    }
    console.log('data: ', data);

};

function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}

export default renderVideo;