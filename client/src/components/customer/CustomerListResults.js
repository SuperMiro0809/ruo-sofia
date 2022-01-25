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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userServices from '../../services/user';
import CustomerContext from '../../contexts/CustomerContext';
import CustomerListItem from './CustomerListItem';
import CustomerModal from '../customer-modal/CustomerModal';

const CustomerListResults = ({ ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [loader, setLoader] = useState(true);
  let [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(0);

  let openProp = { open, setOpen };
  let selectedCustomerProp = { selectedCustomer, setSelectedCustomer }

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    userServices.getAll()
      .then(data => {
        setCustomers(data);
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
    <CustomerContext.Provider value={[customers, setCustomers]}>
      <Card {...rest}>
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
                          {customers.slice(page * limit, page * limit + limit).map((customer) => (

                            <CustomerListItem key={customer.id} customer={customer} openProp={openProp} selectedCustomerProp={selectedCustomerProp} />

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
          count={customers.length}
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
