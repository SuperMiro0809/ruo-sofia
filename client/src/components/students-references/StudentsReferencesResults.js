import { useState } from 'react';
import './StudentsReferencesResults.scss';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  TablePagination,
  Typography,
  TableContainer,
  ToggleButton,
  ToggleButtonGroup
} from '@material-ui/core';
import CertificatesClassReference from './References/CertificatesClass/CertificatesClassReference';
import CertificatesSecondaryReferene from './References/CertificatesSecondary/CertificatesSecondaryReference';
import CertificatesAllReference from './References/CertificatesAll/CertificatesAllReference';

const StudentsReferencesResults = ({ loader, data, mode, setMode, page, setPage }, ...props) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);

  const modes = {
    applications: 'Заявления',
    certificatesClass: 'Удостоверения - Клас',
    certificatesSecondary: 'Удостоверения - Средно',
    certificatesAll: 'Обща справка за удостоверения'
  }

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
          if(newMode) {
            setMode(newMode);
          }
        }}
        className="toggle-button-wrapper"
      >
        {/* <ToggleButton value="applications" className="toggle-button">Заявления</ToggleButton> */}
        <ToggleButton value="certificatesClass" className="toggle-button">Удостоверения - Клас</ToggleButton>
        <ToggleButton value="certificatesSecondary" className="toggle-button">Удостоверения - Средно</ToggleButton>
        <ToggleButton value="certificatesAll" className="toggle-button">Обща справка за удостоверения</ToggleButton>
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
              {mode === 'certificatesClass' ?
                <CertificatesClassReference loader={loader} certificates={data} page={page} limit={limit} /> :
                mode === 'certificatesSecondary' ?
                  <CertificatesSecondaryReferene loader={loader} certificates={data} page={page} limit={limit} /> :
                  <CertificatesAllReference loader={loader} certificates={data} page={page} limit={limit} />
              }
            </TableContainer>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={data.length}
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

export default StudentsReferencesResults;
