import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import MpsCertificateListResult from '../components/mps-certificate/MpsCertificateListResult';
import MpsCertificateListToolbar from '../components/mps-certificate/MpsCertificateListToolbar';
import mpsService from 'src/services/mps';

const MpsCertificate = () => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [mps, setMps] = useState([]);
    const [total, setTotal] = useState(0);
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState('');
    const [egn, setEgn] = useState(null);

    useEffect(() => {
        let mounted = true;
        getMps();

        return () => mounted = false;
    }, [name, egn, page, limit])

    const getMps = () => {
        mpsService.getAll({name, egn, page: page + 1, limit})
            .then(data => {
                setMps(data.data);
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
                <title>МПС</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <MpsCertificateListToolbar setName={setName} setEgn={setEgn} setPage={setPage} />
                    <Box sx={{ pt: 3 }}>
                        <MpsCertificateListResult
                            mps={mps}
                            page={page}
                            setPage={setPage}
                            limit={limit}
                            setLimit={setLimit}
                            total={total}
                            loader={loader}
                            getMps={getMps}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default MpsCertificate;