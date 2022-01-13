import { getVideo } from "./services.js";

const listCard = document.querySelector('.other-films__list');


const renderCard = (data, type = '') => {
    listCard.textContent = '';

    Promise.all(data.map(async(item) => {

            const video = await getVideo(item.id, item.media_type || type);

            let key = '';
            if (video) {
                if (video.results[0]) {
                    key = video.results[0]?.key;
                }
            }


            const card = document.createElement('li');
            card.className = 'other-films__item';

            const link = document.createElement('a');
            if (key) {
                link.href = `https://youtu.be/${key}`;
            }
            link.className = key ? 'other-films__link tube' : 'other-films__link';
            link.dataset.rating = item.vote_average || '-';

            const img = document.createElement('img');
            img.className = 'other-films__img';
            img.alt = `постер ${item.title || item.name}`;
            img.src = item.poster_path ?
                `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}` :
                'img/no-poster.png';

            link.append(img);
            card.append(link);

            return card;
        }))
        .then(cards => {
            listCard.append(...cards)
        });


};

export default renderCard;