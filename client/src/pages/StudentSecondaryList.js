import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentsSecondaryListResult from '../components/students-secondary/StudentsSecondaryListResult';
import StudentsSecondaryToolbar from '../components/students-secondary/StudentsSecondaryToolbar';

const StudentSecondaryList = () => {
    const [searchName, setSearchName] = useState(null);
    const [searchEgn, setSearchEgn] = useState(null);

    return (
        <>
            <Helmet>
                <title>Ученици - Средно</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <StudentsSecondaryToolbar setSearchName={setSearchName} setSearchEgn={setSearchEgn}/>
                    <Box sx={{ pt: 3 }}>
                        <StudentsSecondaryListResult searchName={searchName} searchEgn={searchEgn}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default StudentSecondaryList;