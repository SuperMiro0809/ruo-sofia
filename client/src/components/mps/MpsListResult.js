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
import MpsListItem from './MpsListItem';
import MpsModal from '../mps-modal/MpsModal';

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
    const [selectedMps, setSelectedMps] = useState(0);
    let openProp = { open, setOpen };
    let selectedMpsProp = { selectedMps, setSelectedMps };
  
    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    return (
      <Card>
        <MpsModal openProp={openProp} selectedMpsProp={selectedMpsProp} getMps={getMps}/>
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
                      Три имена
                  </TableCell>
                    <TableCell>
                      ЕГН
                  </TableCell>
                  <TableCell>
                      Информация
                  </TableCell>
                  <TableCell>
                      Операции
                  </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loader ?
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="6"><CircularProgress size="30px" /></TableCell>
                    </TableRow>
                    :
                    <>
                      {mps.length !== 0 ?
                        <>
                          {mps.map((item) => (
                            <MpsListItem
                                key={`${item.id}_${new Date().getSeconds()}`}
                                item={item}
                                openProp={openProp}
                                selectedMpsProp={selectedMpsProp}
                            />
                          ))}
                        </>
                        :
                        <TableRow>
                          <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="6">Няма записи</TableCell>
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