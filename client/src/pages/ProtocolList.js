import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Modal, Typography } from '@material-ui/core';
import ProtocolListResults from '../components/protocol/ProtocolListResults';
import ProtocolListToolbar from '../components/protocol/ProtocolListToolbar';
import customers from '../__mocks__/customers';

const ProtocolList = () => {
  const [number, setNumber] = useState();

  return (
    <>
      <Helmet>
        <title>Протоколи</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProtocolListToolbar setNumber={setNumber}/>
          <Box sx={{ pt: 3 }}>
            <ProtocolListResults number={number}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProtocolList;
