import './ProtocolAddForm.scss';
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
    Fab,
    Divider,
    ListItemButton,
    ListItemText,
    Collapse
} from '@material-ui/core';
import {
    DatePicker,
    LocalizationProvider
} from '@material-ui/lab';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    ExpandLess,
    ExpandMore,
    OpenInBrowser
} from '@material-ui/icons';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import * as Yup from 'yup';
import { Formik, FieldArray, getIn } from 'formik';
import MеssageContext from '../../contexts/MessageContext';

const ProtocolAddForm = ({ rest }) => {
    const messageContext = useContext(MеssageContext);
    const navigate = useNavigate();
    const [date, setDate] = useState(null);
    const [openArr, setOpenArr] = useState([0]);

    const applicationSchema = {
        number: '',
        ruoNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        approve: '',
        notApprove: ''
    }

    const open = (index) => {
        if (openArr.includes(index)) {
            let i = openArr.indexOf(index);
            let arr = [];
            for (let j = 0; j < openArr.length; j++) {
                if (j != i) {
                    arr.push(openArr[j]);
                }
            }
            setOpenArr(arr);
        } else {
            let arr = [index, ...openArr];
            setOpenArr(arr);
        }
    };

    const disableCreateButton = (isSubmitting, errors, values) => {
        for (let key in values) {
            if (!values[key]) {
                return true;
            }
        }

        for (let i = 0; i < values.members.length; i++) {
            if(!values.members[i]) {
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
            // for (let i = 0; i < values.applications.length; i++) {
            //     for (let key in values.applications[i]) {
            //         if (errors.applications[i][key]) {
            //             return true;
            //         }
            //     }
            // }
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
                                        number: '',
                                        ruoNumber: '',
                                        firstName: '',
                                        middleName: '',
                                        lastName: '',
                                        approve: '',
                                        notApprove: ''
                                    }
                                ],
                                // 'application-0': {
                                //     number: '',
                                //     ruoNumber: '',
                                //     firstName: '',
                                //     middleName: '',
                                //     lastName: '',
                                //     approve: '',
                                //     notApprove: ''
                                // }
                            }}
                            validationSchema={Yup.object().shape({
                                number: Yup.number().required('Номерът е задължителен').typeError('Трябва да въведете число'),
                                about: Yup.string().required('Относно е задължително'),
                                president: Yup.string().required('Председателят е задължителен'),
                                members: Yup.array().of(Yup.string().required('Членът е задължителен')),
                                applications: Yup.array().of(Yup.object().shape({
                                    number: Yup.number().required('Номерът е задължителен').typeError('Трябва да въведете число'),
                                    ruoNumber: Yup.number().required('Входящият номер в РУО е задължителен').typeError('Трябва да въведете число'),
                                    firstName: Yup.string().required('Името е задължително'),
                                    middleName: Yup.string().required('Презимето е задължително'),
                                    lastName: Yup.string().required('Фамилията е задължителна'),
                                }))
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                if(!values) {
                                    console.log('Error');
                                    setSubmitting(false);
                                }else {
                                    const data = { date, ...values };
                                    console.log(data)
                                }
                            }}
                            validateOnBlur={true}
                            validateOnChange={false}
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
                                                    <div key={index}>
                                                        <Box className="expand-wrapper">
                                                            <ListItemButton className="expand-button" sx={{ ml: 2, mb: !openArr.includes(index) ? 2 : 0 }} onClick={() => open(index)}>
                                                                {!openArr.includes(index) ? <ExpandLess /> : <ExpandMore />}
                                                                <ListItemText primary="Заявление" />
                                                            </ListItemButton>
                                                            <Box className="expand-options" sx={{ mb: !openArr.includes(index) ? 2 : 0 }}>
                                                                <Fab onClick={() => arrayHelpers.push(applicationSchema)} size="small" color="primary" aria-label="add">
                                                                    <AddIcon />
                                                                </Fab>
                                                                <Fab onClick={() => arrayHelpers.remove(index)} disabled={values.applications.length == 1} sx={{ ml: 1 }} size="small" color="primary" aria-label="remove">
                                                                    <RemoveIcon />
                                                                </Fab>
                                                            </Box>
                                                        </Box>
                                                        <Collapse in={openArr.includes(index)} timeout="auto" unmountOnExit>
                                                            <Box sx={{ ml: 2 }}>
                                                                {/* <TextField
                                                                    fullWidth
                                                                    label="test"
                                                                    margin="normal"
                                                                    name="['test.test']"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values['test.test']}
                                                                    variant="outlined"
                                                                /> */}
                                                                <TextField
                                                                    error={Boolean(
                                                                        getIn(touched, `applications.${index}.number`) &&
                                                                        getIn(errors, `applications.${index}.number`)
                                                                    )}
                                                                    fullWidth
                                                                    helperText={
                                                                        getIn(touched, `applications.${index}.number`) &&
                                                                        getIn(errors, `applications.${index}.number`)
                                                                    }
                                                                    label="Номер"
                                                                    margin="normal"
                                                                    name={`applications.${index}.number`}
                                                                    //name={`application-${index}.number`}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values.applications[index].number}
                                                                    //value={values[`application-${index}`].number}
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        startAdornment: <InputAdornment position="start">№</InputAdornment>
                                                                    }}
                                                                />
                                                                <TextField
                                                                    error={Boolean(
                                                                        getIn(touched, `applications.${index}.ruoNumber`) &&
                                                                        getIn(errors, `applications.${index}.ruoNumber`)
                                                                    )}
                                                                    fullWidth
                                                                    helperText={
                                                                        getIn(touched, `applications.${index}.ruoNumber`) &&
                                                                        getIn(errors, `applications.${index}.ruoNumber`)
                                                                    }
                                                                    label="Входящ номер в РУО"
                                                                    margin="normal"
                                                                    // name={`application-${index}.ruoNumber`}
                                                                    name={`applications.${index}.ruoNumber`}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values.applications[index].ruoNumber}
                                                                    //value={values[`application-${index}`].ruoNumber}
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        startAdornment: <InputAdornment position="start">№</InputAdornment>
                                                                    }}
                                                                />
                                                                <TextField
                                                                    error={Boolean(
                                                                        getIn(touched, `applications.${index}.firstName`) &&
                                                                        getIn(errors, `applications.${index}.firstName`)
                                                                    )}
                                                                    fullWidth
                                                                    helperText={
                                                                        getIn(touched, `applications.${index}.firstName`) &&
                                                                        getIn(errors, `applications.${index}.firstName`)
                                                                    }
                                                                    label="Име"
                                                                    margin="normal"
                                                                    name={`applications.${index}.firstName`}
                                                                    // name={`application-${index}.firstName`}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values.applications[index].firstName}
                                                                    //value={values[`application-${index}`].firstName}
                                                                    variant="outlined"
                                                                />
                                                                <TextField
                                                                    error={Boolean(
                                                                        getIn(touched, `applications.${index}.middleName`) &&
                                                                        getIn(errors, `applications.${index}.middleName`)
                                                                    )}
                                                                    fullWidth
                                                                    helperText={
                                                                        getIn(touched, `applications.${index}.middleName`) &&
                                                                        getIn(errors, `applications.${index}.middleName`)
                                                                    }
                                                                    label="Презиме"
                                                                    margin="normal"
                                                                    name={`applications.${index}.middleName`}
                                                                    // name={`application-${index}.middleName`}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values.applications[index].middleName}
                                                                    //value={values[`application-${index}`].middleName}
                                                                    variant="outlined"
                                                                />
                                                                <TextField
                                                                    error={Boolean(
                                                                        getIn(touched, `applications.${index}.lastName`) &&
                                                                        getIn(errors, `applications.${index}.lastName`)
                                                                    )}
                                                                    fullWidth
                                                                    helperText={
                                                                        getIn(touched, `applications.${index}.lastName`) &&
                                                                        getIn(errors, `applications.${index}.lastName`)
                                                                    }
                                                                    label="Фамилия"
                                                                    margin="normal"
                                                                    name={`applications.${index}.lastName`}
                                                                    //name={`application-${index}.lastName`}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values.applications[index].lastName}
                                                                    //value={values[`application-${index}`].lastName}
                                                                    variant="outlined"
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    label="Предложение за признаване"
                                                                    margin="normal"
                                                                    name={`applications.${index}.approve`}
                                                                    //name={`application-${index}.approve`}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values.applications[index].approve}
                                                                    //value={values[`application-${index}`].approve}
                                                                    variant="outlined"
                                                                    multiline
                                                                    rows={3}
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    label="Отказ за признаване"
                                                                    margin="normal"
                                                                    name={`applications.${index}.notApprove`}
                                                                    // name={`application-${index}.notApprove`}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type="text"
                                                                    value={values.applications[index].notApprove}
                                                                    //value={values[`application-${index}`].notApprove}
                                                                    variant="outlined"
                                                                    multiline
                                                                    rows={3}
                                                                />
                                                            </Box>
                                                        </Collapse>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    />

                                    <Divider />
                                    <Box sx={{ py: 2 }}>
                                        <Button
                                            color="primary"
                                            disabled={disableCreateButton(isSubmitting, errors, values)}
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
