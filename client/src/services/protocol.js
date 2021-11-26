import services from './index';

function getAll() {
    return fetch(`${services.url}/protocols`)
      .then(res => res.json())
}

const protocolServices = {
    getAll,
}

export default protocolServices;