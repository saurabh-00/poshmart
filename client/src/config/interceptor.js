import axios from "axios";
import { apiUrl } from ".";

const httpClient = axios.create({
    baseURL: apiUrl
});

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
})

export default httpClient;