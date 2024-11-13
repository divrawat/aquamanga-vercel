import fetch from 'isomorphic-fetch';
import { DOMAIN, BACKEND_DOMAIN } from '@/config';


export const list = async (page, search, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/get?page=${page}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}


export const removeChapters = async (id, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/delete/${id}`, {
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


export const updateChapters = async (data, token, id) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/update/${id}`, {
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





export const addChapter = async (data, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/single-post`, {
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








export const bulkRemoveChapters = async (token, manganame) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/bulk-delete`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ manganame }),
        });

        return await response.json();
    } catch (err) {
        console.error(err);
        throw new Error('Failed to delete chapters');
    }
};

export const getParticularMangachapterwithRelated = async (manganame, chapterNumber) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/get-particular-manga-chapter-with-related?manganame=${manganame}&chapterNumber=${chapterNumber}`, {
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




export const BulkAddChapters = async (data, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/bulk-post`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (err) {
        console.error(err);
        throw new Error('Failed to delete chapters');
    }
};








export const getLatestMangaChapters = async () => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/get-most-recent-chapters`, {
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




export const getChapterSitemap = async () => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/chapters/get-chapter-sitemap`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}