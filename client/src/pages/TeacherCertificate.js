import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeachersCertificateListResult from '../components/teachers-certificate/TeachersCertificateListResult';
import TeacherCertificateToolbar from '../components/teachers-certificate/TeacherCertificateToolbar';
import teacherServices from '../services/teacher';

const TeacherEdit = () => {
    const [teachers, setTeachers] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getTeachers();
    }, []);

    const getTeachers = (search) => {
        teacherServices.getAll(search)
            .then(data => {
                const teacherData = [];

                for (let i = 0; i < data.length; i++) {
                    let teacherEl = {
                        dateOfBirth: data[i].dateOfBirth,
                        firstName: data[i].firstName,
                        middleName: data[i].middleName,
                        lastName: data[i].lastName,
                        application: []
                    }

                    for (let j = 0; j < data[i].application.length; j++) {
                        if (data[i].application[j].inProtocol) {
                            data[i].application[j].workplace = JSON.parse(data[i].application[j].workplace);
                            data[i].application[j].education = JSON.parse(data[i].application[j].education);
                            data[i].application[j].diploma = JSON.parse(data[i].application[j].diploma);
                            teacherEl.application.push(data[i].application[j]);
                        }
                    }

                    teacherData.push(teacherEl);
                }

                setTeachers(teacherData);
                setLoader(false);
                console.log(teacherData);
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
                            <TeachersCertificateListResult loader={loader} teachers={teachers} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default TeacherEdit;
