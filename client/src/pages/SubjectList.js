import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SubjectsListResult from '../components/subjects/SubjectListResult';
import SubjectListToolbar from '../components/subjects/SubjectListToolbar';
import subjectServices from '../services/subjects';

const SubjectList = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [total, setTotal] = useState(0);
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [openSubjectModal, setOpenSubjectModal] = useState(false);
    const [search, setSearch] = useState(null);
    const openSubjectModalProp = { openSubjectModal, setOpenSubjectModal };

    useEffect(() => {
        let mounted = true;
        getSubjects();

        return () => mounted = false;
    }, [search, page, limit])

    const getSubjects = () => {
        subjectServices.getAll({search, page: page + 1, limit})
            .then(data => {
                setSubjects(data.data);
                setTotal(data.total);
                setLoader(false);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }

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
                    <SubjectListToolbar openSubjectModalProp={openSubjectModalProp} setSearch={setSearch} setPage={setPage}/>
                    <Box sx={{ pt: 3 }}>
                        <SubjectsListResult
                            openSubjectModalProp={openSubjectModalProp}
                            subjects={subjects}
                            page={page}
                            setPage={setPage}
                            limit={limit}
                            setLimit={setLimit}
                            total={total}
                            loader={loader}
                            getSubjects={getSubjects}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default SubjectList;
