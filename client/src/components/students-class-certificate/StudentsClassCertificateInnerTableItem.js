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
import StudentClassCertificatePDF from './StudentClassCertificatePDF/StudentClassCertificatePDF'

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: '500px'
};

const StudentsClassCertificateInnerTableItem = ({ el, application, student, index }) => {
    const print = React.useRef();

    return (
        <TableRow>
            <TableCell>
                {application.registerNumber}
            </TableCell>
            <TableCell>
                {moment(application.dateOut).format('DD.MM.YYYY')}
            </TableCell>
            <TableCell>
                {application.documentNumber}
            </TableCell>
            <TableCell>
                {moment(application.documentDate).format('DD.MM.YYYY')}
            </TableCell>
            <TableCell>
                {`${application.inNumber}/ ${moment(application.inDate).format('DD.MM.YYYY')}`}
            </TableCell>
            <TableCell>
                {application.class}
            </TableCell>
            <TableCell>
                {application.admits}
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
            <td style={{ display: 'none' }}>
                <StudentClassCertificatePDF application={application} student={student} ref={print} />
            </td>
        </TableRow>

    );
}

export default StudentsClassCertificateInnerTableItem;