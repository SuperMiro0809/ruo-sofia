import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container, Modal, Typography } from '@material-ui/core';
import ProtocolSecondaryListResults from '../components/protocols-secondary/ProtocolSecondaryListResults';
import ProtocolSecondaryListToolbar from '../components/protocols-secondary/ProtocolSecondaryListToolbar';
import protocolSecondaryServices from '../services/protocol-secondary';

const ProtocolSecondaryList = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [protocols, setProtocols] = useState([]);
  const [loader, setLoader] = useState(true);
  const [total, setTotal] = useState(0);
  const [number, setNumber] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    let mounted = true;
    getProtocols();

    return () => mounted = false;
  }, [number, startDate, endDate, page, limit])

  const getProtocols = () => {
    protocolSecondaryServices.getAll({number, startDate, endDate, page: page + 1, limit})
      .then(data => {
        setProtocols(data.data);
        setTotal(data.total);
        setLoader(false);
      })
      .catch(err => {
        if(err.message === 'Unauthorized') {
            navigate('/login');
        }
    })
  }

  return (
    <>
      <Helmet>
        <title>Протоколи - Средно</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProtocolSecondaryListToolbar setNumber={setNumber} setStartDate={setStartDate} setEndDate={setEndDate} setPage={setPage}/>
          <Box sx={{ pt: 3 }}>
            <ProtocolSecondaryListResults
              protocols={protocols}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              total={total}
              loader={loader}
              getProtocols={getProtocols}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProtocolSecondaryList;
