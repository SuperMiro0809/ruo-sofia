import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import MpsListResult from 'src/components/mps/MpsListResult';
import MpsListToolbar from 'src/components/mps/MpsListToolbar';

const MpsList = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [mps, setMps] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(true);
  const [number, setNumber] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    let mounted = true;
    getMps();

    return () => mounted = false;
  }, [number, startDate, endDate, page, limit])

  const getMps = () => {
    
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
          <MpsListToolbar setNumber={setNumber} setStartDate={setStartDate} setEndDate={setEndDate} setPage={setPage}/>
          <Box sx={{ pt: 3 }}>
            <MpsListResult
              
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default MpsList;
