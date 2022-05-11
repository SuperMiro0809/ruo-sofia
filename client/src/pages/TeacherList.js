import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeacherListResults from '../components/teachers/TeacherListResults';
import TeacherListToolbar from '../components/teachers/TeacherListToolbar';
import teacherServices from '../services/teacher';

const TeacherList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        let mounted = true;
        getTeachers();
    
        return () => mounted = false;
    }, [search, page, limit])

    const getTeachers = () => {
        teacherServices.getAll({search, page: page + 1, limit})
        .then(data => {
          data.data.forEach(el => {
            el.application.forEach(appl => {
              appl.workplace = JSON.parse(appl.workplace);
              appl.education = JSON.parse(appl.education);
              appl.diploma = JSON.parse(appl.diploma);
            })
          })
  
          setTeachers(data.data);
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
                    <TeacherListToolbar setSearch={setSearch} setPage={setPage} teachers={teachers} />
                    <Box sx={{ pt: 3 }}>
                        <TeacherListResults
                            search={search}
                            teachers={teachers}
                            setTeachers={setTeachers}
                            total={total}
                            page={page}
                            setPage={setPage}
                            limit={limit}
                            setLimit={setLimit}
                            loader={loader}
                            getTeachers={getTeachers}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default TeacherList;