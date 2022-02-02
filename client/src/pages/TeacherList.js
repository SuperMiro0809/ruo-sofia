import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeacherListResults from '../components/teachers/TeacherListResults';
import TeacherListToolbar from '../components/teachers/TeacherListToolbar';
import teacherServices from '../services/teacher';

const TeacherList = () => {
    const [search, setSearch] = useState(null);

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
                    <TeacherListToolbar setSearch={setSearch}/>
                    <Box sx={{ pt: 3 }}>
                        <TeacherListResults search={search} />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default TeacherList;