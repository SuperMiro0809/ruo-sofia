import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { NavLink as RouterLink } from 'react-router-dom';

const TeacherListToolbar = (props) => {
    return (
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
                    to="/app/teachers/add"
                >
                    Добави заявление
                </Button>
                <Button
                    sx={{ mx: 1 }}
                    component={RouterLink}
                    color="primary"
                    variant="contained"
                    to="/app/teachers/add"
                >
                    Добави учител
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Box sx={{ maxWidth: 500 }}>
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                                fontSize="small"
                                                color="action"
                                            >
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="Търси учител"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default TeacherListToolbar;