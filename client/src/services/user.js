import services from './index';

function getAll() {
    return fetch(`${services.url}/users`)
      .then(res => res.json())
}

function create(data) {

    return fetch(`${services.url}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: services.header2
      })
      .then(res => res.text())
}

function destroy(id) {

    return fetch(`${services.url}/users/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
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

function editUser(data) {
    return fetch(`${services.url}/users/${data.id}?token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        credentials: 'include',
        headers: services.header2,
        body: JSON.stringify(data)
    })
    .then(res => res.json())
}

function logout() {
    return fetch(`${services.url}/logout?token=${localStorage.getItem('token')}`, {
        method: 'POST',
        credentials: 'include',
        headers: services.header2
    })
    .then(res => res.json())
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
    editUser,
    logout,
    refresh
}

export default userServices;