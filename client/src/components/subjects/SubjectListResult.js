import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Typography,
    TextField,
    Button,
    Container,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    CircularProgress
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, FieldArray, getIn } from 'formik';
import subjectServices from '../../services/subjects';
import MessageContext from '../../contexts/MessageContext';
import SubjectListItem from './SubjectListItem';
import AddSubjectModal from '../subject-modals/AddSubjectModal';
import DeleteSubjectModal from '../subject-modals/DeleteSubjectModal';
import EditSubjectModal from '../subject-modals/EditSubjectModal';

const SubjectsListResult = ({openSubjectModalProp, search, ...rest }) => {
    const navigate = useNavigate();
    const messageContext = useContext(MessageContext);
    const [subjects, setSubjects] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const openDeleteModalProp = { openDeleteModal, setOpenDeleteModal };
    const openEditModalProp = { openEditModal, setOpenEditModal };
    const selectedSubjectProp = { selectedSubject, setSelectedSubject };

    useEffect(() => {
        loadSubjects();
    }, [search]);

    const loadSubjects = () => {
        setLoader(true);
        if(search) {
            setPage(0);
        }
        subjectServices.getAll(search)
            .then(data => {
                setSubjects(data);
                setLoader(false);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...rest}>
            <AddSubjectModal openSubjectModalProp={openSubjectModalProp} loadSubjects={loadSubjects} />
            <DeleteSubjectModal openDeleteModalProp={openDeleteModalProp} selectedSubjectProp={selectedSubjectProp} loadSubjects={loadSubjects} />
            <EditSubjectModal openEditModalProp={openEditModalProp} selectedSubjectProp={selectedSubjectProp} loadSubjects={loadSubjects} />
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
                                Предмети
                            </Typography>
                        </Box>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Име
                                    </TableCell>
                                    <TableCell>
                                        Операции
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loader ?
                                    <TableRow>
                                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="2"><CircularProgress size="30px" /></TableCell>
                                    </TableRow>
                                    :
                                    <>
                                        {subjects.length !== 0 ?
                                            <>
                                                {subjects.slice(page * limit, page * limit + limit).map((subject, index) => (
                                                    <SubjectListItem key={index} subject={subject} openDeleteModalProp={openDeleteModalProp} selectedSubjectProp={selectedSubjectProp} openEditModalProp={openEditModalProp} />
                                                ))}
                                            </>
                                            :
                                            <TableRow>
                                                <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="2">Няма записи</TableCell>
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
                count={subjects.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

export default SubjectsListResult;