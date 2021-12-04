import userService from './user';
const url = 'http://192.168.0.161:8000/api';
const assets = 'http://192.168.0.161:8000/storage';

const header1 = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Content-Type': 'application/json',
}

const header2 = {
    'Access-Control-Allow-Origin': 'http://192.168.0.161:3000',
    'Content-Type': 'application/json',
}

const services = {
    url,
    assets,
    header1,
    header2,
    userService,
}

export default services;