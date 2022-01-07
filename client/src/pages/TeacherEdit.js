import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import TeacherEditForm from '../components/edit-teacher/TeacherEditForm';
import TeacherEditToolbar from '../components/edit-teacher/TeacherEditToolbar';

const TeacherEdit = () => {
    const location = useLocation();
    const { teacher } = location.state;

    return (
        <>
            <Helmet>
                <title>Добави учител</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <TeacherEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <TeacherEditForm teacher={teacher}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default TeacherEdit;
