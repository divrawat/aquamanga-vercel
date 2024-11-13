import fetch from 'isomorphic-fetch';
import { DOMAIN, BACKEND_DOMAIN } from '@/config';

export const Contact = async (contact) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/contact`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};



export const getAllContacts = async (page, search, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/get-contacts?page=${page}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}



export const removeContact = async (id, token) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/contact/delete/${id}`, {
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
