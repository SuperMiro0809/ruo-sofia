import React, { useState } from 'react';
import moment from 'moment';
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
import { Search as SearchIcon } from 'react-feather';
import { NavLink as RouterLink } from 'react-router-dom';
import {
    DateRangePicker,
    LocalizationProvider
} from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';

const ProtocolSecondaryListToolbar = ({ setNumber, setStartDate, setEndDate }, ...props) => {
    const [value, setValue] = useState();
    const [date, setDate] = useState([null, null]);

    const handleSearch = () => {
        setNumber(value);
        if(date[0] && date[1]) {
            setStartDate(moment(date[0]).format('YYYY-MM-DD'));
            setEndDate(moment(date[1]).format('YYYY-MM-DD'));
        }
    }

    const handleReset = () => {
        setValue('');
        setNumber('');
        setDate([null, null]);
        setStartDate(null);
        setEndDate(null);
    }

    const disableButton = ([startDate, endDate]) => {
        if(new Date(startDate) > new Date(endDate)) {
            return true;
        }

        return false;
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
                    to="/app/protocols/students-secondary/add"
                >
                    Генерирай протокол
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={2}>
                                <TextField
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    size="small"
                                    value={value}
                                    onChange={event => {
                                        setValue(event.currentTarget.value);
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
                                    placeholder="Номер"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={bg}>
                                    <DateRangePicker
                                        startText="От"
                                        endText="До"
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField {...startProps} size="small" fullWidth />
                                                <Box sx={{ mx: 2 }}> - </Box>
                                                <TextField {...endProps} size="small" fullWidth />
                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} lg={3} >
                                <Button
                                    disabled={disableButton(date)}
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

export default ProtocolSecondaryListToolbar;