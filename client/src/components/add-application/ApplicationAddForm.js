import { useContext, useState } from 'react';
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
    CircularProgress
} from '@material-ui/core';
import {
    Check as CheckIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import * as Yup from 'yup';
import { Formik, getIn } from 'formik';
import MеssageContext from '../../contexts/MessageContext';
import teacherServices from '../../services/teacher';

const TeachersAddForm = ({ rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(false);
    const [teacherId, setTeacherId] = useState();
    const [search, setSearch] = useState(false);

    const disableCreateButton = (isSubmitting, errors, values) => {
        for (let key in values) {
            if (!values[key]) {
                return true;
            }
        }

        for (let key in values.workplace) {
            if (!values.workplace[key]) {
                return true;
            }
        }

        for (let key in values.education) {
            if (!values.education[key]) {
                return true;
            }
        }

        for (let key in values.diploma) {
            if (!values.diploma[key]) {
                return true;
            }
        }

        for (let key in errors) {
            if (errors[key]) {
                return true;
            }
        }

        if (errors['workplace'] || errors['education'] || errors['diploma']) {
            return true;
        }

        if(isSubmitting) {
            return true;
        }

        return false;
    }

    const findByEgn = (egn, setFieldValue) => {
        teacherServices.getByEgn(egn)
            .then(data => {
                setSearch(false);
                if (data.length === 1) {
                    setTeacher(true);
                    setTeacherId(data[0].id);
                    setFieldValue('teacher.firstName', data[0].firstName);
                    setFieldValue('teacher.middleName', data[0].middleName);
                    setFieldValue('teacher.lastName', data[0].lastName);
                }
            })
    }

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Container maxWidth="1050">
                        <Formik
                            initialValues={{
                                egn: '',
                                adress: '',
                                tel: '',
                                teacher: {
                                    firstName: '',
                                    middleName: '',
                                    lastName: ''
                                },
                                workplace: {
                                    place: '',
                                    city: '',
                                    area: '',
                                    position: ''
                                },
                                education: {
                                    school: '',
                                    city: '',
                                    qualification: '',
                                    degree: '',
                                },
                                diploma: {
                                    number: '',
                                    from: ''
                                }
                            }}
                            validationSchema={Yup.object().shape({
                                egn: Yup.number()
                                    .test('len', 'ЕГН-то трябва е точно 10 цифри', val => val ? val.toString().length === 10 : '')
                                    .typeError('ЕГН-то трябва да съдържа само цифри')
                                    .required('ЕГН-то е задължително'),
                                adress: Yup.string().max(255).required('Адресът е задължителен'),
                                workplace: Yup.object().shape({
                                    place: Yup.string().max(255).required('Местоработата е задължителна'),
                                    city: Yup.string().max(255).required('Градът е задължителен'),
                                    area: Yup.string().max(255).required('Областта е задължителна'),
                                    position: Yup.string().max(255).required('Длъжността е задължителна')
                                }),
                                education: Yup.object().shape({
                                    school: Yup.string().max(255).required('Учебното заведение е задължително'),
                                    city: Yup.string().max(255).required('Градът е задължителен'),
                                    qualification: Yup.string().max(255).required('Образователно-квалификационната степен е задължителна'),
                                    degree: Yup.string().max(255).required('Специалността е задължителна'),
                                }),
                                diploma: Yup.object().shape({
                                    number: Yup.number().required('Номерът е задължителен').typeError('Трябва да въведете число'),
                                    from: Yup.string().max(255).required('Учебното заведение е задължително')
                                })
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                let data = teacher ? { teacherId, ...values } : values;
                                teacherServices.addApplication(data)
                                .then(res => {
                                    console.log(res);
                                    messageContext[1]({ status: 'success', text: 'Заявлението е добавено успешно!' })
                                    navigate('/app/teachers', { replace: true });
                                    const interval = setInterval(function () {
                                        messageContext[1]('');
                                        clearInterval(interval);
                                    }, 2000)
                                })
                                .catch(err => {
                                    setSubmitting(false);
                                })
                            }}
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
                                            Добавяне на заявление
                                        </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.egn && errors.egn)}
                                        fullWidth
                                        helperText={touched.egn && errors.egn}
                                        label="ЕГН"
                                        margin="normal"
                                        name="egn"
                                        onBlur={handleBlur}
                                        onChange={e => {
                                            handleChange(e);
                                            if (e.currentTarget.value.length === 10) {
                                                setSearch(true);
                                                findByEgn(e.currentTarget.value, setFieldValue);
                                            } else {
                                                setTeacher(false);
                                                setTeacherId(null);
                                            }
                                        }}
                                        type="text"
                                        value={values.egn}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                {touched.egn &&
                                                    <>
                                                        {search ?
                                                            <CircularProgress size="28px" />
                                                            :
                                                            <>
                                                                {touched.egn && teacher ?
                                                                    <CheckIcon sx={{ color: "rgb(76, 175, 80)" }} />
                                                                    :
                                                                    <CloseIcon sx={{ color: "rgb(239, 83, 80)" }} />
                                                                }
                                                            </>

                                                        }
                                                    </>
                                                }
                                            </InputAdornment>
                                        }}
                                    />

                                    <TextField
                                        error={Boolean(touched.firstName && errors.firstName)}
                                        fullWidth
                                        helperText={touched.firstName && errors.firstName}
                                        label="Име"
                                        margin="normal"
                                        name="teacher.firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.teacher.firstName}
                                        variant="outlined"
                                        disabled={teacher}
                                    />
                                    <TextField
                                        error={Boolean(touched.middleName && errors.middleName)}
                                        fullWidth
                                        helperText={touched.middleName && errors.middleName}
                                        label="Презиме"
                                        margin="normal"
                                        name="teacher.middleName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.teacher.middleName}
                                        variant="outlined"
                                        disabled={teacher}
                                    />
                                    <TextField
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        fullWidth
                                        helperText={touched.lastName && errors.lastName}
                                        label="Фамилия"
                                        margin="normal"
                                        name="teacher.lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.teacher.lastName}
                                        variant="outlined"
                                        disabled={teacher}
                                    />
                                    <TextField
                                        error={Boolean(touched.adress && errors.adress)}
                                        fullWidth
                                        helperText={touched.adress && errors.adress}
                                        label="Адрес"
                                        margin="normal"
                                        name="adress"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.adress}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.tel && errors.tel)}
                                        fullWidth
                                        helperText={touched.tel && errors.tel}
                                        label="Телефон"
                                        margin="normal"
                                        name="tel"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.tel}
                                        variant="outlined"
                                    />
                                    <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            Месторабота
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ml: 2 }}>
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'workplace.place') &&
                                                getIn(errors, 'workplace.place')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'workplace.place') &&
                                                getIn(errors, 'workplace.place')
                                            }
                                            label="Месторабота"
                                            margin="normal"
                                            name="workplace.place"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.workplace.place}
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'workplace.city') &&
                                                getIn(errors, 'workplace.city')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'workplace.city') &&
                                                getIn(errors, 'workplace.city')
                                            }
                                            label="Град"
                                            margin="normal"
                                            name="workplace.city"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.workplace.city}
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'workplace.area') &&
                                                getIn(errors, 'workplace.area')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'workplace.area') &&
                                                getIn(errors, 'workplace.area')
                                            }
                                            label="Област"
                                            margin="normal"
                                            name="workplace.area"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.workplace.area}
                                            variant="outlined"
                                        />
                                        <FormControl
                                            fullWidth
                                            margin="normal"
                                            error={Boolean(
                                                getIn(touched, 'workplace.position') &&
                                                getIn(errors, 'workplace.position')
                                            )}
                                        >
                                            <InputLabel id="demo-simple-select-label">Длъжност</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={values.workplace.position}
                                                label="Длъжност"
                                                name="workplace.position"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <MenuItem value={"Учител"}>Учител</MenuItem>
                                                <MenuItem value={"Старши учител"}>Старши учител</MenuItem>
                                                <MenuItem value={"Главен учител"}>Главен учител</MenuItem>
                                            </Select>
                                            <FormHelperText>{ getIn(touched, 'workplace.position') && getIn(errors, 'workplace.position')}</FormHelperText>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            Висше образование
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ml: 2 }}>
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'education.school') &&
                                                getIn(errors, 'education.school')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'education.school') &&
                                                getIn(errors, 'education.school')
                                            }
                                            label="Завършил(а)"
                                            margin="normal"
                                            name="education.school"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.education.school}
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'education.city') &&
                                                getIn(errors, 'education.city')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'education.city') &&
                                                getIn(errors, 'education.city')
                                            }
                                            label="Град"
                                            margin="normal"
                                            name="education.city"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.education.city}
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'education.qualification') &&
                                                getIn(errors, 'education.qualification')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'education.qualification') &&
                                                getIn(errors, 'education.qualification')
                                            }
                                            label="Образователно-квалификационна степен"
                                            margin="normal"
                                            name="education.qualification"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.education.qualification}
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'education.degree') &&
                                                getIn(errors, 'education.degree')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'education.degree') &&
                                                getIn(errors, 'education.degree')
                                            }
                                            label="Специалност"
                                            margin="normal"
                                            name="education.degree"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.education.degree}
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            Диплома
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ml: 2 }}>
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'diploma.number') &&
                                                getIn(errors, 'diploma.number')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'diploma.number') &&
                                                getIn(errors, 'diploma.number')
                                            }
                                            label="Номер"
                                            margin="normal"
                                            name="diploma.number"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.diploma.number}
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">№</InputAdornment>
                                            }}
                                        />
                                        <TextField
                                            error={Boolean(
                                                getIn(touched, 'diploma.from') &&
                                                getIn(errors, 'diploma.from')
                                            )}
                                            fullWidth
                                            helperText={
                                                getIn(touched, 'diploma.from') &&
                                                getIn(errors, 'diploma.from')
                                            }
                                            label="От"
                                            margin="normal"
                                            name="diploma.from"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.diploma.from}
                                            variant="outlined"
                                        />
                                    </Box>
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

export default TeachersAddForm;
