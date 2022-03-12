import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'; 
import { Box, Container } from '@material-ui/core';
import ProtocolClassEditForm from '../components/edit-protocol-class/ProtocolClassEditForm';
import ProtocolClassEditToolbar from '../components/edit-protocol-class/ProtocolClassEditToolbar';
import protocolClassServices from '../services/protocolClass';

const ProtocolClassEdit = () => {
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
        protocolClassServices.getById(id)
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
                    <ProtocolClassEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <ProtocolClassEditForm protocol={protocol}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ProtocolClassEdit;
