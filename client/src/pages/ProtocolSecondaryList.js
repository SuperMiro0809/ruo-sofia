import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Modal, Typography } from '@material-ui/core';
import ProtocolSecondaryListResults from '../components/protocols-secondary/ProtocolSecondaryListResults';
import ProtocolSecondaryListToolbar from '../components/protocols-secondary/ProtocolSecondaryListToolbar';

const ProtocolSecondaryList = () => {
  const [number, setNumber] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <>
      <Helmet>
        <title>Протоколи - Средно</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProtocolSecondaryListToolbar setNumber={setNumber} setStartDate={setStartDate} setEndDate={setEndDate}/>
          <Box sx={{ pt: 3 }}>
            <ProtocolSecondaryListResults number={number} startDate={startDate} endDate={endDate}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProtocolSecondaryList;
