import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentsClassListResult from '../components/students-class/StudentsClassListResult';
import StudentsClassListToolbar from '../components/students-class/StudentsClassListToolbar';

const StudentClassList = () => {
    const [searchName, setSearchName] = useState(null);
    const [searchEgn, setSearchEgn] = useState(null);
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
                    <StudentsClassListToolbar setSearchName={setSearchName} setSearchEgn={setSearchEgn}/>
                    <Box sx={{ pt: 3 }}>
                        <StudentsClassListResult searchName={searchName} searchEgn={searchEgn}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default StudentClassList;