import React from 'react';
import {
    TableRow,
    TableCell,
    IconButton
} from '@material-ui/core';
import {
    Print as PrintIcon
} from '@material-ui/icons';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import TeacherCertificatePDF from './TeacherCertificatePDF/TeacherCertificatePDF';
import TeacherLetterPDF from './TeacherLetterPDF/TeacherLetterPDF';

const TeacherCertificateInnerTableItem = ({ el, application, teacher, index }) => {
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
                    <TeacherCertificatePDF teacher={teacher} application={application} el={el} index={index} ref={print} style={{ display: 'none' }} />
                </div>
                :
                <div style={{ display: 'none' }}>
                    <TeacherLetterPDF teacher={teacher} application={application} el={el} index={index} ref={print} style={{ display: 'none' }} />
                </div>
            }
        </TableRow>
    );
}

export default TeacherCertificateInnerTableItem;