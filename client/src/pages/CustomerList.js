import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Modal, Typography } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import CustomerModal from '../components/customer-modal/CustomerModal';

const CustomerList = () => {
  return (
    <>
      <Helmet>
        <title>Потребители</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            <CustomerListResults/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CustomerList;
