import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeacherListResults from '../components/teachers/TeacherListResults';
import TeacherListToolbar from '../components/teachers/TeacherListToolbar';

const TeacherList = () => {
    const [search, setSearch] = useState(null);
    const [teachers, setTeachers] = useState([]);

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
                    <TeacherListToolbar setSearch={setSearch} teachers={teachers} />
                    <Box sx={{ pt: 3 }}>
                        <TeacherListResults search={search} teachers={teachers} setTeachers={setTeachers} />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default TeacherList;