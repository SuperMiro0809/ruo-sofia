function getAll() {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(data => console.log(data))
}

function create(data) {

    fetch('http://localhost:8000/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.text())
      .then(data => console.log(data))
}

const services = {
    getAll,
    create
}

export default services;