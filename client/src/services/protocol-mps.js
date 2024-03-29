import services from './index';

function getAll({startDate, endDate, number, page, limit}) {
    let url = `${services.url}/mps/protocols?token=${localStorage.getItem('token')}`;
    if(startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    if(number) {
        url += `&number=${number}`;
    }
    if(page && limit) {
        url += `&page=${page}&per_page=${limit}`
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
    return fetch(`${services.url}/mps/protocols?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            } else if (res.status === 409) {
                return res.json().then(r => { throw new Error(r.message) })
            }else {
                throw new Error('Error');
            }
        })
}

function destroy(id) {

    return fetch(`${services.url}/mps/protocols/${id}?token=${localStorage.getItem('token')}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

function getById(id) {
    return fetch(`${services.url}/mps/protocols/${id}?token=${localStorage.getItem('token')}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

function edit(id, data) {
    return fetch(`${services.url}/mps/protocols/${id}?token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            } else if (res.status === 409) {
                return res.json().then(r => { throw new Error(r.message) })
            }
        })
}

const protocolMpsServices = {
    getAll,
    create,
    destroy,
    getById,
    edit
}

export default protocolMpsServices;