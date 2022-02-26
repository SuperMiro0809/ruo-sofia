import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Modal,
    Typography,
    Button,
    TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    Close as CloseIcon
} from '@material-ui/icons';
import subjectServices from '../../services/subjects';
import MessageContext from '../../contexts/MessageContext';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: '500px'
};

const EditSubjectModal = ({ openEditModalProp, selectedSubjectProp, loadSubjects, ...rest }) => {
    const navigate = useNavigate();
    const messageContext = useContext(MessageContext);

    const closeModal = () => {
        selectedSubjectProp.setSelectedSubject(0);
        openEditModalProp.setOpenEditModal(false);
    }

    const disableCreateButton = (isSubmitting, errors, values) => {
        if(!values.name) {
            return true;
        }

        if(errors.name) {
            return true;
        }

        if(isSubmitting) {
            return true;
        }

        return false;
    }

    return (
        <Modal
            open={openEditModalProp.openEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="Modal">
                <Typography id="modal-modal-title" variant="h6" component="h2" pb='15px'>
                    <CloseIcon className="close-icon" onClick={closeModal} />
                </Typography>
                <Formik
                    initialValues={{
                        name: selectedSubjectProp.selectedSubject.name
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Предметът е задължителен'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);

                        subjectServices.edit(values, selectedSubjectProp.selectedSubject.id)
                            .then(data => {
                                messageContext[1]({ status: 'success', text: 'Предметът е редактиран успешно' });
                                const interval = setInterval(function () {
                                    messageContext[1]('');
                                    clearInterval(interval);
                                }, 2000)
                                setSubmitting(false);
                                loadSubjects();
                                closeModal();
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
                            <Box>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    Редактирай предмет
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
                            <Box>
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

export default EditSubjectModal;