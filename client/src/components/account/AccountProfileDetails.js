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
                        name: Yup.string().max(255).required('Името е задължително'),
                        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
                        role: Yup.string().required('Ролята е задължителна')
                    } :
                    {
                        oldPassword: Yup.string().max(255).required('Старата паролата е задължителна'),
                        newPassword: Yup.string().max(255).required('Новата паролата е задължителна').when('oldPassword', (oldPassword, schema) => {
                            if (oldPassword) {
                                return schema.test({
                                    test: newPassword => newPassword !== oldPassword,
                                    message: 'Новата парола трябва да е различна от старата'
                                })
                            }
                        }),
                        repeatNewPassword: Yup.string().max(255).required('Повтоерете новата паролата е задължително').when('newPassword', (newPassword, schema) => {
                            if (newPassword) {
                                return schema.test({
                                    test: repeatNewPassword => repeatNewPassword === newPassword,
                                    message: 'Паролите не съвпадат'
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
                            messageContext[1]({ status: 'success', text: 'Редактирахте профила си успешно!' })
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
                            messageContext[1]({ status: 'success', text: 'Сменихте паролата си успешно!' })
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
                            subheader="Информацията може да бъде редактирана"
                            title="Профил"
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
                                {mode === 'edit' ? 'Смяна на парола' : 'Редактиране на профил'}
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={disableButton(isSubmitting, errors, values)}
                                size="large"
                                type="submit"
                            >
                                Запазване
                            </Button>
                        </Box>
                    </Card>
                </form>
            )}
        </Formik>
    );
};

export default AccountProfileDetails;
