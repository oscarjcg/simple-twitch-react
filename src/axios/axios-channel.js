import axios  from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-simple-twitch.oscarcatarigutierrez.com/api/'
});

export default instance;