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
    InputAdornment
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MеssageContext from '../../contexts/MessageContext';
import teacherServices from '../../services/teacher';

const TeachersAddForm = ({ rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState({ firstName: '', middleName: '', lastName: '' });

    const disableCreateButton = (isSubmitting, errors, values) => {
        if (isSubmitting || errors.name || errors.email || errors.password || !values.email || !values.password || !values.role || !values.name) {
            return true;
        }
    }

    const findByEgn = (egn, setFieldValue) => {
        teacherServices.getByEgn(egn)
            .then(data => {
                if (data.length === 1) {
                    setTeacher(data[0])
                    setFieldValue('teacher.firstName', data[0].firstName);
                    setFieldValue('teacher.middleName', data[0].middleName);
                    setFieldValue('teacher.lastName', data[0].lastName);
                }
                console.log(data);
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
                            })}
                            onSubmit={(values) => {
                                console.log(values)
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
                                                findByEgn(e.currentTarget.value, setFieldValue);
                                                // setFieldValue('teacher.firstName', teacher.firstName);
                                                // setFieldValue('teacher.middleName', teacher.middleName);
                                                // setFieldValue('teacher.lastName', teacher.lastName);
                                            }else {
                                                setTeacher({ firstName: '', middleName: '', lastName: '' });
                                            }
                                        }}
                                        type="text"
                                        value={values.egn}
                                        variant="outlined"
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
                                        disabled={teacher.firstName ? true: false}
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
                                        disabled={teacher.middleName ? true: false}
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
                                        disabled={teacher.lastName ? true: false}
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
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
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
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
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
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
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
                                            error={Boolean(touched.position && errors.position)}
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
                                            <FormHelperText>{touched.position && errors.position}</FormHelperText>
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
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
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
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
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
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
                                            label="Образователна-квалификационна степен"
                                            margin="normal"
                                            name="education.qualification"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.education.qualification}
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
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
                                            error={Boolean(touched.number && errors.number)}
                                            fullWidth
                                            helperText={touched.number && errors.number}
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
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
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
                                            // disabled={disableCreateButton(isSubmitting, errors, values)}
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
