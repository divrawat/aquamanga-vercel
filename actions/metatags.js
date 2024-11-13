import fetch from 'isomorphic-fetch';
import { DOMAIN, BACKEND_DOMAIN } from '@/config';

export const AddMetaTags = async (tags, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/add-tag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(tags)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add meta tags');
        }

        return await response.json();
    } catch (err) {
        console.error('Error adding meta tags:', err);
        throw err;
    }
};




export const getAllMetaTags = async () => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/get-metatags`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}




export const removeMetaTag = async (id, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/tag/delete/${id}`, {
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



export const updateMetaTag = async (data, token, id) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/tag/update/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};