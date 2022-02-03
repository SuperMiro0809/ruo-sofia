import React, { useState } from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Modal,
    Box,
    Typography
} from '@material-ui/core';
import {
    Print as PrintIcon,
    RemoveRedEyeSharp as PreviewIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import TeacherCertificatePDF from './TeacherCertificatePDF/TeacherCertificatePDF';
import TeacherLetterPDF from './TeacherLetterPDF/TeacherLetterPDF';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: 'auto'
};

const TeacherCertificateInnerTableItem = ({ el, application, teacher, index, mode }) => {
    const [openPreview, setOpenPreview] = useState(false);
    const print = React.useRef();

    return (
        <TableRow key={el.id}>
            <TableCell>
                № {application.ruoNumberOut}
            </TableCell>
            <TableCell>
                {moment(application.dateOut).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell>
                {el.approve ? el.approve : '-'}
            </TableCell>
            <TableCell>
                {el.notApprove ? el.notApprove : '-'}
            </TableCell>
            <TableCell>
                <IconButton className="preview-icon-wrapper" color="primary" onClick={() => setOpenPreview(true)}>
                    <PreviewIcon className="preview-icon" />
                </IconButton>
                <ReactToPrint
                    content={() => print.current}
                    trigger={() => (
                        <IconButton className="print-icon-wrapper">
                            <PrintIcon className="print-icon" />
                        </IconButton>
                    )}
                />
            </TableCell>
            {el.approve ?
                <div style={{ display: 'none' }}>
                    <TeacherCertificatePDF mode={mode} teacher={teacher} application={application} el={el} index={index} ref={print} style={{ display: 'none' }} />
                </div>
                :
                <div style={{ display: 'none' }}>
                    <TeacherLetterPDF teacher={teacher} application={application} el={el} index={index} ref={print} style={{ display: 'none' }} />
                </div>
            }
            <Modal
                open={openPreview}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="PreviewModal Modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2" pb='15px'>
                        <CloseIcon className="close-icon" onClick={() => setOpenPreview(false)} />
                    </Typography>
                    {el.approve ?
                        <TeacherCertificatePDF mode={mode} teacher={teacher} application={application} el={el} index={index} /> :
                        <TeacherLetterPDF teacher={teacher} application={application} el={el} index={index} />
                    }
                </Box>
            </Modal>
        </TableRow>
    );
}

export default TeacherCertificateInnerTableItem;