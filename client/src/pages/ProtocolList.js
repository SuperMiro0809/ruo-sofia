import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Modal, Typography } from '@material-ui/core';
import ProtocolListResults from '../components/protocol/ProtocolListResults';
import ProtocolListToolbar from '../components/protocol/ProtocolListToolbar';
import customers from '../__mocks__/customers';

const ProtocolList = () => {
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
          <ProtocolListToolbar />
          <Box sx={{ pt: 3 }}>
            <ProtocolListResults customers={customers}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProtocolList;
