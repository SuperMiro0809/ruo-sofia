import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
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

const TeacherListResults = ({}, ...props) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(true);
  const [students, setStudents] = useState([]);
  let [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(0);

  let openProp = { open, setOpen };
  let selectedStudentProp = { selectedStudent: selectedStudent, setSelectedStudent }

  useEffect(() => {
    if(!open) {
      setLoader(true);
    }
    getStudents();
  }, [])

  const getStudents = () => {
    setLoader(false);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...props}>
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
                    Дата на раждане
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
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="4"><CircularProgress size="30px" /></TableCell>
                    </TableRow>
                    :
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="4">Няма записи</TableCell>
                    </TableRow>
                //   <>
                //     {teachers.length !== 0 ?
                //       <>
                //         {teachers.slice(page * limit, page * limit + limit).map((teacher) => (
                //           <TeacherListItem key={teacher.id} teacher={teacher} openProp={openProp} selectedTeacherProp={selectedTeacherProp} />
                //         ))}
                //       </>
                //       :
                //       <TableRow>
                //         <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="4">Няма записи</TableCell>
                //       </TableRow>
                //     }
                //   </>
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
