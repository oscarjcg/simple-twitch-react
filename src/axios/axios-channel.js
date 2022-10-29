import axios  from 'axios';

const instance = axios.create({
    //baseURL: 'https://localhost:7109' 
    baseURL: 'https://backend-simple-twitch.oscarcatarigutierrez.com/api/'
});

export default instance;