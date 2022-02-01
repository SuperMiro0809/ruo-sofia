import { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/user';

const NotAuthRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();

    useEffect(() => {
        userServices.profile()
        .then(data => {
            if(data.name) {
                navigate(-1);
            }
        })
    }, [])

    return <Component />
}

export default NotAuthRoute;