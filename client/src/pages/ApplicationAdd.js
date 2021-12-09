import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ApplicationAddForm from '../components/add-application/ApplicationAddForm';
import ApplicationAddToolbar from '../components/add-application/ApplicationAddToolbar';

const CustomerAdd = () => (
  <>
    <Helmet>
      <title>Добави заявление</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ApplicationAddToolbar />
        <Box sx={{ pt: 3 }}>
          <ApplicationAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerAdd;
