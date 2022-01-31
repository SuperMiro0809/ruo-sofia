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

function getApplication(id) {
    return fetch(`${services.url}/teachers/applications/${id}`)
        .then(res => res.json())
}

function addApplication(data) {
    return fetch(`${services.url}/teachers/applications`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => {
            if(res.status === 200) {
                return res.json();
            }else if(res.status === 409) {
                throw new Error('Вече е въведено заявление с този входящ номер');
            }
        })
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
    getApplication,
    addApplication,
    destroy,
    edit
}

export default teacherServices;