import React, { useState } from 'react';
import moment from 'moment';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Grid
} from '@material-ui/core';
import {
    DateRangePicker,
    LocalizationProvider
} from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import CertificateClassExcelDocument from './References/CertificatesClass/CertificateClassExcelDocument';
import CertificateSecondaryExcelDocument from './References/CertificatesSecondary/CertificateSecondaryExcelDocument';
import CertificateAllExcelDocument from './References/CertificatesAll/CertificateAllExcelDocument';


const StudentsReferencesToolbar = ({ setStartDate, setEndDate, data, mode }, ...props) => {
    const [date, setDate] = useState([null, null]);

    const handleSearch = () => {
        setStartDate(moment(date[0]).format('YYYY-MM-DD'));
        setEndDate(moment(date[1]).format('YYYY-MM-DD'));
    }

    const handleReset = () => {
        setDate([null, null]);
        setStartDate(null);
        setEndDate(null);
    }

    const disableButton = ([startDate, endDate]) => {
        if(!startDate || !endDate) {
            return true;
        }

        if(new Date(startDate) > new Date(endDate)) {
            return true;
        }


        return false;
    }

    return (
        <Box {...props} className="TeacherListToolbar">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                {mode === "certificatesClass" ?
                    <CertificateClassExcelDocument certificates={data} /> :
                    mode === 'certificatesSecondary' ?
                        <CertificateSecondaryExcelDocument certificates={data} /> :
                        <CertificateAllExcelDocument certificates={data} />
                }
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={6}>
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
                                    fullWidth
                                    disabled={disableButton(date)}
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

export default StudentsReferencesToolbar;