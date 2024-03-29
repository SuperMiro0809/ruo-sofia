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
import mpsService from 'src/services/mps';
import MessageContext from '../../contexts/MessageContext';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3
};

const MpsModal = ({ openProp, selectedMpsProp, getMps }, ...rest) => {
    const navigate = useNavigate();
    const messageContext = useContext(MessageContext);

    const deleteCustomer = () => {
        mpsService.destroy(selectedMpsProp.selectedMps)
            .then(data => {
                getMps();
                closeModal();
                messageContext[1]({ status: 'success', text: 'Заявлението е изтрито успешно!' })
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
    }

    const closeModal = () => {
        selectedMpsProp.setSelectedMps(0);
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
                    Сигурни ли сте, че желаете да изтриете това заявление?
                </Typography>
                <Box className="button-wrapper">
                    <Button className="modal-button" onClick={deleteCustomer}>Да</Button>
                    <Button className="modal-button" onClick={closeModal}>Не</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default MpsModal;