import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentsClassCertificateListResults from '../components/students-class-certificate/StudentsClassCertificateListResults';
import StudentsClassCertificateListToolbar from '../components/students-class-certificate/StudentsClassCertificateListToolbar';

const StudentClassCertificate = () => {
    const [searchName, setSearchName] = useState(null);
    const [searchEgn, setSearchEgn] = useState(null);

    return (
        <>
            <Helmet>
                <title>Удостоверения - Клас</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <StudentsClassCertificateListToolbar setSearchName={setSearchName} setSearchEgn={setSearchEgn}/>
                    <Box sx={{ pt: 3 }}>
                        <StudentsClassCertificateListResults searchName={searchName} searchEgn={searchEgn}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default StudentClassCertificate;