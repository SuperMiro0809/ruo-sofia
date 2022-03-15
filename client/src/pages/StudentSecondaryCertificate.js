import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentsSecondaryCertificateListResults from '../components/students-secondary-certificate/StudentsSecondaryCertificateListResults';
import StudentsSecondaryCertificateListToolbar from '../components/students-secondary-certificate/StudentsSecondaryCertificateListToolbar';

const StudentSecondaryCertificate = () => {
    const [searchName, setSearchName] = useState(null);
    const [searchEgn, setSearchEgn] = useState(null);

    return (
        <>
            <Helmet>
                <title>Удостоверения - Средно</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <StudentsSecondaryCertificateListToolbar setSearchName={setSearchName} setSearchEgn={setSearchEgn}/>
                    <Box sx={{ pt: 3 }}>
                        <StudentsSecondaryCertificateListResults searchName={searchName} searchEgn={searchEgn}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default StudentSecondaryCertificate;