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

const ProtocolAddForm = ({ rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const scrollTo = useRef(null);
    const [date, setDate] = useState(null);

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
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Container maxWidth="1050">
                        <Formik
                            initialValues={{
                                number: '',
                                about: '',
                                president: '',
                                members: [''],
                                applications: [
                                    {
                                        egn: '',
                                        teacherId: '',
                                        approve: '',
                                        notApprove: ''
                                    }
                                ],
                            }}
                            validationSchema={Yup.object().shape({
                                // number: Yup.number().required('Номерът е задължителен').typeError('Трябва да въведете число'),
                                // about: Yup.string().required('Относно е задължително'),
                                // president: Yup.string().required('Председателят е задължителен'),
                                // members: Yup.array().of(Yup.string().required('Членът е задължителен')),
                                // applications: Yup.array().of(Yup.object().shape({

                                // }))
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                if (!values) {
                                    console.log('Error');
                                    setSubmitting(false);
                                } else {
                                    const formatedDate = moment(date).format('YYYY/MM/DD');
                                    const data = { date: formatedDate, ...values };
                                    console.log(data);
                                    // protocolServices.create(data)
                                    //     .then(r => {
                                    //         messageContext[1]({ status: 'success', text: 'Протоколът е генериран успешно!' });
                                    //         navigate('/app/protocols', { replace: true });
                                    //         const interval = setInterval(function () {
                                    //             messageContext[1]('');
                                    //             clearInterval(interval);
                                    //         }, 2000)
                                    //     })
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
                                        value={values.name}
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
                                            <MenuItem value={"pOne"}>Президент 1</MenuItem>
                                            <MenuItem value={"pTwo"}>Президент 2</MenuItem>
                                            <MenuItem value={"pThree"}>Президент 3</MenuItem>
                                            <MenuItem value={"pFour"}>Президент 4</MenuItem>
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
                                                                <MenuItem value={"mOne"}>Член 1</MenuItem>
                                                                <MenuItem value={"mTwo"}>Член 2</MenuItem>
                                                                <MenuItem value={"mThree"}>Член 3</MenuItem>
                                                                <MenuItem value={"mFour"}>Член 4</MenuItem>
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
                                            //disabled={disableCreateButton(isSubmitting, errors, values)}
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