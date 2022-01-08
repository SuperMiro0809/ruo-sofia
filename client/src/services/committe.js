import services from './index';

function getAll() {
    return fetch(`${services.url}/committe`)
        .then(res => res.json())
}

function create(data) {
    return fetch(`${services.url}/committe`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => res.json())
}

const committeServices = {
    getAll,
    create
}

export default committeServices;