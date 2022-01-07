import services from './index';

function getAll() {
    return fetch(`${services.url}/teachers`)
        .then(res => res.json())
}

function create(data) {
    return fetch(`${services.url}/teachers`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => res.json())
}

function getByEgn(egn) {
    return fetch(`${services.url}/teachers/${egn}`)
        .then(res => res.json())
}

function addApplication(data) {
    return fetch(`${services.url}/teachers/applications`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => res.json())
}

function destroy(id) {
    return fetch(`${services.url}/teachers/${id}`, {
        method: 'DELETE',
        headers: services.header2
    })
        .then(res => res.json())
}

function edit(data) {
    return fetch(`${services.url}/teachers/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: services.header2
    })
    .then(res => res.json())
}

const teacherServices = {
    getAll,
    create,
    getByEgn,
    addApplication,
    destroy,
    edit
}

export default teacherServices;