import { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/user';

const AuthRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();

    useEffect(() => {
        userServices.profile()
        .then(data => {
            if(!data.name) {
                navigate('/login');
            }
        })
    }, [])

    return <Component />
}

export default AuthRoute;