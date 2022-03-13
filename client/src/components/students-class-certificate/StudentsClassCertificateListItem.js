import * as React from 'react';
import './StudentsClassCertificateListItem.scss';
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
    RemoveRedEyeSharp as PreviewIcon,
    Close as CloseIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import StudentsClassCertificateInnerTableItem from './StudentsClassCertificateInnerTableItem';

const StudentsClassCertificateListItem = ({ student, ...rest }) => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow
                hover
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
                    {student.cityAndCountry}
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
            <TableRow className="StudentsClassCertificateListItem">
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                Удостоверения
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Регистрационен номер</TableCell>
                                        <TableCell>Дата на издаване</TableCell>
                                        <TableCell>Номер на документ</TableCell>
                                        <TableCell>От дата</TableCell>
                                        <TableCell>Входящ номер</TableCell>
                                        <TableCell>Клас</TableCell>
                                        <TableCell>Признава</TableCell>
                                        <TableCell>Операции</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {student.application.length != 0 ?
                                        <>
                                            {student.application.map((application, index) => (
                                                <StudentsClassCertificateInnerTableItem
                                                    application={application}
                                                    key={index}
                                                />
                                            ))}
                                        </>
                                        :
                                        <TableRow>
                                            <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="8">Няма записи</TableCell>
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

export default StudentsClassCertificateListItem;