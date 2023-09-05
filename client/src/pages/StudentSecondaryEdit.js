import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import StudentSecondaryEditForm from '../components/edit-student-secondary/StudentSecondaryEditForm';
import StudentSecondaryEditToolbar from '../components/edit-student-secondary/StudentSecondaryEditToolbar';
import studentSecondaryServices from '../services/student-secondary';

const StudentSecondaryEdit = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({
        id: '',
        registerNumber: '',
        dateOut: '',
        name: '',
        egn: '',
        dateOfBirth: '',
        citizenship: '',
        documentNumber: '',
        documentDate: '',
        school: '',
        cityAndCountry: '',
        inNumber: '',
        inDate: '',
        admits: '',
        profession: '',
        speciality: '',
        equivalenceExams: [],
        grades: []
    });

    useEffect(() => {
        studentSecondaryServices.getById(id)
            .then(data => {
                setStudent({
                    id: data.id,
                    registerNumber: data.registerNumber,
                    dateOut: data.dateOut,
                    name: data.name,
                    egn: data.egn,
                    dateOfBirth: data.dateOfBirth,
                    citizenship: data.citizenship,
                    documentNumber: data.documentNumber,
                    documentDate: data.documentDate,
                    school: data.school,
                    cityAndCountry: data.cityAndCountry,
                    inNumber: data.inNumber,
                    inDate: data.inDate,
                    admits: data.admits,
                    profession: data.admits === 'ЗАВЪРШЕНО СРЕДНО С ПКС' ? student.profession : '',
                    speciality: data.admits === 'ЗАВЪРШЕНО СРЕДНО С ПКС' ? student.speciality : '',
                    equivalenceExams: JSON.parse(data.equivalenceExams),
                    grades: JSON.parse(data.grades)
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
                <title>Редактирай ученик - средно</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <StudentSecondaryEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <StudentSecondaryEditForm student={student} />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default StudentSecondaryEdit;
