import './CustomerModal.scss';
import { useContext } from 'react';
import {
    Box,
    Modal,
    Typography,
    Button
} from '@material-ui/core';
import {
    Close as CloseIcon
} from '@material-ui/icons';
import userServices from '../../services/user';
import CustomerContext from '../../contexts/CustomerContext';
import MessageContext from '../../contexts/MessageContext';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3
};

const CustomerModal = ({ openProp, selectedCustomerProp, ...rest }) => {
    const customerContext = useContext(CustomerContext);
    const messageContext = useContext(MessageContext);

    const deleteCustomer = () => {
        userServices.destroy(selectedCustomerProp.selectedCustomer)
        .then(data => {
          closeModal();
          messageContext[1]({ status: 'success', text: data.text })
          customerContext[1](data.users);
          const interval = setInterval(function () {
            messageContext[1]('');
            clearInterval(interval);
          }, 2000)
        })
    }

    const closeModal = () => {
        selectedCustomerProp.setSelectedCustomer(0);
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
                    Сигурни ли сте, че желаете да изтриете този потребител?
                </Typography>
                <Box className="button-wrapper">
                    <Button onClick={closeModal}>Не</Button>
                    <Button onClick={deleteCustomer}>Да</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default CustomerModal;