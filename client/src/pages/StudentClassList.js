import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentsClassListResult from '../components/students-class/StudentsClassListResult';
import StudentsClassListToolbar from '../components/students-class/StudentsClassListToolbar';

const StudentClassList = () => {
    return (
        <>
            <Helmet>
                <title>Ученици - Клас</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <StudentsClassListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <StudentsClassListResult />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default StudentClassList;