import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import StudentsClassAddForm from '../components/add-student-class/StudentsClassAddForm';
import StudetntsClassAddToolbar from '../components/add-student-class/StudetntsClassAddToolbar';

const StudentClassAdd = () => (
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
        <StudetntsClassAddToolbar />
        <Box sx={{ pt: 3 }}>
          <StudentsClassAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default StudentClassAdd;
