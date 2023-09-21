import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProtocolMpsAddForm from 'src/components/add-protocol-mps/ProtocolMpsAddForm';
import ProtocolMpsAddToolbar from 'src/components/add-protocol-mps/ProtocolMpsAddToolbar';

const ProtocolMpsAdd = () => (
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
        <ProtocolMpsAddToolbar />
        <Box sx={{ pt: 3 }}>
          <ProtocolMpsAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProtocolMpsAdd;
