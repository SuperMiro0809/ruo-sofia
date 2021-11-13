import { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import userServices from '../services/user';
import MessageContext from '../contexts/MessageContext';

const Login = () => {
  const navigate = useNavigate();
  const messageContext = useContext(MessageContext);

  const disableButton = (isSubmitting, errors, values) => {
    if(isSubmitting || errors.email || errors.password || !values.email || !values.password) {
      return true;
    }
  }

  return (
    <>
      <Helmet>
        <title>Логин</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
              password: Yup.string().max(255).required('Паролата е задължителна')
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              userServices.login(values)
              .then(() => {
                navigate('/app/dashboard', { replace: true });
              })
              .catch(err => {
                messageContext[1]({ status: 'error', text: err.message });
                setSubmitting(false);
                const interval = setInterval(function () {
                  messageContext[1]('');
                  clearInterval(interval);
                }, 2000)
              })
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Вход
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Въведете имейл и парола, за да влезете в системата
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Имейл"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Парола"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={disableButton(isSubmitting, errors, values)}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Влизане
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
