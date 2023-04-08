import React, { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
} from '@material-ui/core';
import {
    Search as SearchIcon,
    User as EgnIcon
} from 'react-feather';
import { NavLink as RouterLink } from 'react-router-dom';

const MpsCertificateListToolbar = ({
    setName: setNameHandler,
    setEgn: setEgnHandler,
    setPage
}, ...props) => {
    const [name, setName] = useState('');
    const [egn, setEgn] = useState('');

    const handleSearch = () => {
        setPage(0);
        setNameHandler(name);
        setEgnHandler(egn);
    }

    const handleReset = () => { 
        setPage(0);
        setName('');
        setEgn('');
        setNameHandler('');
        setEgnHandler('');
    }

    const disableButton = () => {
       
    }

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
                    to="/app/mps/add"
                >
                    Добави заявление
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
                                    disabled={disableButton()}
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

export default MpsCertificateListToolbar;