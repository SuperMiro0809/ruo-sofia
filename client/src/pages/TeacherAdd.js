import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TeacherAddForm from '../components/add-teacher/TeacherAddForm';
import TeacherAddToolbar from '../components/add-teacher/TeacherAddToolbar';

const TeacherAdd = () => (
  <>
    <Helmet>
      <title>Добави учител</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <TeacherAddToolbar />
        <Box sx={{ pt: 3 }}>
          <TeacherAddForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default TeacherAdd;
