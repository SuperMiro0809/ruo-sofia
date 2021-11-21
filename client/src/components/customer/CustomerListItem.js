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
            //selected={selectedCustomerIds.indexOf(customer.id) !== -1}
            className="CustomerListItem"
        >
            {/* <TableCell padding="checkbox">
          <Checkbox
            checked={selectedCustomerIds.indexOf(customer.id) !== -1}
            onChange={(event) => handleSelectOne(event, customer.id)}
            value="true"
          />
        </TableCell> */}
            <TableCell>
                {/* <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Avatar
              src={customer.avatarUrl}
              sx={{ mr: 2 }}
            >
              {getInitials(customer.name)}
            </Avatar>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {customer.name}
                    </Typography>
                </Box> */}
                {customer.name}
            </TableCell>
            <TableCell>
                {customer.email}
            </TableCell>
            <TableCell>
                {roles[customer.role]}
            </TableCell>
            <TableCell>
                {/* <FontAwesomeIcon className="trash-icon" icon={TrashIcon} onClick={e => openModal(customer.id)} /> */}
                {/* <FontAwesomeIcon className="edit-icon" icon={EditIcon} onClick={e => openModal(customer.id)} /> */}
                <IconButton className="trash-icon-wrapper" color="primary" onClick={e => openModal(customer.id)}>
                    <FontAwesomeIcon className="trash-icon" icon={TrashIcon} />
                </IconButton>
                <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to="/app/users/edit" state={{ customer: customer }}>
                    <FontAwesomeIcon className="edit-icon" icon={EditIcon} />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default CustomerListItem;