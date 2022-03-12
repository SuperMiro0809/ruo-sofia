import services from './index';

function getAll({startDate, endDate, number}) {
    let url = `${services.url}/protocols-secondary?token=${localStorage.getItem('token')}`;
    if(startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    if(number) {
        url += `&number=${number}`;
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
    return fetch(`${services.url}/protocols-secondary?token=${localStorage.getItem('token')}`, {
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
            }
        })
}

function destroy(id) {

    return fetch(`${services.url}/protocols-secondary/${id}?token=${localStorage.getItem('token')}`, {
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
    return fetch(`${services.url}/protocols-secondary/${id}?token=${localStorage.getItem('token')}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

function edit(id, data) {
    return fetch(`${services.url}/protocols-secondary/${id}?token=${localStorage.getItem('token')}`, {
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

const protocolSecondaryServices = {
    getAll,
    create,
    destroy,
    getById,
    edit
}

export default protocolSecondaryServices;