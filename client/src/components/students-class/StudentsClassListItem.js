import * as React from 'react';
import './StudentsClassListItem.scss';
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

const StudentsClassListItem = ({ student, openProp, selectedStudentProp, ...rest }) => {
    const [open, setOpen] = useState(false);
    const [gradeModal, setGradeModal] = useState(false);
    const [grades, setGrades] = useState([]);

    const gradeModalOpenProp = { gradeModal, setGradeModal };

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
            <GradeModal grades={grades} gradeModalOpenProp={gradeModalOpenProp}/>
            <TableRow
                hover
                className="StudentsClassListItem"
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
                        ?????? ??????????????????
                    </Button>
                </TableCell>
                <TableCell>
                    <IconButton className="trash-icon-wrapper" onClick={e => openModal(student.id)}>
                        <DeleteIcon className="trash-icon" />
                    </IconButton>
                    {/* <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to="/app/teachers/edit" state={{ teacher: teacher }}>
                        <EditIcon className="edit-icon" />
                    </IconButton> */}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                ??????????????????
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>???????????????????????????? ??????????</TableCell>
                                        <TableCell>???????? ???? ????????????????</TableCell>
                                        <TableCell>?????????? ???? ????????????????</TableCell>
                                        <TableCell>???? ????????</TableCell>
                                        <TableCell>???????????? ??????????</TableCell>
                                        <TableCell>???????? ???? ??????????????????????</TableCell>
                                        <TableCell>????????</TableCell>
                                        <TableCell>????????????????</TableCell>
                                        <TableCell>???????? ???? ?????????????????????????? ????????????</TableCell>
                                        <TableCell>?????????????????????????? ????????????</TableCell>
                                        <TableCell>???????????? ???? ????????????????</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {student.application.length != 0 ?
                                        <>
                                            {student.application.map((application) => (
                                                <TableRow key={`${application.id}_${new Date().getSeconds()}`}>
                                                    <TableCell data-testid="number">
                                                        {application.registerNumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(application.dateOut).format('DD/MM/YYYY')}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.documentNumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(application.documentDate).format('DD/MM/YYYY')}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.inNumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(application.inDate).format('DD/MM/YYYY')}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.class}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.admits}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.equivalenceExamsDate ? moment(application.equivalenceExamsDate).format('DD/MM/YYYY') : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {application.equivalenceExamsDate ?
                                                            <Button
                                                                variant="text"
                                                                onClick={() => openGradeModal(JSON.parse(application.equivalenceExams))}
                                                                className="button-with-icon"
                                                            >
                                                                ?????? ?????????????????????????? ????????????
                                                            </Button>
                                                            : '-'
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="text"
                                                            onClick={() => openGradeModal(JSON.parse(application.grades))}
                                                            className="button-with-icon"
                                                        >
                                                            ?????? ????????????
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                        :
                                        <TableRow>
                                            <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="11">???????? ????????????</TableCell>
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

export default StudentsClassListItem;