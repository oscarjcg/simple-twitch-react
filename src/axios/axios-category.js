import axios  from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:8086/'
    baseURL: 'https://st-dotnet.oscarcatarigutierrez.com/'
});

export default instance;