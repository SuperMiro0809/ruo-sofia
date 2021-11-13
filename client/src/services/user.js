function getAll() {
    return fetch('http://localhost:8000/api/users')
      .then(res => res.json())
}

function create(data) {

    return fetch('http://localhost:8000/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.text())
}

function destroy(id) {

    return fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
}

function login(data) {

    return fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
      })
      .then(res => {
          if(res.status === 200) {
              return res.text();
          }else if(res.status === 401) {
              throw new Error('Грешен имейл или парола');
          }
      })
}

function logout() {
    return fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    })
    .then(res => res.text())
}

const userServices = {
    getAll,
    create,
    destroy,
    login,
    logout
}

export default userServices;