import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CommitteListResult from '../components/committe/CommitteListResult';
//import CommitteListToolbar from '../components/committe/CommitteListToolbar';

const CommitteList = () => {
  return (
    <>
      <Helmet>
        <title>Комисия</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <CommitteListResult/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CommitteList;
