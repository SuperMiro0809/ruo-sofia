import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Modal,
    Typography,
    Button,
    TextField
} from '@material-ui/core';
import { Formik, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import {
    Close as CloseIcon
} from '@material-ui/icons';
import committeServices from '../../services/committe';
import MessageContext from '../../contexts/MessageContext';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: '500px'
};

const CommitteModal = ({ openCommitteModalProp, loadCommitte, committe, ...rest }) => {
    const navigate = useNavigate();
    const messageContext = useContext(MessageContext);

    const closeModal = () => {
        openCommitteModalProp.setOpenCommitteModal(false);
    }

    const disableCreateButton = (isSubmitting, errors, values) => {
        if (!values.president) {
            return true;
        }

        for (let i = 0; i < values.members.length; i++) {
            if (!values.members[i]) {
                return true;
            }
        }

        if (errors['members'] || errors.president) {
            return true;
        }

        if (isSubmitting) {
            return true;
        }

        return false;
    }

    return (
        <Modal
            open={openCommitteModalProp.openCommitteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="Modal">
                <Typography id="modal-modal-title" variant="h6" component="h2" pb='15px'>
                    <CloseIcon className="close-icon" onClick={closeModal} />
                </Typography>
                <Formik
                    initialValues={{
                        president: committe.president,
                        members: committe.members,
                    }}
                    validationSchema={Yup.object().shape({
                        president: Yup.string().required('Председателят е задължителен'),
                        members: Yup.array().of(Yup.string().required('Членът е задължителен')),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        committeServices.create(values)
                            .then(data => {
                                messageContext[1]({ status: 'success', text: 'Комисията е запазена успешно' });
                                const interval = setInterval(function () {
                                    messageContext[1]('');
                                    clearInterval(interval);
                                }, 2000)
                                loadCommitte();
                                closeModal();
                                setSubmitting(false);
                            })
                            .catch(err => {
                                if (err.message === 'Unauthorized') {
                                    navigate('/login');
                                }
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
                                    Комисия
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    Председател
                                </Typography>
                            </Box>
                            <Box sx={{ ml: 2 }}>
                                <TextField
                                    error={Boolean(touched.president && errors.president)}
                                    fullWidth
                                    helperText={touched.president && errors.president}
                                    label="Име"
                                    margin="normal"
                                    name="president"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.president}
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    Членове
                                </Typography>
                            </Box>
                            <Box sx={{ ml: 2 }}>
                                <FieldArray
                                    name="members"
                                    render={arrayHelpers => (
                                        <>
                                            {values.members.map((member, index) => (
                                                <TextField
                                                    error={Boolean(
                                                        getIn(touched, `members.${index}`) &&
                                                        getIn(errors, `members.${index}`)
                                                    )}
                                                    fullWidth
                                                    helperText={
                                                        getIn(touched, `members.${index}`) &&
                                                        getIn(errors, `members.${index}`)
                                                    }
                                                    label="Име"
                                                    margin="normal"
                                                    name={`members.${index}`}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="text"
                                                    value={values.members[index]}
                                                    variant="outlined"
                                                />
                                            ))}
                                        </>
                                    )}
                                >

                                </FieldArray>
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
                                    Запазване
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
}

export default CommitteModal;