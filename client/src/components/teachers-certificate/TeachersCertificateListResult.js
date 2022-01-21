import { useState, useEffect } from 'react';
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
import teacherServices from '../../services/teacher';
import TeacherCertificateListItem from './TeachersCertificateListItem';

const TeacherCertificateListResult = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getTeachers();
  }, [open])

  const getTeachers = () => {
    teacherServices.getAll()
      .then(data => {
        const teacherData = [];

        for(let i = 0; i < data.length; i++) {
          let teacherEl = {
            egn: data[i].egn,
            firstName: data[i].firstName,
            middleName: data[i].middleName,
            lastName: data[i].lastName,
            application: []
          }

          for(let j = 0; j < data[i].application.length; j++) {
            if(data[i].application[j].approve || data[i].application[j].notApprove) {
              data[i].application[j].workplace = JSON.parse(data[i].application[j].workplace);
              data[i].application[j].education = JSON.parse(data[i].application[j].education);
              data[i].application[j].diploma = JSON.parse(data[i].application[j].diploma);
              teacherEl.application.push(data[i].application[j]);
            }
          }

          if(teacherEl.application.length > 0) {
            teacherData.push(teacherEl);
          }
        }

        setTeachers(teacherData);
        setLoader(false);
        console.log(data);
      })
  }

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = customers.map((customer) => customer.id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

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
                    ЕГН
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
                        {teachers.slice(0, limit).map((teacher) => (
                          <TeacherCertificateListItem key={teacher.id} teacher={teacher} />
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
        count={teachers.length}
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
