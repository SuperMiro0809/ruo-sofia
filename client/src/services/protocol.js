import services from './index';

function getAll() {
    return fetch(`${services.url}/protocols?token=${localStorage.getItem('token')}`)
        .then(res => res.json())
}

function create(data) {
    return fetch(`${services.url}/protocols?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => res.json())
}

function destroy(id) {

    return fetch(`${services.url}/protocols/${id}?token=${localStorage.getItem('token')}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
}

function edit(data, id) {

    return fetch(`${services.url}/protocols/${id}?token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: services.header2
    })
    .then(res => res.json())
}

const protocolServices = {
    getAll,
    create,
    destroy,
    edit
}

export default protocolServices;