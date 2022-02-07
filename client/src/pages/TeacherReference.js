import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeachersReferencesResults from '../components/teachers-references/TeachersReerencesResults';
import TeachersReferencesToolbar from '../components/teachers-references/TeachersReferencesToolbar';
import teacherServices from '../services/teacher';
import protocolServices from '../services/protocol';

const TeacherReference = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [protocols, setProtocols] = useState([]);
    const [mode, setMode] = useState('protocols');
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true);
        if (mode === 'certificates') {
            teacherServices.getCertificates(startDate, endDate)
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        data[i].fullName = `${data[i].firstName} ${data[i].middleName} ${data[i].lastName}`;
                        data[i].period = `${moment(data[i].startDate).format('DD.MM.YYYY')} до ${moment(data[i].endDate).format('DD.MM.YYYY')} г.`;
                        data[i].certificateNumber = `${data[i].ruoNumberOut}/${moment(data[i].dateOut).format('DD.MM.YYYY')}`
                    }
                    setCertificates(data);
                    console.log(certificates)
                    setLoader(false);
                })
                .catch(err => {
                    if (err.message === 'Unauthorized') {
                        navigate('/login');
                    }
                })
        } else {
            protocolServices.getAll(startDate, endDate)
                .then(data => {
                    data.forEach((protocol, index) => {
                        data[index].membersString = JSON.parse(protocol.members).join(', ');
                    })
                    setProtocols(data);
                    setLoader(false);
                })
                .catch(err => {
                    if (err.message === 'Unauthorized') {
                        navigate('/login');
                    }
                })
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
                    <TeachersReferencesToolbar setStartDate={setStartDate} setEndDate={setEndDate} data={mode === 'certificates' ? certificates : protocols} mode={mode} />
                    <Box sx={{ pt: 3 }} className="TeachersReferencesResults">
                        <TeachersReferencesResults loader={loader} data={mode === 'certificates' ? certificates : protocols} mode={mode} setMode={setMode} />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default TeacherReference;