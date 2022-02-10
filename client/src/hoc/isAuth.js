import { Component, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/user';
import UserContext from '../contexts/UserContext';

const AuthRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
    if(!userContext[0].name) {
        navigate('/login');

        return null;
    }
    // useEffect(() => {
    //     userServices.profile()
    //     .then(data => {

    //     })
    //     .catch(err => {
    //         if (err.message === 'Unauthorized') {
    //           navigate('/login');
    //         }
    //     })
    // }, [])

    return <Component />
}

export default AuthRoute;