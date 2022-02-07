import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import ProtocolTextEditorResult from '../components/protocol-text-editor/ProtocolTextEditorResult';
import ProtocolTextEditorToolbar from '../components/protocol-text-editor/ProtocolTextEditorToolbar';

const ProtocolTextEditor = () => {
    const location = useLocation();
    const { content } = location.state;

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
                    <ProtocolTextEditorToolbar />
                    <Box sx={{ pt: 3 }}>
                        <ProtocolTextEditorResult content={content}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default ProtocolTextEditor;
