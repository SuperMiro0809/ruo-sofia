import * as React from 'react';
import './TeachersCertificateListItem.scss';
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
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import TeacherCertificateInnerTableItem from './TeacherCertificateInnerTableItem';

const TeacherCertificateListItem = ({ teacher, ...rest }) => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow
                hover
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
                        Виж удостоверения
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow className="TeacherCertificateListItem">
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                Удостоверения
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Изходящ номер</TableCell>
                                        <TableCell>Изходяща дата</TableCell>
                                        <TableCell>Предложение за признаване</TableCell>
                                        <TableCell>Отказ за признаване</TableCell>
                                        <TableCell>Операции</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teacher.application.length != 0 ?
                                        <>
                                            {teacher.application.map((application, index) => (
                                                <React.Fragment key={`${application.id}_${new Date().getSeconds()}`}>
                                                    {application.teaching.map((teaching, tIndex) => (
                                                        <TeacherCertificateInnerTableItem
                                                            key={`t_${teaching.id}_${new Date().getMilliseconds()}`}
                                                            mode="teaching"
                                                            el={teaching}
                                                            application={application}
                                                            teacher={teacher}
                                                            index={index}
                                                       />
                                                    ))}
                                                    {application.report.map((report, rIndex) => (
                                                       <TeacherCertificateInnerTableItem
                                                            key={`r_${report.id}_${new Date().getMilliseconds()}`}
                                                            mode="report"
                                                            el={report}
                                                            application={application}
                                                            teacher={teacher}
                                                            index={index}
                                                       />
                                                    ))}
                                                    {application.publication.map((publication, pIndex) => (
                                                       <TeacherCertificateInnerTableItem
                                                            key={`p_${publication.id}_${new Date().getMilliseconds()}`}
                                                            mode="publication"
                                                            el={publication}
                                                            application={application}
                                                            teacher={teacher}
                                                            index={index}
                                                       />
                                                    ))}
                                                </React.Fragment>
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

export default TeacherCertificateListItem;