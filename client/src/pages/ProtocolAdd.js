import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProtocolAddForm from '../components/add-protocol/ProtocolAddForm';
import ProtocolAddToolbar from '../components/add-protocol/ProtocolAddToolbar';

const ProtocolAdd = () => (
  <>
    <Helmet>
      <title>Генерирай протокол</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ProtocolAddToolbar />
        <Box sx={{ pt: 3 }}>
          <ProtocolAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProtocolAdd;
