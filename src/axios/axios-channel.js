import axios  from 'axios';

const instance = axios.create({
    baseURL: 'https://rocky-forest-64018.herokuapp.com/'
});

export default instance;