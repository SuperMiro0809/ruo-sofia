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
  const [name, setName] = useState();
  const [egn, setEgn] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    let mounted = true;
    getMps();

    return () => mounted = false;
  }, [name, egn, date, page, limit])

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
          <MpsListToolbar setName={setName} setEgn={setEgn} setDate={setDate} setPage={setPage}/>
          <Box sx={{ pt: 3 }}>
            <MpsListResult
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

export default MpsList;
