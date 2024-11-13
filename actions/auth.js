import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { DOMAIN, BACKEND_DOMAIN } from '@/config';

/*
export const adminsignup = async (user, token) => {
    try {
        const response = await fetch(`${API}/admin-signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};
*/

export const adminSignin = async user => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};



export const signout = async next => {
    removeCookie('token');
    removeLocalStorage('user');
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/admin-signout`, { method: 'GET' });
        next();
    } catch (err) { return console.log(err); }
};

export const setCookie = (key, value) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires: 10
        });
    }
};

export const removeCookie = key => {
    if (typeof window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = key => {
    if (typeof window !== 'undefined') {
        return cookie.get(key);
    }
};

export const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        setLocalStorage('user', data.user);
        setCookie('token', data.token);
    } else {
        console.error('Data is not present or incomplete.');
    }
    next();
};



export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};