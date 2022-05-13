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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileWord as WordFileIcon
} from '@fortawesome/free-solid-svg-icons';
import TeacherCertificatePDF from './TeacherCertificatePDF/TeacherCertificatePDF';
import TeacherLetterPDF from './TeacherLetterPDF/TeacherLetterPDF';
import generate from '../teacher-certificate-word/generate-teacher-certificte-word';
import generateLetter from '../teacher-certificate-word/generate-teacher-letter-word';

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
        <TableRow>
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
            <TableCell sx={{ display: 'flex' }}>
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
                {el.approve ?
                    <IconButton className="word-icon-wrapper" onClick={e => generate(teacher, application, el, mode)}>
                        <FontAwesomeIcon icon={WordFileIcon} className="word-icon" />
                    </IconButton>
                    :
                    <IconButton className="word-icon-wrapper" onClick={e => generateLetter(teacher, application, el)}>
                        <FontAwesomeIcon icon={WordFileIcon} className="word-icon" />
                    </IconButton>
                }
            </TableCell>
            {el.approve ?
                <td style={{ display: 'none' }}>
                    <TeacherCertificatePDF mode={mode} teacher={teacher} application={application} el={el} index={index} ref={print} style={{ display: 'none' }} />
                </td>
                :
                <td style={{ display: 'none' }}>
                    <TeacherLetterPDF teacher={teacher} application={application} el={el} index={index} ref={print} style={{ display: 'none' }} />
                </td>
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