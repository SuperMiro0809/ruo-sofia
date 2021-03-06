import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import * as Yup from 'yup';
import { Formik } from 'formik';
import userServices from '../../services/user';
import MessageContext from '../../contexts/MessageContext';
import AccountProfileDetailsForm from './AccountProfileDetailsForm';
import AccountProfilePasswordForm from './AccountProfilePasswordForm';

const AccountProfileDetails = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const [mode, setMode] = useState('edit');
    const [initialValues, setInitialValues] = useState({
        name: user.name,
        email: user.email,
        role: user.role
    });
    const messageContext = useContext(MessageContext);

    const disableButton = (isSubmitting, errors, values) => {
        for (let key in values) {
            if (!values[key]) {
                return true;
            }
        }

        for (let key in errors) {
            if (errors[key]) {
                return true;
            }
        }

        if (isSubmitting) {
            return true;
        }

        return false;
    }

    const changeMode = () => {
        if (mode === 'edit') {
            setMode('password');
            setInitialValues({
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            });
        } else {
            setMode('edit');
            setInitialValues({
                name: user.name,
                email: user.email,
                role: user.role
            });
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape(
                mode === 'edit' ?
                    {
                        name: Yup.string().max(255).required('?????????? ?? ????????????????????????'),
                        email: Yup.string().email('?????????????? ???? ?? ??????????????').max(255).required('?????????????? ?? ????????????????????????'),
                        role: Yup.string().required('???????????? ?? ????????????????????????')
                    } :
                    {
                        oldPassword: Yup.string().max(255).required('?????????????? ???????????????? ?? ????????????????????????'),
                        newPassword: Yup.string().max(255).required('???????????? ???????????????? ?? ????????????????????????').when('oldPassword', (oldPassword, schema) => {
                            if (oldPassword) {
                                return schema.test({
                                    test: newPassword => newPassword !== oldPassword,
                                    message: '???????????? ???????????? ???????????? ???? ?? ???????????????? ???? ??????????????'
                                })
                            }
                        }),
                        repeatNewPassword: Yup.string().max(255).required('???????????????????? ???????????? ???????????????? ?? ????????????????????????').when('newPassword', (newPassword, schema) => {
                            if (newPassword) {
                                return schema.test({
                                    test: repeatNewPassword => repeatNewPassword === newPassword,
                                    message: '???????????????? ???? ????????????????'
                                })
                            }
                        })
                    }
            )}
            onSubmit={(values, { setSubmitting }) => {
                if (mode === 'edit') {
                    userServices.editUser({ id: user.id, ...values })
                        .then(data => {
                            setUser(data.user);
                            messageContext[1]({ status: 'success', text: '???????????????????????? ?????????????? ???? ??????????????!' })
                            setSubmitting(false);
                            const interval = setInterval(function () {
                                messageContext[1]('');
                                clearInterval(interval);
                            }, 2000)
                        })
                        .catch(err => {
                            if (err.message === 'Unauthorized') {
                                navigate('/login');
                            }
                        })
                } else {
                    userServices.changePassword({ id: user.id, ...values })
                        .then(data => {
                            setUser({});
                            localStorage.removeItem('token');
                            navigate('/login', { replace: true });
                            messageContext[1]({ status: 'success', text: '???????????????? ???????????????? ???? ??????????????!' })
                            setSubmitting(false);
                            const interval = setInterval(function () {
                                messageContext[1]('');
                                clearInterval(interval);
                            }, 2000)
                        })
                        .catch(err => {
                            if (err.message === 'Unauthorized') {
                                navigate('/login');
                            }else {
                                messageContext[1]({ status: 'error', text: err.message })
                                setSubmitting(false);
                                const interval = setInterval(function () {
                                    messageContext[1]('');
                                    clearInterval(interval);
                                }, 2000)
                            }
                        })
                }
            }}
            enableReinitialize
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
                <form
                    autoComplete="off"
                    noValidate
                    {...props}
                    onSubmit={handleSubmit}
                >
                    <Card>
                        <CardHeader
                            subheader="???????????????????????? ???????? ???? ???????? ??????????????????????"
                            title="????????????"
                        />
                        <Divider />
                        <CardContent>
                            {mode === 'edit' ?
                                <AccountProfileDetailsForm
                                    props={{
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        isSubmitting,
                                        touched,
                                        values
                                    }}
                                /> :
                                <AccountProfilePasswordForm
                                    props={{
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        isSubmitting,
                                        touched,
                                        values
                                    }}
                                />
                            }
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 2
                            }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                onClick={changeMode}
                            >
                                {mode === 'edit' ? '?????????? ???? ????????????' : '?????????????????????? ???? ????????????'}
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={disableButton(isSubmitting, errors, values)}
                                size="large"
                                type="submit"
                            >
                                ??????????????????
                            </Button>
                        </Box>
                    </Card>
                </form>
            )}
        </Formik>
    );
};

export default AccountProfileDetails;
