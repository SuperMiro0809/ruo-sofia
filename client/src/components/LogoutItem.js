import { useContext } from 'react';
import { Button } from '@material-ui/core';
import { faSignOutAlt as SignOutAltIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userServices from '../services/user';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const LogoutItem = () => {
    const userContext = useContext(UserContext);
    let navigate = useNavigate();

    const logout = () => {
        userServices.logout()
        .then((data) => {
            console.log(data);
            userContext[1]({});
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
        })
        .catch(err => {
            if(err.message === 'Unauthorized') {
                userContext[1]({});
                localStorage.removeItem('token');
                navigate('/login');
            }
        })
    }

    return (
        <Button
            sx={{
                color: '#f44336',
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                width: '100%',
                '& svg': {
                    mr: 1
                }
            }}
            onClick={logout}
        >
            <FontAwesomeIcon style={{ width: '20px', height: '20px' }} icon={SignOutAltIcon} />
            <span>
                Излизане
            </span>
        </Button>
    );
};

export default LogoutItem;
