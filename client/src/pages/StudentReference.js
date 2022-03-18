import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentsReferencesResults from '../components/students-references/StudentsReferencesResults';
import StudentsReferencesToolbar from '../components/students-references/StudentsReferencesToolbar';
import studentClassServices from '../services/student-class';
import studentSecondaryServices from '../services/student-secondary';

const StudentReference = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [certificatesClass, setCertificatesClass] = useState([]);
    const [certificatesSecondary, setCertificatesSecondary] = useState([]);
    const [applications, setApplications] = useState([]);
    const [mode, setMode] = useState('certificatesClass');
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        let mounted = true;
        setLoader(true);
        setPage(0);
        if (mode === 'certificatesClass') {
            getCertificatesClass();
        } else if (mode === 'certificatesSecondary') {
            getCertificatesSecondary();
        } else if (mode === 'certificatesAll') {
            getCertificatesClass();
            getCertificatesSecondary();
        }

        return () => mounted = false;
    }, [mode, startDate, endDate]);

    const getCertificatesClass = () => {
        studentClassServices.certificates(startDate, endDate)
            .then(data => {
                setCertificatesClass(data);
                setLoader(false);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    };

    const getCertificatesSecondary = () => {
        studentSecondaryServices.certificates(startDate, endDate)
            .then(data => {
                setCertificatesSecondary(data);
                setLoader(false);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    };

    return (
        <>
            <Helmet>
                <title>Справки - Ученици</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <StudentsReferencesToolbar
                        setStartDate={setStartDate}
                        data={mode === 'certificatesClass' ?
                            certificatesClass :
                            mode === 'certificatesSecondary' ?
                                certificatesSecondary :
                                [...certificatesClass, ...certificatesSecondary]
                        }
                        setEndDate={setEndDate}
                        mode={mode}
                    />
                    <Box sx={{ pt: 3 }} className="StudentsReferencesResults">
                        <StudentsReferencesResults
                            loader={loader}
                            data={mode === 'certificatesClass' ?
                                certificatesClass :
                                mode === 'certificatesSecondary' ?
                                    certificatesSecondary :
                                    [...certificatesClass, ...certificatesSecondary]
                            }
                            mode={mode}
                            setMode={setMode}
                            page={page}
                            setPage={setPage}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    )
}
//data={mode === 'certificates' ? certificates : protocols}

export default StudentReference;