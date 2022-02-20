import userService from './user';

const url = process.env.REACT_APP_API_ENDPOINT;
const assets = process.env.REACT_APP_ASSETS;
console.log(assets)
// const url = 'http://127.0.0.1:8000/api';
//const assets = 'http://127.0.0.1:8000/storage';

const header1 = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Content-Type': 'application/json',
}

const header2 = {
    'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_HEADER}`,
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