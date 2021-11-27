import './ProtocolListItem.scss';
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
    IconButton
} from '@material-ui/core';
import {
    Print as PrintIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

const ProtocolListItem = ({ protocol, openProp, selectedCustomerProp, ...rest }) => {
    const openModal = (id) => {
        openProp.setOpen(true);
        selectedCustomerProp.setSelectedCustomer(id);
    }

    return (
        <TableRow
            hover
            className="ProtocolListItem"
        >
            <TableCell>
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
                <IconButton className="trash-icon-wrapper" onClick={e => openModal(protocol.id)}>
                    <DeleteIcon className="trash-icon"/>
                </IconButton>
                <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to="/app/users/edit" state={{ protocol: protocol }}>
                    <EditIcon className="edit-icon"/>
                </IconButton>
                <IconButton className="print-icon-wrapper" color="success">
                    <PrintIcon className="print-icon"/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default ProtocolListItem;