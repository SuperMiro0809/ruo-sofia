import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import StudentSecondaryEditForm from '../components/edit-student-secondary/StudentSecondaryEditForm';
import StudentSecondaryEditToolbar from '../components/edit-student-secondary/StudentSecondaryEditToolbar';

const StudentSecondaryEdit = () => {
    const location = useLocation();
    const { student } = location.state;

    return (
        <>
            <Helmet>
                <title>Редактирай ученик - средно</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <StudentSecondaryEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <StudentSecondaryEditForm student={student}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default StudentSecondaryEdit;
