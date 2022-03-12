import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Modal, Typography } from '@material-ui/core';
import ProtocolClassListResults from '../components/protocols-class/ProtocolClassListResults';
import ProtocolClassListToolbar from '../components/protocols-class/ProtocolClassListToolbar';

const ProtocolClassList = () => {
  const [number, setNumber] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <>
      <Helmet>
        <title>Протоколи - Клас</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProtocolClassListToolbar setNumber={setNumber} setStartDate={setStartDate} setEndDate={setEndDate}/>
          <Box sx={{ pt: 3 }}>
            <ProtocolClassListResults number={number} startDate={startDate} endDate={endDate}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProtocolClassList;
