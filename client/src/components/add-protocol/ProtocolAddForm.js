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
    FormHelperText
} from '@material-ui/core';
import { 
    DatePicker,
    LocalizationProvider
} from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MеssageContext from '../../contexts/MessageContext';

const ProtocolAddForm = ({ rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [date, setDate] = useState(null);

    const disableCreateButton = (isSubmitting, errors, values) => {
        if (isSubmitting || errors.name || errors.email || errors.password || !values.email || !values.password || !values.role || !values.name) {
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
                                number: '',
                                about: '',
                                president: ''
                            }}
                            validationSchema={Yup.object().shape({
                                // name: Yup.string().max(255).required('Името е задължително'),
                                // email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
                                // password: Yup.string().max(255).required('Паролата е задължителна'),
                                // role: Yup.string().required('Ролята е задължителна')
                            })}
                            onSubmit={(values) => {
                                const data = { date, ...values };
                                console.log(data)
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
                                        value={values.name}
                                        variant="outlined"
                                    />
                                    <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            label="Дата"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue)
                                            }}                                      
                                            renderInput={(params) => 
                                                <TextField 
                                                    margin="normal" 
                                                    onBlur={handleBlur} 
                                                    fullWidth
                                                    {...params} 
                                                />
                                            }
                                        />
                                    </LocalizationProvider>
                                    {/* <FormControl
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
                                    </FormControl> */}
                                    <Box sx={{ py: 2 }}>
                                        <Button
                                            color="primary"
                                            // disabled={disableCreateButton(isSubmitting, errors, values)}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            Генерираре
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
