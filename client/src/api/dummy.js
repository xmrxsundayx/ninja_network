import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyapi.io/data/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'app-id': '6493c09f70fc67d7d4983992'
    }
});

export default api;
