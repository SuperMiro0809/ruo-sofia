import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import {
    DatePicker,
    LocalizationProvider
} from '@material-ui/lab';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MеssageContext from '../../contexts/MessageContext';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import mpsService from 'src/services/mps';

const MpsEditForm = ({ mps }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [dateOfBirth, setDateOfBirth] = useState(mps.dateOfBirth);
    const [documentDate, setDocumentDate] = useState(mps.documentDate);
    const [date, setDate] = useState(mps.date);
    const mpsJson = JSON.stringify(mps);

    useEffect(() => {
        setDateOfBirth(mps.dateOfBirth);
        setDocumentDate(mps.documentDate);
        setDate(mps.date);
    }, [mpsJson])

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Container maxWidth="1050">
                        <Formik
                            initialValues={{
                                name: mps.name,
                                egn: mps.egn,
                                dateOfBirth: mps.dateOfBirth,
                                citizenship: mps.citizenship,
                                documentNumber: mps.documentNumber,
                                documentDate: mps.documentDate,
                                school: mps.school,
                                city: mps.city,
                                country: mps.country,
                                class: mps.class,
                                number: mps.number,
                                date: mps.date
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required('Името е задължително'),
                                egn: Yup.string().required('ЕГН-то е задължително'),
                                dateOfBirth: Yup.date().required('Датата на разждане е задължителна').typeError('Датата не е валидна'),
                                citizenship: Yup.string().required('Гражданството е задължително'),
                                documentNumber: Yup.string().required('Номерът на документ е задължителен'),
                                documentDate: Yup.date().required('Датата е задължителна').typeError('Датата не е валидна'),
                                school: Yup.string().required('Училището/институцията е задължителна'),
                                city: Yup.string().required('Градът е задължителен'),
                                country: Yup.string().required('Държавата е задължителна'),
                                class: Yup.string().required('Класът е задължителен'),
                                number: Yup.string().required('Номерът е задължителен'),
                                date: Yup.date().required('Датата е задължителна').typeError('Датата не е валидна')
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                mpsService.edit(mps.id, values)
                                    .then((res) => {
                                        messageContext[1]({ status: 'success', text: 'Заявлението е редактирано успешно!' });
                                        navigate('/app/mps', { replace: true });
                                        const interval = setInterval(function () {
                                            messageContext[1]('');
                                            clearInterval(interval);
                                        }, 2000)
                                    })
                                    .catch((err) => {
                                        setSubmitting(false)
                                        if (err.message === 'Unauthorized') {
                                            navigate('/login');
                                        }else {
                                            messageContext[1]({ status: 'error', text: err.message });
                                            const interval = setInterval(function () {
                                                messageContext[1]('');
                                                clearInterval(interval);
                                            }, 2000)
                                        }
                                    })
                            }}
                            enableReinitialize
                        >
                            {({
                                errors,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                setFieldValue,
                                isSubmitting,
                                touched,
                                values
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box sx={{ mb: 3, mt: 3 }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h3"
                                        >
                                            Редактиране на заявление
                                        </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        label="Име"
                                        margin="normal"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.name}
                                        variant="outlined"
                                    />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                error={Boolean(touched.egn && errors.egn)}
                                                fullWidth
                                                helperText={touched.egn && errors.egn}
                                                label="ЕГН/ ЛНЧ/ №"
                                                margin="normal"
                                                name="egn"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.egn}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    inputFormat="dd/MM/yyyy"
                                                    label="Дата на раждане"
                                                    value={dateOfBirth}
                                                    onChange={(newValue) => {
                                                        setFieldValue('dateOfBirth', moment(newValue).format('YYYY/MM/DD'))
                                                        setDateOfBirth(newValue)
                                                    }}
                                                    renderInput={(params) => {
                                                        params.error = Boolean(touched.dateOfBirth && errors.dateOfBirth);
                                                        return (<TextField
                                                            name="dateOfBirth"
                                                            helperText={touched.dateOfBirth && errors.dateOfBirth}
                                                            margin="normal"
                                                            onBlur={handleBlur}
                                                            fullWidth
                                                            {...params}
                                                        />)
                                                    }
                                                    }
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        error={Boolean(touched.citizenship && errors.citizenship)}
                                        fullWidth
                                        helperText={touched.citizenship && errors.citizenship}
                                        label="Гражданство"
                                        margin="normal"
                                        name="citizenship"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.citizenship}
                                        variant="outlined"
                                    />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                fullWidth
                                                label="№ на документ"
                                                margin="normal"
                                                name="documentNumber"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.documentNumber}
                                                variant="outlined"
                                                error={Boolean(touched.documentNumber && errors.documentNumber)}
                                                helperText={touched.documentNumber && errors.documentNumber}
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    inputFormat="dd/MM/yyyy"
                                                    label="От дата"
                                                    value={documentDate}
                                                    onChange={(newValue) => {
                                                        setFieldValue('documentDate', moment(newValue).format('YYYY/MM/DD'))
                                                        setDocumentDate(newValue)
                                                    }}
                                                    renderInput={(params) => {
                                                        params.error = Boolean(touched.documentDate && errors.documentDate);
                                                        return (<TextField
                                                            name="documentDate"
                                                            helperText={touched.documentDate && errors.documentDate}
                                                            margin="normal"
                                                            onBlur={handleBlur}
                                                            fullWidth
                                                            {...params}
                                                        />)
                                                    }
                                                    }
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} lg={4}>
                                            <TextField
                                                error={Boolean(touched.school && errors.school)}
                                                fullWidth
                                                helperText={touched.school && errors.school}
                                                label="Училище, институция"
                                                margin="normal"
                                                name="school"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.school}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <TextField
                                                error={Boolean(touched.city && errors.city)}
                                                fullWidth
                                                helperText={touched.city && errors.city}
                                                label="Град"
                                                margin="normal"
                                                name="city"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.city}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <TextField
                                                error={Boolean(touched.country && errors.country)}
                                                fullWidth
                                                helperText={touched.country && errors.country}
                                                label="Държава"
                                                margin="normal"
                                                name="country"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.country}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <FormControl
                                        fullWidth
                                        margin="normal"
                                        error={Boolean(touched.class && errors.class)}
                                    >
                                        <InputLabel id="class-label">Завършен клас</InputLabel>
                                        <Select
                                            labelId="class-label"
                                            id="class-select"
                                            value={values.class}
                                            label="Завършен клас"
                                            name="class"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={"VIII"}>VIII</MenuItem>
                                            <MenuItem value={"IX"}>IX</MenuItem>
                                            <MenuItem value={"X"}>X</MenuItem>
                                            <MenuItem value={"XI"}>XI</MenuItem>
                                            <MenuItem value={"XII"}>XII</MenuItem>
                                            <MenuItem value={"Основно образование"}>Основно образование</MenuItem>
                                            <MenuItem value={"Средно образование"}>Средно образование</MenuItem>
                                            <MenuItem value={"Първи гимназиален етап"}>Първи гимназиален етап</MenuItem>
                                            <MenuItem value={"Втори гимназиален етап"}>Втори гимназиален етап</MenuItem>
                                        </Select>
                                        <FormHelperText>{touched.class && errors.class}</FormHelperText>
                                    </FormControl>
                                    <TextField
                                        error={Boolean(touched.number && errors.number)}
                                        fullWidth
                                        helperText={touched.number && errors.number}
                                        label="№"
                                        margin="normal"
                                        name="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.number}
                                        variant="outlined"
                                    />
                                    <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            label="Дата"
                                            value={date}
                                            onChange={(newValue) => {
                                                setFieldValue('date', moment(newValue).format('YYYY/MM/DD'))
                                                setDate(newValue)
                                            }}
                                            renderInput={(params) => {
                                                params.error = Boolean(touched.date && errors.date);
                                                return (<TextField
                                                    name="date"
                                                    helperText={touched.date && errors.date}
                                                    margin="normal"
                                                    onBlur={handleBlur}
                                                    fullWidth
                                                    {...params}
                                                />)
                                            }
                                            }
                                        />
                                    </LocalizationProvider>
                                    <Box sx={{ py: 2 }}>
                                        <Button
                                            color="primary"
                                            // disabled={disableCreateButton(isSubmitting, errors, values)}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            Редактирай
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Container>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
}

export default MpsEditForm;