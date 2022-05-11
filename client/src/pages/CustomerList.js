import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import userServices from '../services/user';

const CustomerList = () => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [total, setToal] = useState(0);
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        let mounted = true;
        getCustomers();

        return () => mounted = false;
    }, [name, email, role, page, limit]);

    const getCustomers = () => {
        userServices.getAll({ name, email, role, page: page + 1, limit })
            .then(data => {
                setCustomers(data.data);
                setToal(data.total)
                setLoader(false);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }

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
                    <CustomerListToolbar setName={setName} setEmail={setEmail} setRole={setRole} />
                    <Box sx={{ pt: 3 }}>
                        <CustomerListResults
                            customers={customers}
                            setCustomers={setCustomers}
                            page={page}
                            setPage={page}
                            limit={limit}
                            setLimit={limit}
                            total={total}
                            loader={loader}

                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default CustomerList;
