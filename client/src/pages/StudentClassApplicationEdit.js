import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import studentClassServices from '../services/student-class';
import StudentClassApplicationEditForm from '../components/edit-student-class-application/StudentClassApplicationEditForm';
import StudentClassApplicationEditToolbar from '../components/edit-student-class-application/StudentClassApplicationEditToolbar';

const StudentClassApplicationEdit = () => {
    const { id } = useParams();
    const [application, setApplication] = useState({
        id: '',
        registerNumber: '',
        dateOut: '',
        documentNumber: '',
        documentDate: '',
        inNumber: '',
        inDate: '',
        class: '',
        admits: '',
        equivalenceExamsDate: '',
        equivalenceExams: [
            {
                subjectName: ''
            }
        ],
        grades: [
            {
                subjectName: '',
                grade: ''
            }
        ]
    });

    useEffect(() => {
        studentClassServices.getApplication(id)
            .then((res) => {
                setApplication({
                    id,
                    registerNumber: res.registerNumber,
                    dateOut: res.dateOut,
                    documentNumber: res.documentNumber,
                    documentDate: res.documentDate,
                    inNumber: res.inNumber,
                    inDate: res.inDate,
                    class: res.class,
                    admits: res.admits,
                    equivalenceExamsDate: res.equivalenceExamsDate,
                    equivalenceExams: JSON.parse(res.equivalenceExams),
                    grades: JSON.parse(res.grades)
                });
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }, [])

    return (
        <>
            <Helmet>
                <title>Редактиране на заявление</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <StudentClassApplicationEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <StudentClassApplicationEditForm application={application} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default StudentClassApplicationEdit;