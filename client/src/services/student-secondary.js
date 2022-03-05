import services from './index';

function getAll(searchName, searchEgn) {
    let url = `${services.url}/students-secondary?token=${localStorage.getItem('token')}`;
    if(searchName) {
        url += `&name=${searchName}`;
    }
    if(searchEgn) {
        url += `&egn=${searchEgn}`;
    }
    
    return fetch(url)
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }
    })
}

function create(data) {
    return fetch(`${services.url}/students-secondary?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        headers: services.header2,
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }else if (res.status === 409) {
            return res.json().then(r => { throw new Error(r.message) })
        }
    })
}

function destroy(id) {
    return fetch(`${services.url}/students-secondary/${id}?token=${localStorage.getItem('token')}`, {
        method: 'DELETE'
    })
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }
    })
}

function edit(data, id) {
    return fetch(`${services.url}/students-secondary/${id}?token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        headers: services.header2,
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }else if (res.status === 409) {
            return res.json().then(r => { throw new Error(r.message) })
        }
    })
}

const StudentSecondaryServices = {
    getAll,
    create,
    destroy,
    edit
}

export default StudentSecondaryServices;