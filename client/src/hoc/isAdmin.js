import { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
    let isAdmin = true;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/app/dashboard');
    
            return null;
        }
    }, [])

    return <Component />
}

export default AdminRoute;