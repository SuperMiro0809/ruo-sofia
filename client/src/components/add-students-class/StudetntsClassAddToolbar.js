import {
    Box,
    Button
} from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

const StudentsClassAddToolbar = (props) => (
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
                to="/app/students-class"
            >
                Виж ученици
        </Button>
        </Box>
    </Box>
);

export default StudentsClassAddToolbar;
