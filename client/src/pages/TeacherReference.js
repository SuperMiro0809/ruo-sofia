import { useState, useEffect } from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeachersReferencesResults from '../components/teachers-references/TeachersReerencesResults';
import TeachersReferencesToolbar from '../components/teachers-references/TeachersReferencesToolbar';
import teacherServices from '../services/teacher';

const TeacherReference = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [mode, setMode] = useState('protocols');
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true);
        if(mode === 'certificates') {
            teacherServices.getCertificates(startDate, endDate)
            .then(data => {
                for(let i = 0; i < data.length; i++) {
                    data[i].fullName = `${data[i].firstName} ${data[i].middleName} ${data[i].lastName}`;
                    data[i].period = `${moment(data[i].startDate).format('DD.MM.YYYY')} до ${moment(data[i].endDate).format('DD.MM.YYYY')} г.`;
                    data[i].certificateNumber = `${data[i].ruoNumberOut}/${moment(data[i].dateOut).format('DD.MM.YYYY')}`
                }
                setTeachers(data);
                setLoader(false);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
        }else {

        }
    }, [mode, startDate, endDate]);

    return (
        <>
            <Helmet>
                <title>Справки - Учители</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <TeachersReferencesToolbar setStartDate={setStartDate} setEndDate={setEndDate} teachers={teachers} mode={mode} />
                    <Box sx={{ pt: 3 }} className="TeachersReferencesResults">
                        <TeachersReferencesResults loader={loader} teachers={teachers} setTeachers={setTeachers} mode={mode} setMode={setMode} />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default TeacherReference;