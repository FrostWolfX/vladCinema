const descriptionMovies = document.querySelector('.description__movies');

const description = (data, video) => {
    console.log('data, video: ', data, video);

    const overview = document.createElement('p');
    overview.textContent = data.overview;
    overview.classList.add('overview');
    descriptionMovies.append(overview);
}

export default description;