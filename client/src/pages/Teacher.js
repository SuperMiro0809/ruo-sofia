import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeacherListResults from '../components/teacher/TeacherListResults';
import TeacherListToolbar from '../components/teacher/TeacherListToolbar';
import customers from '../__mocks__/customers';

const TeacherList = () => {
    return (
        <>
            <Helmet>
                <title>Учители</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <TeacherListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <TeacherListResults customers={customers} />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default TeacherList;