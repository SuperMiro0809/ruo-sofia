import React, { useState } from 'react';
import './MpsCertificateListItem.scss';
import { Link as RouterLink } from 'react-router-dom';
import {
    TableCell,
    TableRow,
    IconButton
} from '@material-ui/core';
import {
    Print as PrintIcon
} from '@material-ui/icons';
import ReactToPrint from 'react-to-print';
import MpsCertificatePDF from './MpsCertificatePDF/MpsCertificatePDF';

const MpsCertificateListItem = ({ item }) => {
    const print = React.useRef();

    return (
        <>
            <TableRow
                hover
                className="MpsCertificateListItem"
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    {item.name}
                </TableCell>
                <TableCell>
                    {item.egn}
                </TableCell>
                <TableCell className="column-options">
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
                    <MpsCertificatePDF mps={item} ref={print} />
                </td>
            </TableRow>
        </>
    );
}

export default MpsCertificateListItem;