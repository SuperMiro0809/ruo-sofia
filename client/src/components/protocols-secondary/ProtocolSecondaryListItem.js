import React, { useState } from 'react';
import './ProtocolSecondaryListItem.scss';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import {
    Box,
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
} from '@fortawesome/free-solid-svg-icons';
import ProtocolSecondaryPDF from '../protocol-secondary-pdf/ProtocolSecondaryPDF';
import ReactToPrint from 'react-to-print';
import generate from '../protocol-secondary-word/generate-protocol-secondary-word';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: '297mm'
};

const ProtocolSecondaryListItem = ({ protocol, openProp, selectedProtocolProp, ...rest }) => {
    const print = React.useRef();
    const [open, setOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);

    const openModal = (id) => {
        openProp.setOpen(true);
        selectedProtocolProp.setSelectedProtocol(id);
    }

    return (
        <React.Fragment>
            <tr style={{ display: 'none' }}>
                <td>
                    <ProtocolSecondaryPDF protocol={protocol} ref={print} style={{ display: 'none' }} />
                </td>
            </tr>
            <Modal
                open={openPreview}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="PreviewModal Modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2" pb='15px'>
                        <CloseIcon className="close-icon" onClick={() => setOpenPreview(false)} />
                    </Typography>
                    <ProtocolSecondaryPDF protocol={protocol} />
                </Box>
            </Modal>
            <TableRow
                hover
                className="ProtocolSecondaryListItem"
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
                        data-testid="button"
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
                    <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to={`/app/protocols/students-secondary/edit/${protocol.id}`}>
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
                    <IconButton className="word-icon-wrapper" onClick={e => generate(protocol)}>
                        <FontAwesomeIcon icon={WordFileIcon} className="word-icon" />
                    </IconButton>
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
                                        <TableCell>Удостоверение №</TableCell>
                                        <TableCell>Име, презиме, фамилия</TableCell>
                                        <TableCell>Входящ номер на заявление</TableCell>
                                        <TableCell>Признава завършено:</TableCell>
                                        <TableCell>Документ, издаден от:</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {protocol.application.map((application, index) => (
                                        <TableRow key={`${application.id}_${new Date().getSeconds()}`}>
                                            <TableCell component="th" scope="row" data-testid="number">
                                                {`${protocol.number} - ${application.protocol_order}`}
                                            </TableCell>
                                            <TableCell>
                                                {application.name}
                                            </TableCell>
                                            <TableCell>
                                                {`${application.inNumber}/ ${moment(application.inDate).format('DD.MM.YYYY')} г.`}
                                            </TableCell>
                                            <TableCell>
                                                {application.admits}
                                            </TableCell>
                                            <TableCell>
                                                {`${application.school}, ${application.cityAndCountry}`}
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

export default ProtocolSecondaryListItem;