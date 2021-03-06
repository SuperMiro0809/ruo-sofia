import { useState } from 'react';
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
import TeacherCertificateListItem from './TeachersCertificateListItem';

const TeacherCertificateListResult = ({teachers, loader, page, setPage, limit, setLimit, total}) => {
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
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
                Удостоверения
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
                    Удостоверения
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loader ?
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="3"><CircularProgress size="30px" /></TableCell>
                  </TableRow>
                  :
                  <>
                    {teachers.length !== 0 ?
                      <>
                        {teachers.map((teacher) => (
                          <TeacherCertificateListItem key={`${teacher.id}_${new Date().getMilliseconds()}`} teacher={teacher} />
                        ))}
                      </>
                      :
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="3">Няма записи</TableCell>
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

export default TeacherCertificateListResult;
