import { Button } from '@material-ui/core';
import { faSignOutAlt as SignOutAltIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LogoutItem = () => {
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
        >
            <FontAwesomeIcon style={{ width: '20px', height: '20px' }} icon={SignOutAltIcon} />
            <span>
                Излизане
            </span>
        </Button>
    );
};

export default LogoutItem;
