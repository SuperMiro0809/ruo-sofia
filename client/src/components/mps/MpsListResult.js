import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress,
  TableContainer
} from '@material-ui/core';

const MpsListResult = ({
    mps,
    page,
    setPage,
    limit,
    setLimit,
    total,
    loader,
    getMps
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
        {/* <ProtocolModal openProp={openProp} selectedProtocolProp={selectedProtocolProp} getProtocols={getProtocols}/> */}
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
                  Заявления
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
                      Относно
                  </TableCell>
                    <TableCell>
                      Председател
                  </TableCell>
                    <TableCell>
                      Членове
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
                      <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="7"><CircularProgress size="30px" /></TableCell>
                    </TableRow>
                    :
                    <>
                      {mps.length !== 0 ?
                        <>
                          {mps.map((item) => (
                            // <ProtocolListItem key={`${protocol.id}_${new Date().getSeconds()}`} protocol={protocol} openProp={openProp} selectedProtocolProp={selectedProtocolProp} />
                            <TableRow></TableRow>
                          ))}
                        </>
                        :
                        <TableRow>
                          <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="7">Няма записи</TableCell>
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
}

export default MpsListResult;