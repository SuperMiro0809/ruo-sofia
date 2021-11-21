import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import CustomerEditForm from '../components/edit-customer/CustomerEditForm';
import CustomerEditToolbar from '../components/edit-customer/CustomerEditToolbar';

const CustomerEdit = (props) => {
  const location = useLocation();
  const { customer } = location.state;

  return (
    <>
      <Helmet>
        <title>Редактирай потребител</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerEditToolbar />
          <Box sx={{ pt: 3 }}>
            <CustomerEditForm customer={customer}/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CustomerEdit;
