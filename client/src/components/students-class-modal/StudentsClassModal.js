import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Modal,
    Typography,
    Button
} from '@material-ui/core';
import {
    Close as CloseIcon
} from '@material-ui/icons';
import studentClassServices from '../../services/student-class';
import MessageContext from '../../contexts/MessageContext';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3
};

const StudentsClassModal = ({ openProp, selectedStudentProp, studentsDataProp, ...rest }) => {
    const navigate = useNavigate();
    const messageContext = useContext(MessageContext);

    const deleteStudent = () => {
        studentClassServices.destroy(selectedStudentProp.selectedStudent)
        .then(data => {
            studentsDataProp.setStudents(studentsDataProp.students.filter(s => s.id != selectedStudentProp.selectedStudent));
            closeModal();
            messageContext[1]({ status: 'success', text: 'Ученикът е изтрит успешно!' });
            const interval = setInterval(function () {
                messageContext[1]('');
                clearInterval(interval);
            }, 2000)
        })
        .catch(err => {
            if(err.message === 'Unauthorized') {
                navigate('/login');
            }
        })
    };

    const closeModal = () => {
        selectedStudentProp.setSelectedStudent(0);
        openProp.setOpen(false);
    }

    return (
        <Modal
            open={openProp.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="Modal">
                <Typography id="modal-modal-title" variant="h6" component="h2" pb='15px'>
                    <CloseIcon className="close-icon" onClick={closeModal} />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Сигурни ли сте, че желаете да изтриете този ученик? Ще изтриете и прибавените към него заявления.
                </Typography>
                <Box className="button-wrapper">
                    <Button className="modal-button" onClick={deleteStudent}>Да</Button>
                    <Button className="modal-button" onClick={closeModal}>Не</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default StudentsClassModal;