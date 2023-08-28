import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import MpsEditForm from '../components/edit-mps/MpsEditForm';
import MpsEditToolbar from '../components/edit-mps/MpsEditToolbar';
import mpsService from '../services/mps';

const MpsEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [mps, setMps] = useState({
        id: '',
        name: '',
        egn: '',
        dateOfBirth: null,
        citizenship: '',
        documentNumber: '',
        documentDate: null,
        school: '',
        city: '',
        country: '',
        class: '',
        number: '',
        date: null
    });

    useEffect(() => {
        mpsService.getById(id)
            .then(res => {
                setMps({
                    id: res.id,
                    name: res.name,
                    egn: res.egn,
                    dateOfBirth: res.dateOfBirth,
                    citizenship: res.citizenship,
                    documentNumber: res.documentNumber,
                    documentDate: res.documentDate,
                    school: res.school,
                    city: res.city,
                    country: res.country,
                    class: res.class,
                    number: res.number,
                    date: res.date
                });
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
        // protocolServices.getById(id)
        //     .then(data => {
        //         const applications = [];

        //         for (let i = 0; i < data.application.length; i++) {
        //             let appl = {
        //                 ruoNumberOut: data.application[i].ruoNumberOut,
        //                 dateOut: data.application[i].dateOut,
        //                 teacher: data.application[i].teacher_id,
        //                 teacher_data: data.application[i].teacher,
        //                 application: data.application[i].id,
        //                 teachings: data.application[i].teaching,
        //                 reports: data.application[i].report,
        //                 publications: data.application[i].publication
        //             }

        //             applications.push(appl);
        //         }

        //         setProtocol({
        //             id: data.id,
        //             number: data.number,
        //             date: data.date,
        //             about: data.about,
        //             president: data.president,
        //             members: JSON.parse(data.members),
        //             applications: applications
        //         })
        //     })
        //     .catch(err => {
        //         if (err.message === 'Unauthorized') {
        //             navigate('/login');
        //         }
        //     })
    }, []);

    return (
        <>
            <Helmet>
                <title>Редактирай заявление</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <MpsEditToolbar />
                    <Box sx={{ pt: 3 }}>
                        <MpsEditForm mps={mps} />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default MpsEdit;