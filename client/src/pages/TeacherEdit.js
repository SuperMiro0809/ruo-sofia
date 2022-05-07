import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import TeacherEditForm from '../components/edit-teacher/TeacherEditForm';
import TeacherEditToolbar from '../components/edit-teacher/TeacherEditToolbar';
import teacherServices from '../services/teacher';

const TeacherEdit = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState({
        id: '',
        dateOfBirth: null,
        firstName: '',
        middleName: '',
        lastName: ''
    })

    useEffect(() => {
        teacherServices.getById(id)
            .then(data => {
                setTeacher({
                    id: data.id,
                    dateOfBirth: data.dateOfBirth,
                    firstName: data.firstName,
                    middleName: data.middleName,
                    lastName: data.lastName
                })
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }, []);

    return (
        <>
            <Helmet>
                <title>Редактирай учител</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <TeacherEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <TeacherEditForm teacher={teacher}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default TeacherEdit;
