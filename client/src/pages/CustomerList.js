import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';

const CustomerList = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);

    return (
        <>
            <Helmet>
                <title>Потребители</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <CustomerListToolbar setName={setName} setEmail={setEmail} setRole={setRole}/>
                    <Box sx={{ pt: 3 }}>
                        <CustomerListResults name={name} email={email} role={role}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default CustomerList;
