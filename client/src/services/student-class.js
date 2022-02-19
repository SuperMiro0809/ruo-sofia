import services from './index';

function getAll() {
    return fetch(`${services.url}/students-class?token=${localStorage.getItem('token')}`)
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }
    })
}

function create(data) {
    return fetch(`${services.url}/students-class?token=${localStorage.getItem('token')}`, {
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

function findByEgn(egn) {
    return fetch(`${services.url}/students-class/${egn}?token=${localStorage.getItem('token')}`)
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        } 
    })
}

function destroy(id) {
    return fetch(`${services.url}/students-class/${id}?token=${localStorage.getItem('token')}`, {
        method: 'DELETE'
    })
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            return new Error('Unauthorized');
        }
    })
}

const StudetnClassServices = {
    getAll,
    create,
    findByEgn,
    destroy
}

export default StudetnClassServices;