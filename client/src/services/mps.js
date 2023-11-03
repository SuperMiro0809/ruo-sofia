import services from './index';

function getAll({ name, egn, date, page, limit }) {
    let url = `${services.url}/mps?token=${localStorage.getItem('token')}`;

    if (name) {
        url += `&name=${name}`;
    }
    if (egn) {
        url += `&egn=${egn}`;
    }
    if (date) {
        url += `&date=${date}`;
    }
    if (page && limit) {
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

function getCertificates({ name, egn, page, limit }) {
    let url = `${services.url}/mps/certificates?token=${localStorage.getItem('token')}`;

    if (name) {
        url += `&name=${name}`;
    }
    if (egn) {
        url += `&egn=${egn}`;
    }
    if (page && limit) {
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
    return fetch(`${services.url}/mps?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            } else if (res.status === 409) {
                return res.json().then(r => { throw new Error(r.message) })
            } else if (res.status === 422) {
                return res.json().then(r => { throw new Error(r.errors[0]) })
            } else {
                throw new Error('Error');
            }
        })
}

function edit(id, data) {
    return fetch(`${services.url}/mps/${id}?token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: services.header2
    })
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            } else if (res.status === 409) {
                return res.json().then(r => { throw new Error(r.message) })
            } else if (res.status === 422) {
                return res.json().then(r => { throw new Error(r.errors[0]) })
            } else {
                throw new Error('Error');
            }
        })
}

function destroy(id) {
    return fetch(`${services.url}/mps/${id}?token=${localStorage.getItem('token')}`, {
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
    return fetch(`${services.url}/mps/${id}?token=${localStorage.getItem('token')}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

const mpsService = {
    getAll,
    getCertificates,
    create,
    edit,
    destroy,
    getById
}

export default mpsService;