import services from './index';

function getAll(fullName) {
    let url = `${services.url}/teachers?token=${localStorage.getItem('token')}`;
    if(fullName) {
        url += `&fullName=${fullName}`;
    }
    
    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

function create(data) {
    return fetch(`${services.url}/teachers?token=${localStorage.getItem('token')}`, {
        method: 'POST',
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

function getByEgn(egn) {
    return fetch(`${services.url}/teachers/${egn}?token=${localStorage.getItem('token')}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

function getApplication(id) {
    return fetch(`${services.url}/teachers/applications/${id}?token=${localStorage.getItem('token')}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

function addApplication(data) {
    return fetch(`${services.url}/teachers/applications?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 409) {
                throw new Error('Вече е въведено заявление с този входящ номер');
            }
        })
}

function destroy(id) {
    return fetch(`${services.url}/teachers/${id}?token=${localStorage.getItem('token')}`, {
        method: 'DELETE',
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

function edit(data) {
    return fetch(`${services.url}/teachers/${data.id}?token=${localStorage.getItem('token')}`, {
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