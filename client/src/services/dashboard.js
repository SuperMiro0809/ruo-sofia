import services from './index';

function index() {
    return fetch(`${services.url}/dashboard?token=${localStorage.getItem('token')}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Unauthorized');
            }
        })
}

const dashboardServices = {
    index
}

export default dashboardServices