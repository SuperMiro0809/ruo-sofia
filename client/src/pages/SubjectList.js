import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SubjectsListResult from '../components/subjects/SubjectListResult';
import SubjectListToolbar from '../components/subjects/SubjectListToolbar';

const SubjectList = () => {
    const [openSubjectModal, setOpenSubjectModal] = useState(false);
    const [search, setSearch] = useState(null);
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
                    <SubjectListToolbar openSubjectModalProp={openSubjectModalProp} setSearch={setSearch}/>
                    <Box sx={{ pt: 3 }}>
                        <SubjectsListResult openSubjectModalProp={openSubjectModalProp} search={search}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default SubjectList;
