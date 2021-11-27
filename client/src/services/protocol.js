import services from './index';

function getAll() {
    return fetch(`${services.url}/protocols`)
        .then(res => res.json())
}

function create(data) {
    return fetch(`${services.url}/protocols`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => res.json())
}

function destroy(id) {

    return fetch(`${services.url}/protocols/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
}

const protocolServices = {
    getAll,
    create,
    destroy
}

export default protocolServices;