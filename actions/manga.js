import fetch from 'isomorphic-fetch';
import { DOMAIN, BACKEND_DOMAIN } from '@/config';

export const createManga = async (data, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/add-manga`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: data
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

/*
export const getAllMangas = async () => {
    try {
        const response = await fetch(`${DOMAIN}/api/manga/get`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
*/

export const list = async (page, search, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/get?page=${page}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}


export const updateManga = async (data, token, id) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/update/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: data
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const removeManga = async (id, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const getManga = async (name) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/get-single-manga?manganame=${name}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}



export const getMangasHomePage = async () => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/home-page-mangas`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}




export const getmangachaptersRelated = async (manganame) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/get-manga-chapters-related?manganame=${manganame}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}


export const getHomePageMangaPerCategory = async () => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/home-page-manga-per-category`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}


export const GetLatestMangas = async (page) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/get-latest-mangas?page=${page}`, {
            method: 'GET', headers: {
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}



export const getMangasSitemap = async () => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/manga/get-manga-sitemap`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}