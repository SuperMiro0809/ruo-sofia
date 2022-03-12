import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'; 
import { Box, Container } from '@material-ui/core';
import ProtocolSecondaryEditForm from '../components/edit-protocol-secondary/ProtocolSecondaryEditForm';
import ProtocolSecondaryEditToolbar from '../components/edit-protocol-secondary/ProtocolSecondaryEditToolbar';
import protocolSecondaryServices from '../services/protocol-secondary';

const ProtocolSecondaryEdit = () => {
    const { id } = useParams();
    const [protocol, setProtocol] = useState({ 
        number: '',
        date: '',
        orderNumber: '',
        orderDate: '',
        startDate: '',
        endDate: '', 
    });

    useEffect(() => {
        protocolSecondaryServices.getById(id)
            .then(data => {
                setProtocol(data);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }, [])

    return (
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
                    <ProtocolSecondaryEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <ProtocolSecondaryEditForm protocol={protocol}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ProtocolSecondaryEdit;
