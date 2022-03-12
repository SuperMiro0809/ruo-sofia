import { useContext, useState, useRef, useEffect } from 'react';
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
    FormHelperText,
    InputAdornment,
    CircularProgress,
    Tooltip,
    Zoom
} from '@material-ui/core';
import {
    Check as CheckIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import {
    DatePicker,
    LocalizationProvider
} from '@material-ui/lab';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import MеssageContext from '../../contexts/MessageContext';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import SubjectGradeItem from './SubjectGradeItem';
import studentSecondaryServices from '../../services/student-secondary';
import subjectServices from '../../services/subjects';
import AddSubjectModal from '../subject-modals/AddSubjectModal';

const StudentSecondaryAddForm = ({ rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [dateOut, setDateOut] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [documentDate, setDocumentDate] = useState(null);
    const [inDate, setInDate] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [openSubjectModal, setOpenSubjectModal] = useState(false);
    const scrollToGrades = useRef(null);
    const openSubjectModalProp = { openSubjectModal, setOpenSubjectModal };

    useEffect(() => {
        loadSubjects();
    }, [])

    const loadSubjects = () => {
        subjectServices.getAll()
            .then(data => {
                let arr = [];

                data.forEach((subj) => {
                    arr.push({
                        label: subj.name,
                        id: subj.id,
                    });
                })

                setSubjects(arr);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }

    const disableCreateButton = (isSubmitting, errors, values) => {
        for (let key in values) {
            if (!values[key] && key != 'documentNumber' && key != 'profession' && key != 'speciality') {
                return true;
            }
        }

        if(values.admits === "ЗАВЪРШЕНО СРЕДНО С ПКС") {
            if(!values.profession || !values.speciality) {
                return true;
            }
        }

        for (let i = 0; i < values.grades.length; i++) {
            for (let key in values.grades[i]) {
                if (!values.grades[i][key]) {
                    return true;
                }
            }
        }

        for (let key in errors) {
            if (errors[key]) {
                return true;
            }
        }

        if (errors['grades']) {
            return true;
        }

        if (isSubmitting) {
            return true;
        }

        return false;
    }

    return (
        <Card {...rest}>
            <AddSubjectModal openSubjectModalProp={openSubjectModalProp} loadSubjects={loadSubjects} />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Container maxWidth="1050">
                        <Formik
                            initialValues={{
                                registerNumber: '',
                                dateOut: '',
                                name: '',
                                egn: '',
                                dateOfBirth: '',
                                citizenship: '',
                                documentNumber: '',
                                documentDate: '',
                                school: '',
                                cityAndCountry: '',
                                inNumber: '',
                                inDate: '',
                                admits: '',
                                profession: '',
                                speciality: '',
                                grades: [
                                    {
                                        subjectName: '',
                                        grade: ''
                                    }
                                ]
                            }}
                            validationSchema={Yup.object().shape({
                                registerNumber: Yup.string().required('Регистрационният номер е задължителен'),
                                dateOut: Yup.date().required('Датата на издаване е задължителна').typeError('Датата не е валидна'),
                                name: Yup.string().required('Името е задължително'),
                                egn: Yup.number()
                                    .test('len', 'ЕГН-то трябва е точно 10 цифри', val => val ? val.toString().length === 10 : '')
                                    .typeError('ЕГН-то трябва да съдържа само цифри')
                                    .required('ЕГН-то е задължително'),
                                dateOfBirth: Yup.date().required('Датата на разждане е задължителна').typeError('Датата не е валидна'),
                                citizenship: Yup.string().required('Гражданството е задължително'),
                                documentDate: Yup.date().required('Датата е задължителна').typeError('Датата не е валидна'),
                                school: Yup.string().required('Училището/институцията е задължителна'),
                                cityAndCountry: Yup.string().required('Град/Държава е задължителна'),
                                inNumber: Yup.string().required('Входящият номер е задължителен'),
                                inDate: Yup.date().required('Датата на документите е задължителна').typeError('Датата не е валидна'),
                                admits: Yup.string().required('Признава е задължително'),
                                profession: Yup.string().when('admits', (admits) => {
                                    if(admits === "ЗАВЪРШЕНО СРЕДНО С ПКС") {
                                        return Yup.string().required('Професията е задължителна!');
                                    }
                                }),
                                speciality: Yup.string().when('admits', (admits) => {
                                    if(admits === "ЗАВЪРШЕНО СРЕДНО С ПКС") {
                                        return Yup.string().required('Специалността е задължителна!');
                                    }
                                }),
                                grades: Yup.array().of(Yup.object().shape({
                                    subjectName: Yup.string().required('Името на предмет е задължително'),
                                    grade: Yup.string().required('Оценката е задължителна')
                                }))
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);

                                studentSecondaryServices.create(values)
                                    .then(r => {
                                        messageContext[1]({ status: 'success', text: 'Ученикът е добавен успешно!' });
                                        navigate('/app/students-secondary', { replace: true });
                                        const interval = setInterval(function () {
                                            messageContext[1]('');
                                            clearInterval(interval);
                                        }, 2000)
                                    })
                                    .catch(err => {
                                        setSubmitting(false)
                                        if (err.message === 'Unauthorized') {
                                            navigate('/login');
                                        }else {
                                            messageContext[1]({ status: 'error', text: err.message });
                                            const interval = setInterval(function () {
                                                messageContext[1]('');
                                                clearInterval(interval);
                                            }, 3000)
                                            setSubmitting(false);
                                        }
                                    })
                            }}
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
                                            Добавяне на ученик
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                error={Boolean(touched.registerNumber && errors.registerNumber)}
                                                fullWidth
                                                helperText={touched.registerNumber && errors.registerNumber}
                                                label="Регистрационен №"
                                                margin="normal"
                                                name="registerNumber"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.registerNumber}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    inputFormat="dd/MM/yyyy"
                                                    label="Дата на издаване"
                                                    value={dateOut}
                                                    onChange={(newValue) => {
                                                        setFieldValue('dateOut', moment(newValue).format('YYYY/MM/DD'))
                                                        setDateOut(newValue)
                                                    }}
                                                    renderInput={(params) => {
                                                        params.error = Boolean(touched.dateOut && errors.dateOut);
                                                        return (<TextField
                                                            name="dateOut"
                                                            helperText={touched.dateOut && errors.dateOut}
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
                                                onChange={e => {
                                                    handleChange(e);
                                                }}
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
                                    <TextField
                                        error={Boolean(touched.cityAndCountry && errors.cityAndCountry)}
                                        fullWidth
                                        helperText={touched.cityAndCountry && errors.cityAndCountry}
                                        label="Град/ Държава"
                                        margin="normal"
                                        name="cityAndCountry"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.cityAndCountry}
                                        variant="outlined"
                                    />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                error={Boolean(touched.inNumber && errors.inNumber)}
                                                fullWidth
                                                helperText={touched.inNumber && errors.inNumber}
                                                label="Входящ № на документите"
                                                margin="normal"
                                                name="inNumber"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.inNumber}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    inputFormat="dd/MM/yyyy"
                                                    label="Дата на документите"
                                                    value={inDate}
                                                    onChange={(newValue) => {
                                                        setFieldValue('inDate', moment(newValue).format('YYYY/MM/DD'))
                                                        setInDate(newValue)
                                                    }}
                                                    renderInput={(params) => {
                                                        params.error = Boolean(touched.inDate && errors.inDate);
                                                        return (<TextField
                                                            name="inDate"
                                                            helperText={touched.inDate && errors.inDate}
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
                                    <FormControl
                                        fullWidth
                                        margin="normal"
                                        error={Boolean(touched.admits && errors.admits)}
                                    >
                                        <InputLabel id="demo-simple-select-label">Признава</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.admits}
                                            label="Признава"
                                            name="admits"
                                            onChange={(e) => {
                                                handleChange(e);
                                                if(e.target.value === "ЗАВЪРШЕНО СРЕДНО С ПКС") {
                                                    setFieldValue('profession', '');
                                                    setFieldValue('speciality', '');
                                                }
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={"ЗАВЪРШЕНО СРЕДНО ОБРАЗОВАНИЕ"}>ЗАВЪРШЕНО СРЕДНО ОБРАЗОВАНИЕ</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ПЪРВИ ГИМНАЗИАЛЕН ЕТАП НА СРЕДНО ОБРАЗОВАНИЕ"}>ЗАВЪРШЕН ПЪРВИ ГИМНАЗИАЛЕН ЕТАП НА СРЕДНО ОБРАЗОВАНИЕ</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕНО СРЕДНО С ПКС"}>ЗАВЪРШЕНО СРЕДНО С ПКС</MenuItem>
                                        </Select>
                                        <FormHelperText>{touched.admits && errors.admits}</FormHelperText>
                                    </FormControl>
                                    {values.admits === "ЗАВЪРШЕНО СРЕДНО С ПКС" &&
                                        <>
                                            <TextField
                                                error={Boolean(touched.profession && errors.profession)}
                                                fullWidth
                                                helperText={touched.profession && errors.profession}
                                                label="Професия"
                                                margin="normal"
                                                name="profession"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.profession}
                                                variant="outlined"
                                            />
                                            <TextField
                                                error={Boolean(touched.speciality && errors.speciality)}
                                                fullWidth
                                                helperText={touched.speciality && errors.speciality}
                                                label="Специалност"
                                                margin="normal"
                                                name="speciality"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.speciality}
                                                variant="outlined"
                                            />
                                        </>
                                    }

                                    <Box sx={{ mb: 1, mt: 2, ml: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            Признати оценки по предмети
                                        </Typography>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => setOpenSubjectModal(true)}
                                        >
                                            Добaви предмет
                                        </Button>
                                    </Box>
                                    <FieldArray
                                        name="grades"
                                        render={arrayHelpers => (
                                            <>
                                                {values.grades.map((gradeItem, index) => (
                                                    <SubjectGradeItem
                                                        key={index}
                                                        mode="grades"
                                                        subjects={subjects}
                                                        props={
                                                            {
                                                                arrayHelpers,
                                                                values,
                                                                errors,
                                                                touched,
                                                                el: gradeItem,
                                                                index,
                                                                handleBlur,
                                                                handleChange,
                                                                setFieldValue,
                                                                scrollTo: scrollToGrades
                                                            }
                                                        }
                                                    />
                                                ))}
                                                <div ref={scrollToGrades}></div>
                                            </>
                                        )}
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
                                            Добави
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

export default StudentSecondaryAddForm;
