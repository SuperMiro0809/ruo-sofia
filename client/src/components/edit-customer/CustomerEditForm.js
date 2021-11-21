import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
import MеssageContext from '../../contexts/MessageContext';

const CustomerEditForm = ({ customer, ...rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();

    const disableCreateButton = (isSubmitting, errors, values) => {
        if(isSubmitting || errors.name || errors.email || !values.email || !values.role || !values.name) {
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
                                name: customer.name,
                                email: customer.email,
                                role: customer.role
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().max(255).required('Името е задължително'),
                                email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
                                role: Yup.string().required('Ролята е задължителна')
                            })}
                            onSubmit={(values) => {
                                userServices.editUser({id: customer.id, ...values})
                                .then(data => {
                                    console.log(data);
                                    messageContext[1]({ status: 'success', text: data.message })
                                    navigate('/app/users', { replace: true });
                                    const interval = setInterval(function () {
                                        messageContext[1]('');
                                        clearInterval(interval);
                                    }, 2000)
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
                                            Редактиране на потребител
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
                                            <MenuItem value={"Member"}>Потребител</MenuItem>
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

export default CustomerEditForm;
