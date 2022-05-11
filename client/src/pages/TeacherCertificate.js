import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeachersCertificateListResult from '../components/teachers-certificate/TeachersCertificateListResult';
import TeacherCertificateToolbar from '../components/teachers-certificate/TeacherCertificateToolbar';
import teacherServices from '../services/teacher';

const TeacherEdit = () => {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPage]= useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let mounted = true;
        getTeachers();

        return () => mounted = false;
    }, [page, limit]);

    const getTeachers = (search) => {
        teacherServices.getAll({search, page: page + 1, limit})
            .then(data => {
                const teacherData = [];

                for (let i = 0; i < data.data.length; i++) {
                    let teacherEl = {
                        id: data.data[i].id,
                        dateOfBirth: data.data[i].dateOfBirth,
                        firstName: data.data[i].firstName,
                        middleName: data.data[i].middleName,
                        lastName: data.data[i].lastName,
                        application: []
                    }

                    for (let j = 0; j < data.data[i].application.length; j++) {
                        if (data.data[i].application[j].inProtocol) {
                            data.data[i].application[j].workplace = JSON.parse(data.data[i].application[j].workplace);
                            data.data[i].application[j].education = JSON.parse(data.data[i].application[j].education);
                            data.data[i].application[j].diploma = JSON.parse(data.data[i].application[j].diploma);
                            teacherEl.application.push(data.data[i].application[j]);
                        }
                    }

                    teacherData.push(teacherEl);
                }

                setTeachers(teacherData);  
                setTotal(data.total)
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
                <title>Удостоверения - Учител</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Box sx={{ pt: 3 }}>
                        <TeacherCertificateToolbar getTeachers={getTeachers} setLoader={setLoader}/>
                        <Box sx={{ pt: 3 }}>
                            <TeachersCertificateListResult loader={loader} teachers={teachers} page={page} setPage={setPage} limit={limit} setLimit={setLimit} total={total} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default TeacherEdit;
