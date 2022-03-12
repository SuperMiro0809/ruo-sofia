import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Button,
    Container,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    InputAdornment,
    Fab,
    Divider
} from '@material-ui/core';
import {
    DatePicker,
    DateRangePicker,
    LocalizationProvider
} from '@material-ui/lab';
import {
    Add as AddIcon,
    Remove as RemoveIcon
} from '@material-ui/icons';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import * as Yup from 'yup';
import { Formik, FieldArray, getIn } from 'formik';
import MеssageContext from '../../contexts/MessageContext';
import ProtocolEducationCommitteForm from '../protocol-education-committe/ProtocolEducationCommitteForm';
import committeEducationServices from '../../services/committeEducation';
import protocolClassServices from '../../services/protocolClass';

const ProtocolClassEditForm = ({protocol, ...rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [date, setDate] = useState(null);
    const [periodDate, setPeriodDate] = useState([null, null]);
    const [orderDate, setOrderDate] = useState(null);
    const [committe, setCommitte] = useState({ president: '', vicePresidents: ['', ''], members: ['', '', '', ''] });
    const protocolJson = JSON.stringify(protocol);

    useEffect(() => {
        committeEducationServices.getAll()
            .then(data => {
                setCommitte({
                    president: data[0].president,
                    vicePresidents: JSON.parse(data[0].vicePresidents),
                    members: JSON.parse(data[0].members)
                });
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }, []);

    useEffect(() => {
        setDate(protocol.date);
        setPeriodDate([protocol.startDate, protocol.endDate]);
        setOrderDate(protocol.orderDate);
    }, [protocolJson])

    const disableCreateButton = (isSubmitting, errors, values) => {
        for (let key in values) {
            if (!values[key]) {
                return true;
            }
        }

        for (let key in errors) {
            if (errors[key]) {
                return true;
            }
        }

        if (isSubmitting) {
            return true;
        }

        return false;
    };

    return (
        <Card {...rest} className="ProtocolAddForm">
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Container maxWidth="1050">
                        <Formik
                            initialValues={{
                                number: protocol.number,
                                date: protocol.date,
                                orderNumber: protocol.orderNumber,
                                orderDate: protocol.orderDate,
                                startDate: protocol.startDate,
                                endDate: protocol.endDate,
                                president: committe.president,
                                vicePresidents: committe.vicePresidents,
                                members: committe.members
                            }}
                            validationSchema={Yup.object().shape({
                                number: Yup.number().required('Номерът е задължителен').typeError('Трябва да въведете число'),
                                date: Yup.date().required('Датата е задължителна').typeError('Датата не е валидна'),
                                orderNumber: Yup.string().required('Номерът на заповедта е задължителен'),
                                orderDate: Yup.date().required('Датата на заповедта е задължителна').typeError('Датата не е валидна'),
                                startDate: Yup.date().required('Началната дата е задължителна').typeError('Датата не е валидна'),
                                endDate: Yup.date().required('Крайната дата е задължителна').typeError('Датата не е валидна')
                                    .min(
                                        Yup.ref('startDate'),
                                        'Крайната дата не може да е преди началната'
                                    ),
                                president: Yup.string().required('Президентът е задължителен'),
                                vicePresidents: Yup.array().of(Yup.string().required('Заместник-председателят е задължителен')),
                                members: Yup.array().of(Yup.string().required('Членът е задължителен'))
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                protocolClassServices.edit(protocol.id, values)
                                    .then(r => {
                                        messageContext[1]({ status: 'success', text: 'Протоколът е редактиран успешно!' });
                                        navigate('/app/protocols/students-class', { replace: true });
                                        const interval = setInterval(function () {
                                            messageContext[1]('');
                                            clearInterval(interval);
                                        }, 2000)
                                    })
                                    .catch(err => {
                                        if (err.message === 'Unauthorized') {
                                            navigate('/login');
                                        } else {
                                            messageContext[1]({ status: 'error', text: err.message });
                                            const interval = setInterval(function () {
                                                messageContext[1]('');
                                                clearInterval(interval);
                                            }, 3000)
                                            setSubmitting(false);
                                        }
                                    })
                            }}

                            enableReinitialize
                        >
                            {({
                                errors,
                                setFieldValue,
                                handleBlur,
                                handleChange,
                                handleSubmit,
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
                                            Генерираре на протокол
                                        </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.number && errors.number)}
                                        fullWidth
                                        helperText={touched.number && errors.number}
                                        label="Номер"
                                        margin="normal"
                                        name="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.number}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">№</InputAdornment>
                                        }}
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
                                    <TextField
                                        error={Boolean(touched.orderNumber && errors.orderNumber)}
                                        fullWidth
                                        helperText={touched.orderNumber && errors.orderNumber}
                                        label="Номер на заповедта"
                                        margin="normal"
                                        name="orderNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.orderNumber}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">№</InputAdornment>
                                        }}
                                    />
                                    <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            label="Дата на заповедта"
                                            value={orderDate}
                                            onChange={(newValue) => {
                                                setFieldValue('orderDate', moment(newValue).format('YYYY/MM/DD'))
                                                setOrderDate(newValue)
                                            }}
                                            renderInput={(params) => {
                                                params.error = Boolean(touched.orderDate && errors.orderDate);
                                                return (<TextField
                                                    name="orderDate"
                                                    helperText={touched.orderDate && errors.orderDate}
                                                    margin="normal"
                                                    onBlur={handleBlur}
                                                    fullWidth
                                                    {...params}
                                                />)
                                            }
                                            }
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                        <DateRangePicker
                                            startText="От"
                                            endText="До"
                                            value={periodDate}
                                            onChange={(newValue) => {
                                                setPeriodDate(newValue);
                                                setFieldValue(`startDate`, moment(newValue[0]).format('YYYY/MM/DD'));
                                                setFieldValue(`endDate`, moment(newValue[1]).format('YYYY/MM/DD'));
                                            }}
                                            renderInput={(startProps, endProps) => {
                                                startProps.error = Boolean(touched.startDate && errors.startDate);
                                                endProps.error = Boolean(touched.endDate && errors.endDate)
                                                return (
                                                    <React.Fragment>
                                                        <TextField
                                                            fullWidth
                                                            margin="normal"
                                                            name="startDate"
                                                            helperText={touched.startDate && errors.startDate}
                                                            onBlur={handleBlur}
                                                            {...startProps}
                                                        />
                                                        <Box sx={{ mx: 2 }}> - </Box>
                                                        <TextField
                                                            fullWidth
                                                            margin="normal"
                                                            name="endDate"
                                                            helperText={touched.endDate && errors.endDate}
                                                            onBlur={handleBlur}
                                                            {...endProps}
                                                        />
                                                    </React.Fragment>
                                                )
                                            }
                                            }
                                        />
                                    </LocalizationProvider>

                                    <ProtocolEducationCommitteForm
                                        props={{
                                            errors,
                                            setFieldValue,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                            isSubmitting,
                                            touched,
                                            values
                                        }}
                                    />

                                    <Box sx={{ py: 2 }}>
                                        <Button
                                            color="primary"
                                            disabled={disableCreateButton(isSubmitting, errors, values)}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            Генериране
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
};

export default ProtocolClassEditForm;