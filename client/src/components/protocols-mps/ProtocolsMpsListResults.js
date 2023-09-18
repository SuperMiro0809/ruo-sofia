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
  CircularProgress,
  TableContainer
} from '@material-ui/core';
// import ProtocolClassListItem from './ProtocolClassListItem';
// import ProtocolClassModal from '../protocol-class-modal/ProtocolClassModal';

const ProtocolsMpsListResults = ({
  protocols,
  page,
  setPage,
  limit,
  setLimit,
  total,
  loader,
  getProtocols
}) => {
  let [open, setOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(0);
  let openProp = { open, setOpen };
  let selectedProtocolProp = { selectedProtocol, setSelectedProtocol };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      {/* <ProtocolClassModal openProp={openProp} selectedProtocolProp={selectedProtocolProp} getProtocols={getProtocols} /> */}
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
                Протоколи - МПС
              </Typography>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: 'left' }}>
                    Номер
                </TableCell>
                  <TableCell>
                    Дата
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
                {/* {loader ?
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="4"><CircularProgress size="30px" /></TableCell>
                  </TableRow>
                  :
                  <>
                    {protocols.length !== 0 ?
                      <>
                        {protocols.slice(page * limit, page * limit + limit).map((protocol) => (
                          <ProtocolClassListItem key={`${protocol.id}_${new Date().getSeconds()}`} protocol={protocol} openProp={openProp} selectedProtocolProp={selectedProtocolProp} />
                        ))}
                      </>
                      :
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="4">Няма записи</TableCell>
                      </TableRow>
                    }
                  </>
                } */}
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

export default ProtocolsMpsListResults;
