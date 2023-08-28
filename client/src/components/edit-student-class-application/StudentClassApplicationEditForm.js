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
import studentClassServices from '../../services/student-class';
import subjectServices from '../../services/subjects';
import AddSubjectModal from '../subject-modals/AddSubjectModal';

const StudentClassApplicationEditForm = ({ application, ...rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [dateOut, setDateOut] = useState(application.dateOut);
    const [documentDate, setDocumentDate] = useState(application.documentDate);
    const [inDate, setInDate] = useState(application.inDate);
    const [equivalenceExamsDate, setEquivalenceExamsDate] = useState(application.equivalenceExamsDate);
    const [subjects, setSubjects] = useState([]);
    const [openSubjectModal, setOpenSubjectModal] = useState(false);
    const scrollToEquivalenceExams = useRef(null);
    const scrollToGrades = useRef(null);
    const openSubjectModalProp = { openSubjectModal, setOpenSubjectModal };

    const applicationJson = JSON.stringify(application);

    useEffect(() => {
        setDateOut(application.dateOut);
        setDocumentDate(application.documentDate);
        setInDate(application.inDate);
        setEquivalenceExamsDate(application.equivalenceExamsDate);
    }, [applicationJson])

    useEffect(() => {
        loadSubjects();
    }, [])

    const loadSubjects = () => {
        subjectServices.getAll({})
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
            if (!values[key] && key != 'documentNumber' && key != 'equivalenceExamsDate') {
                return true;
            }
        }

        if (values.equivalenceExamsDate) {
            for (let i = 0; i < values.equivalenceExams.length; i++) {
                for (let key in values.equivalenceExams[i]) {
                    if (!values.equivalenceExams[i][key]) {
                        return true;
                    }
                }
            }

            if (errors['equivalenceExams']) {
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
            <AddSubjectModal openSubjectModalProp={openSubjectModalProp} loadSubjects={loadSubjects}/>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Container maxWidth="1050">
                        <Formik
                            initialValues={{
                                registerNumber: application.registerNumber,
                                dateOut: application.dateOut,
                                documentNumber: application.documentNumber,
                                documentDate: application.documentDate,
                                inNumber: application.inNumber,
                                inDate: application.inDate,
                                class: application.class,
                                admits: application.admits,
                                equivalenceExamsDate: application.equivalenceExamsDate || '',
                                equivalenceExams: application.equivalenceExams.length > 0 ? application.equivalenceExams : [
                                    {
                                        subjectName: ''
                                    }
                                ],
                                grades: application.grades
                            }}
                            validationSchema={Yup.object().shape({
                                registerNumber: Yup.string().required('Регистрационният номер е задължителен'),
                                dateOut: Yup.date().required('Датата на издаване е задължителна').typeError('Датата не е валидна'),
                                documentDate: Yup.date().required('Датата е задължителна').typeError('Датата не е валидна'),
                                inNumber: Yup.string().required('Входящият номер е задължителен'),
                                inDate: Yup.date().required('Датата на документите е задължителна').typeError('Датата не е валидна'),
                                class: Yup.string().required('Класът е задължителен'),
                                admits: Yup.string().required('Признава е задължително'),
                                equivalenceExamsDate: Yup.date().typeError('Датата не е валидна'),
                                equivalenceExams: Yup.array().of(Yup.object().shape({
                                    subjectName: Yup.string().when('equivalenceExamsDate', (equivalenceExamsDate) => {
                                        if (equivalenceExamsDate) {
                                            return Yup.string()
                                                .required('Името на предмет е задължително');
                                        }
                                    })
                                })),
                                grades: Yup.array().of(Yup.object().shape({
                                    subjectName: Yup.string().required('Името на предмет е задължително'),
                                    grade: Yup.string().required('Оценката е задължителна')
                                }))
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                let data = values;
                                if (!values.equivalenceExamsDate) {
                                    data.equivalenceExams = [];
                                }

                                studentClassServices.editApplication(data, application.id)
                                    .then(r => {
                                        messageContext[1]({ status: 'success', text: 'Заявлението е редактирано успешно!' });
                                        navigate('/app/students-class', { replace: true });
                                        const interval = setInterval(function () {
                                            messageContext[1]('');
                                            clearInterval(interval);
                                        }, 2000)
                                    })
                                    .catch(err => {
                                        setSubmitting(false)
                                        if (err.message === 'Unauthorized') {
                                            navigate('/login');
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
                                        error={Boolean(touched.class && errors.class)}
                                    >
                                        <InputLabel id="demo-simple-select-label">Издаване на удостоверение за завършен клас</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.class}
                                            label="Издаване на удостоверение за завършен клас"
                                            name="class"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={"VII"}>VII</MenuItem>
                                            <MenuItem value={"VIII"}>VIII</MenuItem>
                                            <MenuItem value={"IX"}>IX</MenuItem>
                                            <MenuItem value={"X"}>X</MenuItem>
                                            <MenuItem value={"XI"}>XI</MenuItem>
                                            <MenuItem value={"XII"}>XII</MenuItem>
                                        </Select>
                                        <FormHelperText>{touched.class && errors.class}</FormHelperText>
                                    </FormControl>
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
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={"ЗАВЪРШЕН СЕДМИ КЛАС"}>ЗАВЪРШЕН СЕДМИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ОСМИ КЛАС"}>ЗАВЪРШЕН ОСМИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ДЕВЕТИ КЛАС"}>ЗАВЪРШЕН ДЕВЕТИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ДЕСЕТИ КЛАС"}>ЗАВЪРШЕН ДЕСЕТИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ЕДИНАДЕСЕТИ КЛАС"}>ЗАВЪРШЕН ЕДИНАДЕСЕТИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ДВАНАДЕСЕТИ КЛАС"}>ЗАВЪРШЕН ДВАНАДЕСЕТИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ПЪРВИ СРОК НА СЕДМИ КЛАС"}>ЗАВЪРШЕН ПЪРВИ СРОК НА СЕДМИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ПЪРВИ СРОК НА ОСМИ КЛАС"}>ЗАВЪРШЕН ПЪРВИ СРОК НА ОСМИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ПЪРВИ СРОК НА ДЕВЕТИ КЛАС"}>ЗАВЪРШЕН ПЪРВИ СРОК НА ДЕВЕТИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ПЪРВИ СРОК НА ДЕСЕТИ КЛАС"}>ЗАВЪРШЕН ПЪРВИ СРОК НА ДЕСЕТИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ПЪРВИ СРОК НА ЕДИНАДЕСЕТИ КЛАС"}>ЗАВЪРШЕН ПЪРВИ СРОК НА ЕДИНАДЕСЕТИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕН ПЪРВИ СРОК НА ДВАНАДЕСЕТИ КЛАС"}>ЗАВЪРШЕН ПЪРВИ СРОК НА ДВАНАДЕСЕТИ КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕНО ОСНОВНО ОБРАЗОВАНИЕ - VII КЛАС"}>ЗАВЪРШЕНО ОСНОВНО ОБРАЗОВАНИЕ - VII КЛАС</MenuItem>
                                            <MenuItem value={"ЗАВЪРШЕНО ОСНОВНО ОБРАЗОВАНИЕ - VIII КЛАС"}>ЗАВЪРШЕНО ОСНОВНО ОБРАЗОВАНИЕ - VIII КЛАС</MenuItem>
                                        </Select>
                                        <FormHelperText>{touched.admits && errors.admits}</FormHelperText>
                                    </FormControl>
                                    <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            label="Срок за полагане на приравнителните изпити"
                                            value={equivalenceExamsDate}
                                            onChange={(newValue) => {
                                                if (newValue) {
                                                    setFieldValue('equivalenceExamsDate', moment(newValue).format('YYYY/MM/DD'))
                                                } else {
                                                    setFieldValue('equivalenceExamsDate', '');
                                                }
                                                setEquivalenceExamsDate(newValue)
                                            }}
                                            renderInput={(params) => {
                                                params.error = Boolean(touched.equivalenceExamsDate && errors.equivalenceExamsDate);
                                                return (<TextField
                                                    name="equivalenceExamsDate"
                                                    helperText={touched.equivalenceExamsDate && errors.equivalenceExamsDate}
                                                    margin="normal"
                                                    onBlur={handleBlur}
                                                    fullWidth
                                                    {...params}
                                                />)
                                            }
                                            }
                                        />
                                    </LocalizationProvider>
                                    <Box sx={{ mb: 1, mt: 2, ml: 2, display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => setOpenSubjectModal(true)}
                                        >
                                            Добaви предмет
                                        </Button>
                                    </Box>
                                    {equivalenceExamsDate &&
                                        <>
                                            <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h4"
                                                >
                                                    Приравнителни изпити
                                                </Typography>
                                            </Box>
                                            <FieldArray
                                                name="equivalenceExams"
                                                render={arrayHelpers => (
                                                    <>
                                                        {values.equivalenceExams.map((exam, index) => (
                                                            <SubjectGradeItem
                                                                key={index}
                                                                mode="equivalenceExams"
                                                                subjects={subjects}
                                                                noGrade
                                                                props={
                                                                    {
                                                                        arrayHelpers,
                                                                        values,
                                                                        errors,
                                                                        touched,
                                                                        el: exam,
                                                                        index,
                                                                        handleBlur,
                                                                        handleChange,
                                                                        setFieldValue,
                                                                        scrollTo: scrollToEquivalenceExams
                                                                    }
                                                                }
                                                            />
                                                        ))}
                                                        <div ref={scrollToEquivalenceExams}></div>
                                                    </>
                                                )}
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

export default StudentClassApplicationEditForm;