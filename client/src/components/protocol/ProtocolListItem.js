import React, { useRef } from 'react';
import './ProtocolListItem.scss';
import { useState, useEffect, useContext } from 'react';
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
    Button
} from '@material-ui/core';
import {
    Print as PrintIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import ProtocolPDF from '../protocol-pdf/ProtocolPDF';
import ReactToPrint from 'react-to-print';

const ProtocolListItem = ({ protocol, openProp, selectedProtocolProp, ...rest }) => {
    const print = React.useRef();
    const [open, setOpen] = useState(false);
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
            <div style={{ display: 'none' }}>
                <ProtocolPDF protocol={protocol} formText={formText} ref={print} style={{ display: 'none' }} />
            </div>
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
                    >
                        Виж заявления
                    </Button>
                </TableCell>
                <TableCell>
                    <IconButton className="trash-icon-wrapper" onClick={e => openModal(protocol.id)}>
                        <DeleteIcon className="trash-icon" />
                    </IconButton>
                    <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to="/app/users/edit" state={{ protocol: protocol }}>
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
                                                <TableCell>
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