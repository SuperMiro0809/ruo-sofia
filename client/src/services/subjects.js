import services from './index';

function getAll() {
    return fetch(`${services.url}/subjects?token=${localStorage.getItem('token')}`)
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }
        
    })
}

const SubjectServices = {
    getAll
};

export default SubjectServices;