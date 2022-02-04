import React, { useState } from 'react';
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
    FileDownload as ExportIcon
} from '@material-ui/icons';
import {
    DateRangePicker,
    LocalizationProvider
} from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import CertificateExcelDocument from './References/Certificates/CertificateExcelDocument';


const TeacherListToolbar = ({ setSearch, teachers, mode }, ...props) => {
    const [value, setValue] = useState('');
    const [date, setDate] = useState([null, null]);

    const handleSearch = () => {
        setSearch(value);
    }

    const handleReset = () => {
        setValue('');
        setSearch('');
    }

    return (
        <Box {...props} className="TeacherListToolbar">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                {mode === "certificates" ?
                    <CertificateExcelDocument certificates={teachers} /> :
                    <Button
                        color="success"
                        variant="contained"
                        startIcon={<ExportIcon />}
                    >
                        Експорт към Excel
                    </Button>
                }
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
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
                            <Grid item xs={12} lg={4}>
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

export default TeacherListToolbar;