import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import CustomerEditForm from '../components/edit-customer/CustomerEditForm';
import CustomerEditToolbar from '../components/edit-customer/CustomerEditToolbar';
import userServices from '../services/user';

const CustomerEdit = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    id: '',
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    userServices.getById(id)
      .then(data => {
        setCustomer({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role
        })
      })
      .catch(err => {
        if (err.message === 'Unauthorized') {
          navigate('/login');
        }
      })
  }, []);

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
            <CustomerEditForm customer={customer} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CustomerEdit;
