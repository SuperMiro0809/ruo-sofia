import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CommitteEducationListResult from '../components/committe-education/CommitteEducationListResult';

const CommitteEducationList = () => {
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
            <CommitteEducationListResult/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CommitteEducationList;