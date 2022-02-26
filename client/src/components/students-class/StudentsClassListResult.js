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
import StudentsClassListItem from './StudentsClassListItem';
import studentClassServices from '../../services/student-class';
import StudentsClassModal from '../students-class-modal/StudentsClassModal';

const TeacherListResults = ({ searchName, searchEgn }, ...props) => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(true);
    const [students, setStudents] = useState([]);
    let [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(0);

    let openProp = { open, setOpen };
    let selectedStudentProp = { selectedStudent: selectedStudent, setSelectedStudent }
    let studentsDataProp = {students, setStudents};

    useEffect(() => {
        if (!open) {
            setLoader(true);
        }
        getStudents();
    }, [searchName, searchEgn])

    const getStudents = () => {
        if(searchName || searchEgn) {
            setPage(0);
        }

        studentClassServices.getAll(searchName, searchEgn)
            .then(data => {
                console.log(data);
                setStudents(data);
                setLoader(false);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...props}>
            <StudentsClassModal openProp={openProp} selectedStudentProp={selectedStudentProp} studentsDataProp={studentsDataProp} />
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
                                Ученици - Клас
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
                                        Заявления
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
                                                {students.slice(page * limit, page * limit + limit).map((student) => (
                                                    <StudentsClassListItem key={student.id} student={student} openProp={openProp} selectedStudentProp={selectedStudentProp} />
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
                count={students.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

export default TeacherListResults;
