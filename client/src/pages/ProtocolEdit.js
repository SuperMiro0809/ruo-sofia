import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import ProtocolEditForm from '../components/edit-protocol/ProtocolEditForm';
import ProtocolEditToolbar from '../components/edit-protocol/ProtocolEditToolbar';
import protocolServices from '../services/protocol';

const ProtocolEdit = () => {
    const { id } = useParams();
    const [protocol, setProtocol] = useState({
        id: '',
        number: '',
        date: null,
        about: '',
        president: '',
        members: [],
        applications: []
    });

    useEffect(() => {
        protocolServices.getById(id)
            .then(data => {
                const applications = [];

                for (let i = 0; i < data.application.length; i++) {
                    let appl = {
                        ruoNumberOut: data.application[i].ruoNumberOut,
                        dateOut: data.application[i].dateOut,
                        teacher: data.application[i].teacher_id,
                        teacher_data: data.application[i].teacher,
                        application: data.application[i].id,
                        teachings: data.application[i].teaching,
                        reports: data.application[i].report,
                        publications: data.application[i].publication
                    }
            
                    applications.push(appl);
                }

                setProtocol({
                    id: data.id,
                    number: data.number,
                    date: data.date,
                    about: data.about,
                    president: data.president,
                    members: JSON.parse(data.members),
                    applications: applications
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
                    <ProtocolEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <ProtocolEditForm protocol={protocol} />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default ProtocolEdit;
