import React, { useRef, useState, useEffect } from 'react';
import './ProtocolClassListItem.scss';
import ReactDOMServer from 'react-dom/server';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Box,
    Checkbox,
    TableCell,
    TableRow,
    Typography,
    IconButton,
    Collapse,
    Table,
    TableHead,
    TableBody,
    Button,
    Modal
} from '@material-ui/core';
import {
    Close as CloseIcon,
    Print as PrintIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    RemoveRedEyeSharp as PreviewIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileWord as WordFileIcon,
    faEdit as TextEditorIcon
} from '@fortawesome/free-solid-svg-icons';
import ProtocolPDF from '../protocol-pdf/ProtocolPDF';
import ReactToPrint from 'react-to-print';
import ProtocolTextEditorResult from '../protocol-text-editor/ProtocolTextEditorResult';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: '297mm'
};

const ProtocolClassListItem = ({ protocol, openProp, selectedProtocolProp, ...rest }) => {
    const print = React.useRef();
    const [open, setOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);

    const openModal = (id) => {
        openProp.setOpen(true);
        selectedProtocolProp.setSelectedProtocol(id);
    }

    return (
        <React.Fragment>
            {/* <div style={{ display: 'none' }}>
                <ProtocolPDF protocol={protocol} formText={formText} ref={print} style={{ display: 'none' }} />
            </div> */}
            {/* <Modal
                open={openPreview}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="PreviewModal Modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2" pb='15px'>
                        <CloseIcon className="close-icon" onClick={() => setOpenPreview(false)} />
                    </Typography>
                    <ProtocolPDF protocol={protocol} formText={formText} />
                </Box>
            </Modal> */}
            <TableRow
                hover
                className="ProtocolClassListItem"
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell style={{ textAlign: 'left' }}>
                    № {protocol.number}
                </TableCell>
                <TableCell>
                    {moment(protocol.date).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                    <Button
                        variant="text"
                        onClick={() => setOpen(!open)}
                        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        className="button-with-icon"
                    >
                        Виж заявления
                    </Button>
                </TableCell>
                <TableCell className="column-options">
                    <IconButton className="preview-icon-wrapper" color="primary" onClick={() => setOpenPreview(true)}>
                        <PreviewIcon className="preview-icon" />
                    </IconButton>
                    <IconButton className="trash-icon-wrapper" onClick={e => openModal(protocol.id)}>
                        <DeleteIcon className="trash-icon" />
                    </IconButton>
                    <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to="/app/protocols/edit" state={{ protocol: protocol }}>
                        <EditIcon className="edit-icon" />
                    </IconButton>
                    <ReactToPrint
                        content={() => print.current}
                        trigger={() => (
                            <IconButton className="print-icon-wrapper" color="success">
                                <PrintIcon className="print-icon" />
                            </IconButton>
                        )}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                Заявления
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Рег. № на удостоверението</TableCell>
                                        <TableCell>Име, презиме, фамилия</TableCell>
                                        <TableCell>Входящ номер на заявление</TableCell>
                                        <TableCell>Признат завършен клас/срок</TableCell>
                                        <TableCell>Документ за завършен клас/срок, издаден от</TableCell>
                                        <TableCell>Да се положат приравнителни изпити по:</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {protocol.application.map((application, index) => (
                                        <TableRow key={application.id}>
                                            <TableCell component="th" scope="row">
                                                {`${protocol.number} - ${index + 1}`}
                                            </TableCell>
                                            <TableCell>
                                                {application.student.name}
                                            </TableCell>
                                            <TableCell>
                                                {`${application.inNumber}/ ${moment(application.inDate).format('DD/MM/YYYY')} г.`}
                                            </TableCell>
                                            <TableCell>
                                                {application.admits}
                                            </TableCell>
                                            <TableCell>
                                                {`${application.student.school}, ${application.student.cityAndCountry}`}
                                            </TableCell>
                                            <TableCell>
                                                {JSON.parse(application.equivalenceExams).map(e => e.subjectName).join(', ')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default ProtocolClassListItem;