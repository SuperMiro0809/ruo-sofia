import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProtocolSecondaryAddForm from '../components/add-protocol-secondary/ProtocolSecondaryAddForm';
import ProtocolSecondaryAddToolbar from '../components/add-protocol-secondary/ProtocolSecondaryAddToolbar';

const ProtocolSecondaryAdd = () => (
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
        <ProtocolSecondaryAddToolbar />
        <Box sx={{ pt: 3 }}>
          <ProtocolSecondaryAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProtocolSecondaryAdd;
