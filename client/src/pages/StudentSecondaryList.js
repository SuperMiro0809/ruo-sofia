import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentsSecondaryListResult from '../components/students-secondary/StudentsSecondaryListResult';
import StudentsSecondaryToolbar from '../components/students-secondary/StudentsSecondaryToolbar';
import studentSecondaryServices from '../services/student-secondary';

const StudentSecondaryList = () => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(true);
    const [students, setStudents] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchName, setSearchName] = useState(null);
    const [searchEgn, setSearchEgn] = useState(null);

    useEffect(() => {
        let mounted = true;
        getStudents();

        return () => mounted = false;
    }, [searchName, searchEgn, page, limit])

    const getStudents = () => {
        studentSecondaryServices.getAll(searchName, searchEgn, page + 1, limit)
        .then(data => {
            setStudents(data.data);
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
                    <StudentsSecondaryToolbar setSearchName={setSearchName} setSearchEgn={setSearchEgn} setPage={setPage}/>
                    <Box sx={{ pt: 3 }}>
                        <StudentsSecondaryListResult
                            students={students}
                            page={page}
                            setPage={setPage}
                            limit={limit}
                            setLimit={setLimit}
                            total={total}
                            loader={loader}
                            getStudents={getStudents}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default StudentSecondaryList;