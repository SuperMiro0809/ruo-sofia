import services from './index';

function getAll() {

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

const mpsService = {
    create
}

export default mpsService;