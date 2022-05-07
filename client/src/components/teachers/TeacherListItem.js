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

const TeacherListItem = ({ teacher, openProp, selectedTeacherProp, ...rest }) => {
    const [open, setOpen] = useState(false);
    const openModal = (id) => {
        openProp.setOpen(true);
        selectedTeacherProp.setSelectedTeacher(id);
    }

    return (
        <React.Fragment>
            <TableRow
                hover
                className="TeacherListItem"
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    {`${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`}
                </TableCell>
                <TableCell>
                    {moment(teacher.dateOfBirth).format('DD/MM/YYYY')}
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
                    <IconButton className="trash-icon-wrapper" onClick={e => openModal(teacher.id)}>
                        <DeleteIcon className="trash-icon" />
                    </IconButton>
                    <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to={`/app/teachers/edit/${teacher.id}`} >
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
                                        <TableCell>Входящ номер</TableCell>
                                        <TableCell>Дата</TableCell>
                                        <TableCell>Aдрес</TableCell>
                                        <TableCell>Телефон</TableCell>
                                        <TableCell>Месторабота</TableCell>
                                        <TableCell>Образование</TableCell>
                                        <TableCell>Диплома</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teacher.application.length != 0 ?
                                        <>
                                            {teacher.application.map((application) => (
                                                <TableRow key={application.id}>
                                                    <TableCell>
                                                        № {application.ruoNumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(application.date).format('DD/MM/YYYY')}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {application.adress}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.tel}
                                                    </TableCell>
                                                    <TableCell>
                                                        {`${application.workplace.place}, гр. ${application.workplace.city}, обл. ${application.workplace.area}, на длъжност ${application.workplace.position}`}
                                                    </TableCell>
                                                    <TableCell>
                                                        {`Завършил(а) ${application.education.school}, гр. ${application.education.city}, ${application.education.qualification}, ${application.education.degree}`}
                                                    </TableCell>
                                                    <TableCell>
                                                        {`№ ${application.diploma.number}, от ${application.diploma.from}`}
                                                    </TableCell>
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

export default TeacherListItem;