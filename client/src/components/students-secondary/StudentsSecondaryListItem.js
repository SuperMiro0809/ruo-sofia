import * as React from 'react';
import './StudentsSecondaryListItem.scss';
import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import {
    Box,
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
import GradeModal from '../students-grade-modal/StudentsGradeModal';

const StudentsSecondaryListItem = ({ student, openProp, selectedStudentProp, ...rest }) => {
    const [open, setOpen] = useState(false);
    const [gradeModal, setGradeModal] = useState(false);
    const [grades, setGrades] = useState([]);

    const gradeModalOpenProp = { gradeModal, setGradeModal };

    const equivalenceExams = JSON.parse(student.equivalenceExams);

    const openModal = (id) => {
        openProp.setOpen(true);
        selectedStudentProp.setSelectedStudent(id);
    }

    const openGradeModal = (grades) => {
        setGrades(grades);
        setGradeModal(true);
    }
    
    return (
        <React.Fragment>
            <GradeModal grades={grades} gradeModalOpenProp={gradeModalOpenProp} />
            <TableRow
                hover
                className="StudentsSecondaryListItem"
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    {student.name}
                </TableCell>
                <TableCell>
                    {student.egn}
                </TableCell>
                <TableCell>
                    {moment(student.dateOfBirth).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                    {student.school}
                </TableCell>
                <TableCell>
                    {student.citizenship}
                </TableCell>
                <TableCell>
                    {student.cityAndCountry}
                </TableCell>
                <TableCell>
                    <Button
                        variant="text"
                        onClick={() => setOpen(!open)}
                        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        className="button-with-icon"
                        data-testid="button"
                    >
                        Виж заявлениe
                    </Button>
                </TableCell>
                <TableCell>
                    <IconButton className="trash-icon-wrapper" onClick={e => openModal(student.id)}>
                        <DeleteIcon className="trash-icon" />
                    </IconButton>
                    <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to={`/app/students-secondary/edit/${student.id}`} >
                        <EditIcon className="edit-icon" />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                Заявлениe
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Регистрационен номер</TableCell>
                                        <TableCell>Дата на издаване</TableCell>
                                        <TableCell>Номер на документ</TableCell>
                                        <TableCell>От дата</TableCell>
                                        <TableCell>Входящ номер</TableCell>
                                        <TableCell>Дата на документите</TableCell>
                                        <TableCell>Признава</TableCell>
                                        {(equivalenceExams && equivalenceExams.length > 0) && <TableCell>Приравнителни изпити</TableCell>}
                                        <TableCell>Оценки по предмети</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={student.id}>
                                        <TableCell data-testid="number">
                                            {student.registerNumber}
                                        </TableCell>
                                        <TableCell>
                                            {moment(student.dateOut).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {student.documentNumber}
                                        </TableCell>
                                        <TableCell>
                                            {moment(student.documentDate).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {student.inNumber}
                                        </TableCell>
                                        <TableCell>
                                            {moment(student.inDate).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {student.admits}
                                        </TableCell>
                                        {(equivalenceExams && equivalenceExams.length > 0) && (
                                            <TableCell>
                                                <Button
                                                    variant="text"
                                                    onClick={() => openGradeModal(equivalenceExams)}
                                                    className="button-with-icon"
                                                >
                                                    Виж приравнителни изпити
                                                </Button>
                                            </TableCell>
                                        )}
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                onClick={() => openGradeModal(JSON.parse(student.grades))}
                                                className="button-with-icon"
                                            >
                                                Виж оценки
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default StudentsSecondaryListItem;