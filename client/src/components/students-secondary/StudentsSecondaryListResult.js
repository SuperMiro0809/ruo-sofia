import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    TableContainer,
    CircularProgress
} from '@material-ui/core';
import studentSecondaryServices from '../../services/student-secondary';
import StudentsSecondaryListItem from './StudentsSecondaryListItem';
import StudentsSecondaryModal from '../students-secondary-modal/StudentsSecondaryModal';

const StudentsSecondaryListResults = ({ 
    students,
    page,
    setPage,
    limit,
    setLimit,
    total,
    loader,
    getStudents
}) => {
    let [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(0);
    let openProp = { open, setOpen };
    let selectedStudentProp = { selectedStudent: selectedStudent, setSelectedStudent }

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card>
            <StudentsSecondaryModal
                openProp={openProp}
                selectedStudentProp={selectedStudentProp}
                getStudents={getStudents}
            />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <TableContainer>
                        <Box sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                            mt: 3,
                            mb: 1
                        }}>
                            <Typography
                                color="textPrimary"
                                variant="h3"
                            >
                                Ученици - Средно
                            </Typography>
                        </Box>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Име
                                    </TableCell>
                                    <TableCell>
                                        ЕГН
                                    </TableCell>
                                    <TableCell>
                                        Дата на раждане
                                    </TableCell>
                                    <TableCell>
                                        Училище/ Институция
                                    </TableCell>
                                    <TableCell>
                                        Гражданство
                                    </TableCell>
                                    <TableCell>
                                        Град/ Държава
                                    </TableCell>
                                    <TableCell>
                                        Заявлениe
                                    </TableCell>
                                    <TableCell>
                                        Операции
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loader ?
                                    <TableRow>
                                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="8"><CircularProgress size="30px" /></TableCell>
                                    </TableRow>
                                    :
                                    <>
                                        {students.length !== 0 ?
                                            <>
                                                {students.map((student) => (
                                                    <StudentsSecondaryListItem key={`${student.id}_${new Date().getSeconds()}`} student={student} openProp={openProp} selectedStudentProp={selectedStudentProp} />
                                                ))}
                                            </>
                                            :
                                            <TableRow>
                                                <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="8">Няма записи</TableCell>
                                            </TableRow>
                                        }
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={total}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

export default StudentsSecondaryListResults;
