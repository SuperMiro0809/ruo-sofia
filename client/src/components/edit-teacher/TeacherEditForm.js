import { useContext } from 'react';
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
    Typography
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MеssageContext from '../../contexts/MessageContext';
import teacherServices from '../../services/teacher';

const TeacherEditForm = ({teacher, ...rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();

    const disableCreateButton = (isSubmitting, errors, values) => {
        for(let key in values) {
            if(!values[key]) {
                return true
            }
        }

        for(let key in errors) {
            if(errors[key]) {
                return true;
            }
        }

        if(isSubmitting) {
            return true;
        }
    }

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Container maxWidth="1050">
                        <Formik
                            initialValues={{
                                egn: teacher.egn,
                                firstName: teacher.firstName,
                                middleName: teacher.middleName,
                                lastName: teacher.lastName
                            }}
                            validationSchema={Yup.object().shape({
                                egn: Yup.number()
                                    .test('len', 'ЕГН-то трябва е точно 10 цифри', val => val ? val.toString().length === 10 : '')
                                    .typeError('ЕГН-то трябва да съдържа само цифри')
                                    .required('ЕГН-то е задължително'),
                                firstName: Yup.string().max(255).required('Името е задължително'),
                                middleName: Yup.string().max(255).required('Презимето е задължително'),
                                lastName: Yup.string().max(255).required('Фамилията е задължителна'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                values.id = teacher.id;
                                teacherServices.edit(values)
                                .then(data => {
                                    messageContext[1]({ status: 'success', text: 'Учителят е редактиран успешно' });
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
                                            Редактиране на учител
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
                                        onChange={handleChange}
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
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.firstName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.middleName && errors.middleName)}
                                        fullWidth
                                        helperText={touched.middleName && errors.middleName}
                                        label="Презиме"
                                        margin="normal"
                                        name="middleName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.middleName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        fullWidth
                                        helperText={touched.lastName && errors.lastName}
                                        label="Фамилия"
                                        margin="normal"
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.lastName}
                                        variant="outlined"
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
};

export default TeacherEditForm;
