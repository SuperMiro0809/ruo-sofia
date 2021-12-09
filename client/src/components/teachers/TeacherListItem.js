import * as React from 'react';
import './TeacherListItem.scss'
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
    TableBody
} from '@material-ui/core';
import {
    Print as PrintIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';

const TeacherListItem = ({ teacher, openProp, selectedProtocolProp, ...rest }) => {
    const [open, setOpen] = useState(false);
    const openModal = (id) => {
        openProp.setOpen(true);
        selectedProtocolProp.setSelectedProtocol(id);
    }

    return (
        <React.Fragment>
            <TableRow
                hover
                className="ProtocolListItem"
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {teacher.egn}
                </TableCell>
                <TableCell>
                    {`${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`}
                </TableCell>
                <TableCell>
                    <IconButton className="trash-icon-wrapper" onClick={e => openModal(teacher.id)}>
                        <DeleteIcon className="trash-icon" />
                    </IconButton>
                    <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to="/app/users/edit" state={{ teacher: teacher }}>
                        <EditIcon className="edit-icon" />
                    </IconButton>
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
                                    {teacher.application.length != 0 ?
                                        <>
                                            {teacher.application.map((application) => (
                                                <TableRow key={application.id}>
                                                    <TableCell component="th" scope="row">
                                                        № {application.number}
                                                    </TableCell>
                                                    <TableCell>
                                                        № {application.ruoNumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        {`${application.firstName} ${application.middleName} ${application.lastName}`}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.approve}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.notApprove}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                        :
                                        <TableRow>
                                            <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="5">Няма записи</TableCell>
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

export default TeacherListItem;