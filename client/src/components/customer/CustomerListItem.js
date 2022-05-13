import './CustomerListItem.scss';
import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    faTrash as TrashIcon,
    faPen as EditIcon
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomerListItem = ({ customer, openProp, selectedCustomerProp, ...rest }) => {
    let roles = {
        'Administrator': 'Администратор',
        'Qualifications': 'Квалификации',
        'Education': 'Образование',
        'Member': 'Потребител'
    };

    const openModal = (id) => {
        openProp.setOpen(true);
        selectedCustomerProp.setSelectedCustomer(id);
    }

    return (
        <TableRow
            hover
            className="CustomerListItem"
        >
            <TableCell>
                {customer.name}
            </TableCell>
            <TableCell data-testid="customer-email">
                {customer.email}
            </TableCell>
            <TableCell>
                {roles[customer.role]}
            </TableCell>
            <TableCell>
                <IconButton className="trash-icon-wrapper" color="primary" onClick={e => openModal(customer.id)}>
                    <FontAwesomeIcon className="trash-icon" icon={TrashIcon} />
                </IconButton>
                <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to={`/app/users/edit/${customer.id}`} >
                    <FontAwesomeIcon className="edit-icon" icon={EditIcon} />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default CustomerListItem;