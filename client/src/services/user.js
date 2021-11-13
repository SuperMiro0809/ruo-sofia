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
    .then(res => res.text())
}

const userServices = {
    getAll,
    create,
    destroy
}

export default userServices;