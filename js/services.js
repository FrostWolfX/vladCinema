const API_KEY = 'c8b6e89e343e71f304c67c2945c29c80';
const BASE_URL = 'https://api.themoviedb.org/3/';
const LANGUAGE = '&language=ru-RU'

/*
/trending/all/day?api_key=<<api_key>>
*/

const getData = url => fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw `Что-то пошло не так. Ошибка ${response.status}`
    })
    .catch(err => console.error(err));

export const getTriends = async (type = 'all', period = 'week', page = 1) => {
    const url = `${BASE_URL}trending/${type}/${period}?api_key=${API_KEY}${LANGUAGE}&page=${page}`;
    return await getData(url);
};

export const getTop = async (type, page = 1) => {
    const url = new URL(`${type}/top_rated`, BASE_URL);
    url.search = `api_key=${API_KEY}${LANGUAGE}&page=${page}`;
    return await getData(url);
};

export const getPopular = async (type, page = 1) => {
    const url = `${BASE_URL}${type}/popular?api_key=${API_KEY}${LANGUAGE}&page=${page}`;
    return await getData(url);
};

export const getVideo = async (id, type) => {
    const url = new URL(`${type}/${id}/videos`, BASE_URL);
    url.search = `api_key=${API_KEY}${LANGUAGE}`;
    return await getData(url);
};

export const search = async (query, page) => {
    const url = new URL(`${type}/${id}/search/multi`, BASE_URL);
    url.search = `api_key=${API_KEY}${LANGUAGE}&page=${page}&include_adult=false&query=${query}`;
    return await getData(url);
};

//https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false