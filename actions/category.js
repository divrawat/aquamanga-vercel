import fetch from 'isomorphic-fetch';
import { DOMAIN, BACKEND_DOMAIN } from '@/config';

export const create = async (category, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/admin-category/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const getCategories = async () => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/admin-category/get`, {
            method: 'GET'
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const singleCategory = async (slug, page) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/admin-category/getmangacategories?slug=${slug}&page=${page}`, {
            method: 'GET'
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const removeCategory = async (slug, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/admin-category/delete/${slug}`, {
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


