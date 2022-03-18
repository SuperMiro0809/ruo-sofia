import './ProtocolAddForm.scss';
import { useContext, useState, useRef, useEffect } from 'react';
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
import protocolServices from '../../services/protocol';
import ApplicationFormItem from './ApplicationFormItem';
import committeServices from '../../services/committe';
import CommitteModal from '../committe-modal/CommitteModal';

const ProtocolAddForm = ({ rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const scrollTo = useRef(null);
    const [date, setDate] = useState(null);
    const [committe, setCommitte] = useState({ president: '', members: ['', '', '', ''] });
    const [openCommitteModal, setOpenCommitteModal] = useState(false);
    const openCommitteModalProp = { openCommitteModal, setOpenCommitteModal };

    useEffect(() => {
        loadCommitte();
    }, []);

    const loadCommitte = () => {
        committeServices.getAll()
            .then(data => {
                setCommitte({ president: data[0].president, members: JSON.parse(data[0].members) });
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }

    const applicationElementsValidation = (values, mode, i) => {
        for (let j = 0; j < values.applications[i][mode].length; j++) {
            if (values.applications[i][mode][j].approve) {
                if (!values.applications[i][mode][j].credits) {
                    return true;
                }
            } else {
                if (!values.applications[i][mode][j].notApprove) {
                    return true;
                }
            }
        }
    }

    const disableCreateButton = (isSubmitting, errors, values) => {
        for (let key in values) {
            if (!values[key]) {
                return true;
            }
        }

        for (let i = 0; i < values.members.length; i++) {
            if (!values.members[i]) {
                return true;
            }
        }

        for (let i = 0; i < values.applications.length; i++) {
            for (let key in values.applications[i]) {
                if (!values.applications[i][key]) {
                    return true;
                }
            }

            if (applicationElementsValidation(values, 'teachings', i)) {
                return true;
            }
            if (applicationElementsValidation(values, 'reports', i)) {
                return true;
            }
            if (applicationElementsValidation(values, 'publications', i)) {
                return true;
            }
        }

        for (let key in errors) {
            if (errors[key]) {
                return true;
            }
        }

        if (errors['applications']) {
            return true;
        }

        if (errors['members']) {
            return true;
        }

        if (isSubmitting) {
            return true;
        }

        return false;
    };

    return (
        <Card {...rest} className="ProtocolAddForm">
            <CommitteModal openCommitteModalProp={openCommitteModalProp} loadCommitte={loadCommitte} committe={committe}/>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Container maxWidth="1050">
                        <Formik
                            initialValues={{
                                number: '',
                                date: '',
                                about: '',
                                president: '',
                                members: [''],
                                applications: [
                                    {
                                        ruoNumberOut: '',
                                        dateOut: '',
                                        teacher: '',
                                        application: '',
                                        teachings: [],
                                        reports: [],
                                        publications: []
                                    }
                                ],
                            }}
                            validationSchema={Yup.object().shape({
                                number: Yup.number().required('Номерът е задължителен').typeError('Трябва да въведете число'),
                                date: Yup.date().required('Датата е задължителна').typeError('Датата не е валидна'),
                                about: Yup.string().required('Относно е задължително'),
                                president: Yup.string().required('Председателят е задължителен'),
                                members: Yup.array().of(Yup.string().required('Членът е задължителен')),
                                applications: Yup.array().of(Yup.object().shape({
                                    ruoNumberOut: Yup.number().required('Изходящият номер е задължителен').typeError('Трябва да въведете число'),
                                    dateOut: Yup.date().required('Датата е задължителна').typeError('Датата не е валидна'),
                                    application: Yup.string().required('Заявлението е задължително'),
                                    teacher: Yup.string().required('Учителят е задължителен'),
                                    teachings: Yup.array().of(Yup.object().shape({
                                        credits: Yup.number().when('approve', (approve) => {
                                            if (approve) {
                                                return Yup.number()
                                                    .positive('Квалификационните кредити трябва да са положително число')
                                                    .integer('Квалификационните кредити трябва да са цяло число')
                                                    .required('Квалификационните кредити са задължителни');
                                            }
                                        }),
                                    })),
                                    reports: Yup.array().of(Yup.object().shape({
                                        credits: Yup.number().when('approve', (approve) => {
                                            if (approve) {
                                                return Yup.number()
                                                    .positive('Квалификационните кредити трябва да са положително число')
                                                    .integer('Квалификационните кредити трябва да са цяло число')
                                                    .required('Квалификационните кредити са задължителни');
                                            }
                                        }),
                                    })),
                                    publications: Yup.array().of(Yup.object().shape({
                                        credits: Yup.number().when('approve', (approve) => {
                                            if (approve) {
                                                return Yup.number()
                                                    .positive('Квалификационните кредити трябва да са положително число')
                                                    .integer('Квалификационните кредити трябва да са цяло число')
                                                    .required('Квалификационните кредити са задължителни');
                                            }
                                        }),
                                    }))
                                }))
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                if (!values) {
                                    setSubmitting(false);
                                } else {
                                    protocolServices.create(values)
                                        .then(r => {
                                            messageContext[1]({ status: 'success', text: 'Протоколът е генериран успешно!' });
                                            navigate('/app/protocols', { replace: true });
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
                                }
                            }}
                            validateOnBlur={true}
                            validateOnChange={false}
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
                                        error={Boolean(touched.about && errors.about)}
                                        fullWidth
                                        helperText={touched.about && errors.about}
                                        label="Относно"
                                        margin="normal"
                                        name="about"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.about}
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                    />
                                    <Box sx={{ mb: 1, mt: 2, ml: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            Комисия
                                        </Typography>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => setOpenCommitteModal(true)}
                                        >
                                            Редактирай комисия
                                        </Button>
                                    </Box>
                                    <Box sx={{ ml: 2 }}>
                                        <FormControl
                                            fullWidth
                                            margin="normal"
                                            error={Boolean(touched.president && errors.president)}
                                        >
                                            <InputLabel id="demo-simple-select-label">Председател</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={values.president}
                                                label="Президент"
                                                name="president"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <MenuItem value={committe.president}>{committe.president}</MenuItem>
                                            </Select>
                                            <FormHelperText>{touched.president && errors.president}</FormHelperText>
                                        </FormControl>
                                        <FieldArray
                                            name="members"
                                            render={arrayHelpers => (
                                                <>
                                                    {values.members.map((member, index) => (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <FormControl
                                                                fullWidth
                                                                margin="normal"
                                                                error={Boolean(touched.members && errors.members)}
                                                                sx={values.members.length - 1 == index ? { mb: 2 } : { mb: 1 }}
                                                            >
                                                                <InputLabel id="demo-simple-select-label">{`Член ${index + 1}`}</InputLabel>
                                                                <Select
                                                                    label="Членове"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    name={`members.${index}`}
                                                                    value={values.members[index]}
                                                                >
                                                                    {committe.members.map((member, index) => (
                                                                        <MenuItem key={index} value={member}>{member}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                                {/* <FormHelperText>{touched.members && errors.members ? errors.members[index] : ''}</FormHelperText> */}
                                                            </FormControl>
                                                            {index == 0 ? (
                                                                <div style={{ marginTop: '16px', marginBottom: values.members.length - 1 == index ? '16px' : '8px' }}>
                                                                    <Fab onClick={() => arrayHelpers.push('')} sx={{ marginLeft: '15px' }} size="medium" color="primary" aria-label="add">
                                                                        <AddIcon />
                                                                    </Fab>
                                                                </div>
                                                            ) : (
                                                                    <div style={{ marginTop: '16px', marginBottom: values.members.length - 1 == index ? '16px' : '8px' }}>
                                                                        <Fab onClick={() => arrayHelpers.remove(index)} sx={{ marginLeft: '15px' }} size="medium" color="primary" aria-label="remove">
                                                                            <RemoveIcon />
                                                                        </Fab>
                                                                    </div>
                                                                )}
                                                        </Box>
                                                    ))}
                                                </>
                                            )}
                                        />
                                    </Box>
                                    <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            Добавяне на заявление
                                        </Typography>
                                    </Box>
                                    <FieldArray
                                        name="applications"
                                        render={arrayHelpers => (
                                            <>
                                                {values.applications.map((application, index) => (
                                                    <ApplicationFormItem
                                                        key={index}
                                                        props={
                                                            {
                                                                application,
                                                                index,
                                                                arrayHelpers,
                                                                errors,
                                                                setFieldValue,
                                                                handleBlur,
                                                                handleChange,
                                                                touched,
                                                                values,
                                                                scrollTo
                                                            }
                                                        }
                                                    />
                                                ))}
                                            </>
                                        )}
                                    />

                                    <Divider />
                                    <div ref={scrollTo}></div>
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

export default ProtocolAddForm;