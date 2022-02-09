import { RotateLeft } from '@material-ui/icons';
import { Component, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const RoleRoute = ({ component: Component, role, ...rest }) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext[0].role && userContext[0].role != role && userContext[0].role !="Administrator") {
            navigate(-1);
            console.log('navigate -1')
            return null;
        }
    }, [])

    return <Component />
}

export default RoleRoute;