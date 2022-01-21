import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeachersCertificateListResult from '../components/teachers-certificate/TeachersCertificateListResult';

const TeacherEdit = () => {
    return (
        <>
            <Helmet>
                <title>Удостоверения - Учител</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Box sx={{ pt: 3 }}>
                        <TeachersCertificateListResult />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default TeacherEdit;
