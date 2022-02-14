import { Component, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/user';
import UserContext from '../contexts/UserContext';

const NotAuthRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
    // if(userContext[0].name) {
    //     navigate(-1);
        
    //     return null;
    // }

    useEffect(() => {
        userServices.profile()
        .then(data => {
            if(data.name) {
                navigate(-1);
            }
        })
        .catch(err => {
            if (err.message === 'Unauthorized') {
              navigate('/login');
            }
        })
    }, [])

    return <Component />
}

export default NotAuthRoute;