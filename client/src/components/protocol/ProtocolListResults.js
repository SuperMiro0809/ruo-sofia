import { useState, useEffect } from 'react';
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
  CircularProgress
} from '@material-ui/core';
import ProtocolListItem from './ProtocolListItem';
import protocolServices from '../../services/protocol';
import ProtocolModal from '../protocol-modal/ProtocolModal';

const ProtocolListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [protocols, setProtocols] = useState([]);
  const [loader, setLoader] = useState(true);
  let [open, setOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(0);

  let openProp = { open, setOpen };
  let selectedProtocolProp = { selectedProtocol, setSelectedProtocol }

  useEffect(() => {
    getProtocols();
  }, [open])

  const getProtocols = () => {
    protocolServices.getAll()
      .then(data => {
        console.log(data);
        setProtocols(data);
        setLoader(false);
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
    <Card {...rest}>
      <ProtocolModal openProp={openProp} selectedProtocolProp={selectedProtocolProp} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
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
                  {protocols.length !== 0 ?
                    <>
                      {protocols.slice(0, limit).map((protocol) => (
                        <ProtocolListItem key={protocol.id} protocol={protocol} openProp={openProp} selectedProtocolProp={selectedProtocolProp}/>
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
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
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
