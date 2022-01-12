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
    return await getData(url.href);
};

export const getPopular = async (type, page = 1) => {
    const url = new URL(`${type}/popular`, BASE_URL);
    url.search = `api_key=${API_KEY}${LANGUAGE}&page=${page}`;
    return await getData(url.href);
};

export const getVideo = async (id, type) => {
    const url = new URL(`${type}/${id}/videos`, BASE_URL);
    url.search = `api_key=${API_KEY}${LANGUAGE}`;
    return await getData(url.href);
};

export const search = async (query, page = 1) => {
    const url = new URL(`search/multi`, BASE_URL);
    url.search = `api_key=${API_KEY}${LANGUAGE}&page=${page}&include_adult=false&query=${query}`;
    return await getData(url.href);
};