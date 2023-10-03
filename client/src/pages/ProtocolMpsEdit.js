import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'; 
import { Box, Container } from '@material-ui/core';
import ProtocolMpsEditForm from '../components/edit-protocol-mps/ProtocolMpsEditForm';
import ProtocolMpsEditToolbar from '../components/edit-protocol-mps/ProtocolMpsEditToolbar';
import protocolMpsServices from 'src/services/protocol-mps';

const ProtocolMpsEdit = () => {
    const { id } = useParams();
    const [protocol, setProtocol] = useState({ 
        number: '',
        date: '',
        orderNumber: '',
        orderDate: '',
        startDate: '',
        endDate: '', 
        president: '',
        vicePresidents: ['', ''],
        members: ['', '', '', '']
    });

    useEffect(() => {
        protocolMpsServices.getById(id)
            .then(data => {
                console.log(data);
                setProtocol({
                    ...data,
                    vicePresidents: JSON.parse(data.vicePresidents),
                    members: JSON.parse(data.members)
                });
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
                <title>Редактирай протокол</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <ProtocolMpsEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <ProtocolMpsEditForm protocol={protocol}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ProtocolMpsEdit;