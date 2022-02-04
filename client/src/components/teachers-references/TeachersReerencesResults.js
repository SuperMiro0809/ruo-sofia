import { useState, useEffect } from 'react';
import './TeachersReferencesResults.scss';
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
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup
} from '@material-ui/core';
import teacherServices from '../../services/teacher';
import ProtocolsReference from './References/Protocols/ProtocolsReference';
import CertificatesReferene from './References/Certificates/CertificatesReference';

const TeachersReferencesResults = ({ loader, teachers, setTeachers, mode, setMode }, ...props) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const modes = {
    protocols: 'Протоколи',
    certificates: 'Удостоверения'
  }


  // useEffect(() => {
  //   setLoader(true);
  //   getTeachers();
  // }, [open, search])

  // const getTeachers = () => {
  //   teacherServices.getAll(search)
  //     .then(data => {
  //       data.forEach(el => {
  //         el.application.forEach(appl => {
  //           appl.workplace = JSON.parse(appl.workplace);
  //           appl.education = JSON.parse(appl.education);
  //           appl.diploma = JSON.parse(appl.diploma);
  //         })
  //       })

  //       setTeachers(data);
  //       setLoader(false);
  //       console.log(data);
  //     })
  //     .catch(err => {
  //       if (err.message === 'Unauthorized') {
  //         navigate('/login');
  //       }
  //     })
  // }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={mode}
        exclusive
        onChange={(event, newMode) => {
          setMode(newMode)
        }}
        className="toggle-button-wrapper"
      >
        <ToggleButton value="protocols" className="toggle-button">Протоколи</ToggleButton>
        <ToggleButton value="certificates" className="toggle-button">Удостоверения</ToggleButton>
      </ToggleButtonGroup>
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
                  {modes[mode]}
              </Typography>
              </Box>
              {mode === 'protocols' ?
                <ProtocolsReference loader={loader} protocols={teachers} page={page} limit={limit}/> :
                <CertificatesReferene loader={loader} certificates={teachers} page={page} limit={limit}/>
              }
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
    </>
  );
};

export default TeachersReferencesResults;
