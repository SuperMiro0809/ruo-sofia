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
import ProtocolListItem from './ProtocolListItem';
import protocolServices from '../../services/protocol';
import ProtocolModal from '../protocol-modal/ProtocolModal';

const ProtocolListResults = ({number, startDate, endDate}, ...props) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [protocols, setProtocols] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(true);
  let [open, setOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(0);

  let openProp = { open, setOpen };
  let selectedProtocolProp = { selectedProtocol, setSelectedProtocol };
  let protocolsDataProp = { protocols, setProtocols };

  useEffect(() => {
    let mounted = true;
    if(!open) {
      setLoader(true);
    }
    getProtocols();

    return () => mounted = false;
  }, [number, startDate, endDate, page, limit])

  const getProtocols = () => {
    if(number || startDate || endDate) {
      setPage(0);
    }
    protocolServices.getAll({number, startDate, endDate, page: page + 1, limit})
      .then(data => {
        setProtocols(data.data);
        setTotal(data.total);
        setLoader(false);
      })
      .catch(err => {
        if(err.message === 'Unauthorized') {
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
    <Card {...props}>
      <ProtocolModal openProp={openProp} selectedProtocolProp={selectedProtocolProp} protocolsDataProp={protocolsDataProp} getProtocols={getProtocols}/>
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
                Протоколи
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
                    {protocols.length !== 0 ?
                      <>
                        {protocols.map((protocol) => (
                          <ProtocolListItem key={protocol.id} protocol={protocol} openProp={openProp} selectedProtocolProp={selectedProtocolProp} />
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
};

export default ProtocolListResults;
