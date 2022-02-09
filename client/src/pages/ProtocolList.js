import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Modal, Typography } from '@material-ui/core';
import ProtocolListResults from '../components/protocol/ProtocolListResults';
import ProtocolListToolbar from '../components/protocol/ProtocolListToolbar';
import customers from '../__mocks__/customers';

const ProtocolList = () => {
  const [number, setNumber] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
          <ProtocolListToolbar setNumber={setNumber} setStartDate={setStartDate} setEndDate={setEndDate}/>
          <Box sx={{ pt: 3 }}>
            <ProtocolListResults number={number} startDate={startDate} endDate={endDate}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProtocolList;
