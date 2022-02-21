const descriptionMovies = document.querySelector('.description__movies');
const overwrite = document.querySelector('.overwrite');
const listCard = document.querySelector('.other-films__list');

const description = (data, video) => {
    const overview = document.createElement('p');
    overview.textContent = data.overview;
    overview.classList.add('overview');
    overwrite.append(overview);

    listCard.textContent = '';
    let cards = [];
    video.forEach(element => {
        const card = document.createElement('li');
        card.className = 'other-films__item';

        const link = document.createElement('a');
        if (element && element.key != 'undefined') {
            link.href = `https://youtu.be/${element.key}`;
        }
        link.className = element.key ? 'other-films__link tube' : 'other-films__link';

        const img = document.createElement('img');
        img.className = 'other-films__img';
        img.alt = `постер ${data.title || data.name}`;
        img.src = data.poster_path ?
            `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}` :
            'img/no-poster.png';

        link.append(img);
        card.append(link);

        cards.push(card);

    });
    listCard.append(...cards);
}

export default description;