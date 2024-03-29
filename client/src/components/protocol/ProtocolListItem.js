import React, { useState, useEffect } from 'react';
import './ProtocolListItem.scss';
import ReactDOMServer from 'react-dom/server';
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
import ProtocolPDF from '../protocol-pdf/ProtocolPDF';
import ReactToPrint from 'react-to-print';
import generate from '../protocol-word/generate-protocol-word';


const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: '297mm'
};

const ProtocolListItem = ({ protocol, openProp, selectedProtocolProp, ...rest }) => {
    const print = React.useRef();
    const [open, setOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [textEditorContent, setTextEditorContent] = useState('');
    const [openTextEditor, setOpenTextEditor] = useState(false);

    useEffect(() => {
        setTextEditorContent(ReactDOMServer.renderToString(<ProtocolPDF protocol={protocol} formText={formText} />))
    }, [])

    const openModal = (id) => {
        openProp.setOpen(true);
        selectedProtocolProp.setSelectedProtocol(id);
    }

    const formText = (application, mode) => {
        const textArr = [];

        for (let th of application.teaching) {
            if (th[mode]) {
                textArr.push(th[mode]);
            }
        }

        for (let rp of application.report) {
            if (rp[mode]) {
                textArr.push(rp[mode]);
            }
        }

        for (let publ of application.publication) {
            if (publ[mode]) {
                textArr.push(publ[mode]);
            }
        }

        return textArr.join(" ");
    }

    return (
        <React.Fragment>
            <tr style={{ display: 'none' }}>
                <td>
                    <ProtocolPDF protocol={protocol} formText={formText} ref={print} style={{ display: 'none' }} />
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
                    <ProtocolPDF protocol={protocol} formText={formText} />
                </Box>
            </Modal>
            {/* <Modal
                open={openTextEditor}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="PreviewModal Modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2" pb='15px'>
                        <CloseIcon className="close-icon" onClick={() => setOpenTextEditor(false)} />
                    </Typography>
                    <ProtocolTextEditorResult content={textEditorContent} setContent={setTextEditorContent}/>
                </Box>
            </Modal> */}
            <TableRow
                hover
                className="ProtocolListItem"
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell style={{ textAlign: 'left' }}>
                    № {protocol.number}
                </TableCell>
                <TableCell>
                    {moment(protocol.date).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                    {protocol.about}
                </TableCell>
                <TableCell>
                    {protocol.president}
                </TableCell>
                <TableCell>
                    {JSON.parse(protocol.members).join(', ')}
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
                    <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to={`/app/protocols/edit/${protocol.id}`}>
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
                    <IconButton className="word-icon-wrapper" onClick={e => generate(protocol, formText)}>
                        <FontAwesomeIcon icon={WordFileIcon} className="word-icon" />
                    </IconButton>
                    {/* <IconButton className="text-edit-icon-wrapper" component={RouterLink} to="/app/protocols/text-editor" state={{ content: textEditorContent }}>
                        <FontAwesomeIcon icon={TextEditorIcon} className="text-edit-icon" />
                    </IconButton> */}
                    {/* <IconButton className="text-edit-icon-wrapper" onClick={() => setOpenTextEditor(true)}>
                        <FontAwesomeIcon icon={TextEditorIcon} className="text-edit-icon" />
                    </IconButton> */}
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
                                        <TableCell>Номер</TableCell>
                                        <TableCell>Входящ номер в РУО</TableCell>
                                        <TableCell>Име</TableCell>
                                        <TableCell>Предложение за признаване</TableCell>
                                        <TableCell>Отказ за признаване</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {protocol.application.map((application, index) => {
                                        const approve = formText(application, "approve");
                                        const notApprove = formText(application, "notApprove");

                                        return (
                                            <TableRow key={application.id}>
                                                <TableCell component="th" scope="row">
                                                    № {index + 1}
                                                </TableCell>
                                                <TableCell data-testid="ruoNumber">
                                                    № {application.ruoNumber}
                                                </TableCell>
                                                <TableCell>
                                                    {`${application.teacher.firstName} ${application.teacher.middleName} ${application.teacher.lastName}`}
                                                </TableCell>
                                                <TableCell>
                                                    {approve ? approve : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {notApprove ? notApprove : '-'}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default ProtocolListItem;