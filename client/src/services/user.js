import services from './index';

function getAll() {
    return fetch(`${services.url}/users?token=${localStorage.getItem('token')}`)
      .then(res => {
          if(res.status === 200) {
              return res.json();
          }else if(res.status === 401) {
              throw new Error('Unauthorized');
          }
      })
}

function create(data) {

    return fetch(`${services.url}/users?token=${localStorage.getItem('token')}`, {
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

    return fetch(`${services.url}/users/${id}?token=${localStorage.getItem('token')}`, {
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

function login(data) {

    return fetch(`${services.url}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: services.header2
      })
      .then(res => {
          if(res.status === 200) {
              return res.json();
          }else if(res.status === 401) {
              throw new Error('Грешен имейл или парола');
          }
      })
}

function profile() {
    return fetch(`${services.url}/profile?token=${localStorage.getItem('token')}`)
    .then(res => res.json())
}

function avatar(data) {
    return fetch(`${services.url}/profile/avatar?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        body: data,
        headers: {
            //"Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryLSJ94HSMRnoF7dBI'
        }
    })
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }
    })
}

function deleteAvatar() {
    return fetch(`${services.url}/profile/avatar?token=${localStorage.getItem('token')}`, {
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

function editUser(data) {
    return fetch(`${services.url}/users/${data.id}?token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        credentials: 'include',
        headers: services.header2,
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 200) {
            return res.json();
        }else if(res.status === 401) {
            throw new Error('Unauthorized');
        }
    })
}

function logout() {
    return fetch(`${services.url}/logout?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        credentials: 'include',
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

function refresh() {
    return fetch(`${services.url}/refresh?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        credentials: 'include',
        headers: services.header2
    })
    .then(res => res.json())
}

const userServices = {
    getAll,
    create,
    destroy,
    login,
    profile,
    avatar,
    deleteAvatar,
    editUser,
    logout,
    refresh
}

export default userServices;