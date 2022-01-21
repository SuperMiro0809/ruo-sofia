import * as React from 'react';
import './TeachersCertificateListItem.scss';
import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Avatar,
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
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import ReactToPrint from 'react-to-print';
import TeacherCertificatePDF from './TeacherCertificatePDF';

const TeacherCertificateListItem = ({ teacher, ...rest }) => {
    const print = React.useRef();
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow
                hover
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    {`${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`}
                </TableCell>
                <TableCell>
                    {teacher.egn}
                </TableCell>
                <TableCell>
                    <Button
                        variant="text"
                        onClick={() => setOpen(!open)}
                        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        className="button-with-icon"
                    >
                        Виж удостоверения
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow className="TeacherCertificateListItem">
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                Удостоверения
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Входящ номер</TableCell>
                                        <TableCell>Дата</TableCell>
                                        <TableCell>Предложение за признаване</TableCell>
                                        <TableCell>Отказ за признаване</TableCell>
                                        <TableCell>Операции</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teacher.application.length != 0 ?
                                        <>
                                            {teacher.application.map((application, index) => (
                                                <TableRow key={application.id}>
                                                    <TableCell>
                                                        № {application.ruoNumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(application.date).format('DD/MM/YYYY')}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.approve}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.notApprove ? application.notApprove : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <ReactToPrint
                                                            content={() => print.current}
                                                            trigger={() => (
                                                                <IconButton className="print-icon-wrapper">
                                                                    <PrintIcon className="print-icon" />
                                                                </IconButton>
                                                            )}
                                                        />
                                                    </TableCell>
                                                    <div style={{ display: 'none' }}>
                                                        <TeacherCertificatePDF teacher={teacher} index={index} ref={print} style={{ display: 'none' }} />
                                                    </div>
                                                </TableRow>
                                            ))}
                                        </>
                                        :
                                        <TableRow>
                                            <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="7">Няма записи</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default TeacherCertificateListItem;