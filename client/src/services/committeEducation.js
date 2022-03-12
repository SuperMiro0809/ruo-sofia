import services from './index';

function getAll() {
    return fetch(`${services.url}/committe-education?token=${localStorage.getItem('token')}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

function create(data) {
    return fetch(`${services.url}/committe-education?token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

const committeEducationServices = {
    getAll,
    create
}

export default committeEducationServices;