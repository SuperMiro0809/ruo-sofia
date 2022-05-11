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
import CustomerContext from '../../contexts/CustomerContext';
import CustomerListItem from './CustomerListItem';
import CustomerModal from '../customer-modal/CustomerModal';

const CustomerListResults = ({
  customers,
  setCustomers,
  page,
  setPage,
  limit,
  setLimit,
  total,
  loader
}) => {
  let [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  let openProp = { open, setOpen };
  let selectedCustomerProp = { selectedCustomer, setSelectedCustomer }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <CustomerContext.Provider value={[customers, setCustomers]}>
      <Card>
        <CustomerModal openProp={openProp} selectedCustomerProp={selectedCustomerProp} />
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
                  Потребители
              </Typography>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Име
                </TableCell>
                    <TableCell>
                      Имейл
                </TableCell>
                    <TableCell>
                      Роля
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
                      {customers.length !== 0 ?
                        <>
                          {customers.map((customer) => (

                            <CustomerListItem key={`${customer.id}_${new Date().getSeconds}`} customer={customer} openProp={openProp} selectedCustomerProp={selectedCustomerProp} />

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
    </CustomerContext.Provider>
  );
};

export default CustomerListResults;
