import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Grid
} from '@material-ui/core';
import { 
    Search as SearchIcon,
    User as EgnIcon
} from 'react-feather';
import { NavLink as RouterLink } from 'react-router-dom';

const StudentsClassListToolbar = ({ setSearchName, setSearchEgn, setPage }, props) => {
    const [name, setName] = useState('');
    const [egn, setEgn] = useState('');

    const handleSearch = () => {
        setPage(0);
        setSearchName(name);
        setSearchEgn(egn);
    }

    const handleReset = () => {
        setPage(0);
        setName('');
        setEgn('');
        setSearchName(null);
        setSearchEgn(null);
    }

    return (
        <Box {...props} className="StudentsClassListToolbar toolbar">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    sx={{ mx: 1 }}
                    component={RouterLink}
                    color="primary"
                    variant="contained"
                    to="/app/students-class/add"
                >
                    Добави ученик
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={3}>
                                <TextField
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    size="small"
                                    value={name}
                                    onChange={event => {
                                        setName(event.currentTarget.value);
                                    }}
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
                                    placeholder="Търси ученик"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <TextField
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    size="small"
                                    value={egn}
                                    onChange={event => {
                                        setEgn(event.currentTarget.value);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SvgIcon
                                                    fontSize="small"
                                                    color="action"
                                                >
                                                    <EgnIcon />
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="ЕГН"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={3} >
                                <Button
                                    fullWidth
                                    onClick={handleSearch}
                                    sx={{ height: '100%' }}
                                    color="primary"
                                    variant="contained"
                                >
                                    Търси
                                </Button>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <Button
                                    className="reset-button"
                                    fullWidth
                                    onClick={handleReset}
                                    sx={{ height: '100%', backgroundColor: '#9e9e9e' }}
                                    variant="contained"
                                >
                                    Изчисти
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default StudentsClassListToolbar;