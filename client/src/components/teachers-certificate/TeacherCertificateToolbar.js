import { useState } from 'react';
import './TeacherCertificateToolbar.scss';
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
import { Search as SearchIcon } from 'react-feather';

const TeacherCertificateToolbar = ({ getTeachers, setLoader }, ...props) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        setLoader(true);
        getTeachers(search);
    }

    const handleReset = () => {
        setSearch('');
        setLoader(true);
        getTeachers();
    }

    return (
        <Box {...props} className="TeacherCertificateToolbar">
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={4}>
                                <TextField
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    size="small"
                                    value={search}
                                    onChange={event => {
                                        setSearch(event.currentTarget.value);
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
                                    placeholder="Търси учител"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={4} >
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
                            <Grid item xs={12} lg={4} className="wrapper">
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

export default TeacherCertificateToolbar;