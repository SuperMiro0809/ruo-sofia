import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Container
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, FieldArray, getIn } from 'formik';
import committeServices from '../../services/committe';
import MessageContext from '../../contexts/MessageContext';

const CommitteListResult = ({ ...rest }) => {
  const navigate = useNavigate();
  const messageContext = useContext(MessageContext);
  const [committe, setCommitte] = useState({ president: '', members: ['', '', '', ''] });

  useEffect(() => {
    loadCommitte();
  }, []);

  const loadCommitte = () => {
    committeServices.getAll()
      .then(data => {
        setCommitte({ president: data[0].president, members: JSON.parse(data[0].members) });
      })
      .catch(err => {
        if (err.message === 'Unauthorized') {
          navigate('/login');
        }
      })
  }

  const disableCreateButton = (isSubmitting, errors, values) => {
    if (!values.president) {
      return true;
    }

    for (let i = 0; i < values.members.length; i++) {
      if (!values.members[i]) {
        return true;
      }
    }

    if (errors['members'] || errors.president) {
      return true;
    }

    if (isSubmitting) {
      return true;
    }

    return false;
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Container maxWidth="1050">
            <Formik
              initialValues={{
                president: committe.president,
                members: committe.members,
              }}
              validationSchema={Yup.object().shape({
                president: Yup.string().required('Председателят е задължителен'),
                members: Yup.array().of(Yup.string().required('Членът е задължителен')),
              })}
              onSubmit={(values, { setSubmitting }) => {
                committeServices.create(values)
                  .then(data => {
                    messageContext[1]({ status: 'success', text: 'Комисията е запазена успешно' });
                    const interval = setInterval(function () {
                      messageContext[1]('');
                      clearInterval(interval);
                    }, 2000)
                    setSubmitting(false);
                  })
                  .catch(err => {
                    if (err.message === 'Unauthorized') {
                      navigate('/login');
                    }
                    setSubmitting(false);
                  })
              }}
              enableReinitialize
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
                  <Box sx={{ mb: 3, mt: 3 }}>
                    <Typography
                      color="textPrimary"
                      variant="h3"
                    >
                      Комисия
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                    <Typography
                      color="textPrimary"
                      variant="h4"
                    >
                      Председател
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <TextField
                      error={Boolean(touched.president && errors.president)}
                      fullWidth
                      helperText={touched.president && errors.president}
                      label="Име"
                      margin="normal"
                      name="president"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.president}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mb: 1, mt: 2, ml: 2 }}>
                    <Typography
                      color="textPrimary"
                      variant="h4"
                    >
                      Членове
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <FieldArray
                      name="members"
                      render={arrayHelpers => (
                        <>
                          {values.members.map((member, index) => (
                            <TextField
                              key={index}
                              error={Boolean(
                                getIn(touched, `members.${index}`) &&
                                getIn(errors, `members.${index}`)
                              )}
                              fullWidth
                              helperText={
                                getIn(touched, `members.${index}`) &&
                                getIn(errors, `members.${index}`)
                              }
                              label="Име"
                              margin="normal"
                              name={`members.${index}`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.members[index]}
                              variant="outlined"
                            />
                          ))}
                        </>
                      )}
                    >

                    </FieldArray>
                  </Box>
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={disableCreateButton(isSubmitting, errors, values)}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Запазване
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default CommitteListResult;
