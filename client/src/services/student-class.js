import services from './index';

function getAll(searchName, searchEgn, page, limit) {
    let url = `${services.url}/students-class?token=${localStorage.getItem('token')}&page=${page}&per_page=${limit}`;
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

function certificates(startDate, endDate) {
    let url = `${services.url}/students-class/certificates?token=${localStorage.getItem('token')}`;
    if(startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
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

function getApplication(id) {
    return fetch(`${services.url}/students-class/application/${id}?token=${localStorage.getItem('token')}`)
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        } 
    })
}

function editApplication(data, id) {
    return fetch(`${services.url}/students-class/application/${id}?token=${localStorage.getItem('token')}`, {
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

const StudentClassServices = {
    getAll,
    create,
    findByEgn,
    destroy,
    certificates,
    getApplication,
    editApplication
}

export default StudentClassServices;