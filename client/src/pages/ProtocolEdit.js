import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import ProtocolEditForm from '../components/edit-protocol/ProtocolEditForm';
import ProtocolEditToolbar from '../components/edit-protocol/ProtocolEditToolbar';

const ProtocolEdit = () => {
    const location = useLocation();
    const { protocol } = location.state;

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
                        <ProtocolEditForm protocol={protocol}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
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
                        <ProtocolEditForm />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default ProtocolEdit;
