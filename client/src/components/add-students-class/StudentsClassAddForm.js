import { useContext, useState, useRef } from 'react';
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
} from '@material-ui/core';
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

const StudentsClassAddForm = ({ rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [dateOut, setDateOut] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [documentDate, setDocumentDate] = useState(null);
    const [inDate, setInDate] = useState(null);
    const [equivalenceExamsDate, setEquivalenceExamsDate] = useState(null);
    const scrollToEquivalenceExams = useRef(null);
    const scrollToGrades = useRef(null);

    const disableCreateButton = (isSubmitting, errors, values) => {
        for (let key in values) {
            if (!values[key] && key != 'documentNumber' && key != 'equivalenceExamsDate') {
                return true;
            }
        }

        if(values.equivalenceExamsDate) {
            for(let i = 0; i < values.equivalenceExams.length; i++) {
                for(let key in values.equivalenceExams[i]) {
                    if(!values.equivalenceExams[i][key]) {
                        return true;
                    }
                }
            }

            if(errors['equivalenceExams']) {
                return true;
            }
        }

        for(let i = 0; i < values.grades.length; i++) {
            for(let key in values.grades[i]) {
                if(!values.grades[i][key]) {
                    return true;
                }
            }
        }

        for (let key in errors) {
            if (errors[key]) {
                return true;
            }
        }

        if(errors['grades']) {
            return true;
        }

        if(isSubmitting) {
            return true;
        }

        return false;
    }

    return (
        <Card {...rest}>
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
                                class: '',
                                admits: '',
                                equivalenceExamsDate: '',
                                equivalenceExams: [
                                    {
                                        subjectName: '',
                                        grade: ''
                                    }
                                ],
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
                                class: Yup.string().required('Класът е задължителен'),
                                admits: Yup.string().required('Признава е задължително'),
                                equivalenceExams: Yup.array().of(Yup.object().shape({
                                    subjectName: Yup.string().when('equivalenceExamsDate', (equivalenceExamsDate) => {
                                        if (equivalenceExamsDate) {
                                            return Yup.string()
                                                .required('Името на предмет е задължително');
                                        }
                                    }),
                                    grade: Yup.string().when('equivalenceExamsDate', (equivalenceExamsDate) => {
                                        if (equivalenceExamsDate) {
                                            return Yup.string()
                                                .required('Оценката е задължителна');
                                        }
                                    }),
                                })),
                                grades: Yup.array().of(Yup.object().shape({
                                    subjectName: Yup.string().required('Името на предмет е задължително'),
                                    grade: Yup.string().required('Оценката е задължителна')
                                }))
                            })}
                            onSubmit={(values) => {
                                console.log(values);
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
                                                setFieldValue('equivalenceExamsDate', moment(newValue).format('YYYY/MM/DD'))
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
                                    <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
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

export default StudentsClassAddForm;
