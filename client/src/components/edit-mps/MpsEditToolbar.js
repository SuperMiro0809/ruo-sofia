import {
    Box,
    Button
} from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

const MpsEditToolbar = (props) => (
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
                to="/app/mps"
            >
                Виж заявления
        </Button>
        </Box>
    </Box>
);

export default MpsEditToolbar;
