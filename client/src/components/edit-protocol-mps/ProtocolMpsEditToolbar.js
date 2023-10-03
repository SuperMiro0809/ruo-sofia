import {
    Box,
    Button
} from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

const ProtocolMpsEditToolbar = (props) => (
    <Box {...props}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}
        >
            <Button
                component={RouterLink}
                color="primary"
                variant="contained"
                to="/app/mps/protocols"
            >
                Виж протоколи
        </Button>
        </Box>
    </Box>
);

export default ProtocolMpsEditToolbar;
