import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Checkbox,
    TableCell,
    TableRow,
    Typography,
} from '@material-ui/core';
import {
    faTrash as TrashIcon
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
            key={customer.id}
            //selected={selectedCustomerIds.indexOf(customer.id) !== -1}
        >
            {/* <TableCell padding="checkbox">
          <Checkbox
            checked={selectedCustomerIds.indexOf(customer.id) !== -1}
            onChange={(event) => handleSelectOne(event, customer.id)}
            value="true"
          />
        </TableCell> */}
            <TableCell>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    {/* <Avatar
              src={customer.avatarUrl}
              sx={{ mr: 2 }}
            >
              {getInitials(customer.name)}
            </Avatar> */}
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {customer.name}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell>
                {customer.email}
            </TableCell>
            <TableCell>
                {roles[customer.role]}
            </TableCell>
            <TableCell >
                <FontAwesomeIcon icon={TrashIcon} style={{ color: '#f44336', width: '22px', height: '22px', cursor: 'pointer' }} onClick={e => openModal(customer.id)} />
            </TableCell>
        </TableRow>
    );
}

export default CustomerListItem;