import services from './index';

function getAll({search, page, limit}) {
    let url = `${services.url}/subjects?token=${localStorage.getItem('token')}`;
    if(search) {
        url += `&name=${search}`;
    }
    if(page && limit) {
        url += `&page=${page}&per_page=${limit}`;
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
    return fetch(`${services.url}/subjects?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }
    })
}

function destroy(id) {
    return fetch(`${services.url}/subjects/${id}?token=${localStorage.getItem('token')}`, {
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
    return fetch(`${services.url}/subjects/${id}?token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: services.header2
    })
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }
    })
}

const SubjectServices = {
    getAll,
    create,
    destroy,
    edit
};

export default SubjectServices;