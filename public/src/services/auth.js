import React from 'react'
import { Link } from 'react-router-dom'

export const TOKEN_KEY = "key"

export const getToken = (token) => { localStorage.getItem(token) };

export const setAuth = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const isAuth = () => {
    return localStorage.getItem(TOKEN_KEY) != null;
};

export const logout = (props) => {
    localStorage.clear(TOKEN_KEY);
}