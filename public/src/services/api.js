import { getToken } from './auth';
import axios from 'axios';

const API = axios.create({ 
    baseURL: 'http://localhost:3000/'
});

API.interceptors.request.use(async config => {
    const token = getToken();
    if(token)
        config.headers['x-access-token'] = token;
    return config;
})

export default API;
