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
import TeacherListItem from './TeacherListItem';
import TeacherModal from '../teacher-modal/TeacherModal';

const TeacherListResults = ({
  search,
  teachers,
  setTeachers,
  total,
  page,
  setPage,
  limit,setLimit,
  loader,
  openProp,
  getTeachers
}, ...props) => {
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  let selectedTeacherProp = { selectedTeacher: selectedTeacher, setSelectedTeacher }
  let teachersDataProp = { teachers, setTeachers };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...props}>
      <TeacherModal
        openProp={openProp}
        selectedTeacherProp={selectedTeacherProp}
        teachersDataProp={teachersDataProp}
        getTeachers={getTeachers}
        setPage={setPage}
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
                Учители
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
                  <>
                    {teachers.length !== 0 ?
                      <>
                        {teachers.map((teacher) => (
                          <TeacherListItem key={teacher.id} teacher={teacher} openProp={openProp} selectedTeacherProp={selectedTeacherProp} />
                        ))}
                      </>
                      :
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="4">Няма записи</TableCell>
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

export default TeacherListResults;
