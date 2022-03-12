import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProtocolClassAddForm from '../components/add-protocol-class/ProtocolClassAddForm';
import ProtocolClassAddToolbar from '../components/add-protocol-class/ProtocolClassAddToolbar';

const ProtocolClassAdd = () => (
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
        <ProtocolClassAddToolbar />
        <Box sx={{ pt: 3 }}>
          <ProtocolClassAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProtocolClassAdd;
