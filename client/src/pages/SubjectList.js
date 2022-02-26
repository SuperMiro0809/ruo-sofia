import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SubjectsListResult from '../components/subjects/SubjectsListResult';
import SubjectListToolbar from '../components/subjects/SubjectListToolbar';

const SubjectList = () => {
    const [openSubjectModal, setOpenSubjectModal] = useState(false);
    const openSubjectModalProp = { openSubjectModal, setOpenSubjectModal };

    return (
        <>
            <Helmet>
                <title>Предмети</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <SubjectListToolbar openSubjectModalProp={openSubjectModalProp} />
                    <Box sx={{ pt: 3 }}>
                        <SubjectsListResult openSubjectModalProp={openSubjectModalProp} />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default SubjectList;
