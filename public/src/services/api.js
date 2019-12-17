import axios from 'axios';
import { getToken } from './auth';

const API = axios.create({ 
    'http://localhost:3001/'
});

API.interceptors.request.use(async config => {
    const token = getToken();
    if(token)
        config.headers['x-access-token'] = token;
    return config;
})

export default API;
