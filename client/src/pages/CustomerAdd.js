import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerAddForm from '../components/add-customer/CustomerAddForm';
import CustomerAddToolbar from '../components/add-customer/CustomerAddToolbar';

const CustomerAdd = () => (
  <>
    <Helmet>
      <title>Добави потребител</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerAddToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerAdd;
