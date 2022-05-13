import * as React from 'react';
import './StudentsSecondaryCertificateListItem.scss';
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
    Button,
    Modal
} from '@material-ui/core';
import {
    Print as PrintIcon,
    RemoveRedEyeSharp as PreviewIcon,
    Close as CloseIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import ReactToPrint from 'react-to-print';
import StudentSecondaryCertificatePDF from './StudentSecondaryCertificatePDF/StudentSecondaryCertificatePDF';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: 'auto'
};

const StudentsSecondaryCertificateListItem = ({ student }) => {
    const [open, setOpen] = useState(false);
    const print = React.useRef();

    return (
        <React.Fragment>
            <tr style={{ display: 'none' }}>
                <td>
                    <StudentSecondaryCertificatePDF application={student} ref={print} style={{ display: 'none' }} />
                </td>

            </tr>
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
                        Виж удостоверениe
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow className="StudentsSecondaryCertificateListItem">
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                Удостоверениe
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Регистрационен номер</TableCell>
                                        <TableCell>Дата на издаване</TableCell>
                                        <TableCell>Номер на документ</TableCell>
                                        <TableCell>От дата</TableCell>
                                        <TableCell>Входящ номер</TableCell>
                                        <TableCell>Признава</TableCell>
                                        <TableCell>Операции</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {student.registerNumber}
                                        </TableCell>
                                        <TableCell>
                                            {moment(student.dateOut).format('DD.MM.YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {student.documentNumber}
                                        </TableCell>
                                        <TableCell>
                                            {moment(student.documentDate).format('DD.MM.YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {`${student.inNumber}/ ${moment(student.inDate).format('DD.MM.YYYY')}`}
                                        </TableCell>
                                        <TableCell>
                                            {student.admits}
                                        </TableCell>
                                        <TableCell>
                                            <ReactToPrint
                                                content={() => print.current}
                                                trigger={() => (
                                                    <IconButton className="print-icon-wrapper">
                                                        <PrintIcon className="print-icon" />
                                                    </IconButton>
                                                )}
                                            />
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

export default StudentsSecondaryCertificateListItem;