import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentSecondaryAddForm from '../components/add-student-secondary/StudentSecondaryAddForm';
import StudentSecondaryAddToolbar from '../components/add-student-secondary/StudentSecondaryAddToolbar';

const StudentSecondaryAdd = () => (
  <>
    <Helmet>
      <title>Добави ученик</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <StudentSecondaryAddToolbar />
        <Box sx={{ pt: 3 }}>
          <StudentSecondaryAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default StudentSecondaryAdd;
