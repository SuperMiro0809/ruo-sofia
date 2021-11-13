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
    FormHelperText
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import userServices from '../../services/user';

const CustomerAddForm = ({ rest }) => {
    const navigate = useNavigate();

    const disableCreateButton = (isSubmitting, errors, values) => {
        if(isSubmitting || errors.name || errors.email || errors.password || !values.email || !values.password || !values.role || !values.name) {
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
                                name: '',
                                email: '',
                                password: '',
                                role: ''
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().max(255).required('Името е задължително'),
                                email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
                                password: Yup.string().max(255).required('Паролата е задължителна'),
                                role: Yup.string().required('Ролята е задължителна')
                            })}
                            onSubmit={(values) => {
                                console.log(values)
                                userServices.create(values)
                                .then(data => {
                                    console.log(data);
                                    navigate('/app/users', { replace: true });
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
                                            Добавяне на потребител
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
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="Имейл"
                                        margin="normal"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="email"
                                        value={values.email}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        label="Парола"
                                        margin="normal"
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.password}
                                        variant="outlined"
                                    />
                                    <FormControl 
                                        fullWidth
                                        margin="normal"
                                        error={Boolean(touched.role && errors.role)}
                                    >
                                        <InputLabel id="demo-simple-select-label">Роля</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.role}
                                            label="Роля"
                                            name="role"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={"Administrator"}>Администратор</MenuItem>
                                            <MenuItem value={"Qualifications"}>Квалификации</MenuItem>
                                            <MenuItem value={"Education"}>Образование</MenuItem>
                                        </Select>
                                        <FormHelperText>{touched.role && errors.role}</FormHelperText>
                                    </FormControl>
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

export default CustomerAddForm;
