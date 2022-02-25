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
import subjectServices from '../../services/subjects';
import MessageContext from '../../contexts/MessageContext';

const SubjectsListResult = ({ ...rest }) => {
  const navigate = useNavigate();
  const messageContext = useContext(MessageContext);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = () => {
      subjectServices.getAll()
          .then(data => {
            setSubjects(data.map(el => el.name));
          })
          .catch(err => {
              if (err.message === 'Unauthorized') {
                  navigate('/login');
              }
          })
  }

//   const disableCreateButton = (isSubmitting, errors, values) => {
//     if (!values.president) {
//       return true;
//     }

//     for (let i = 0; i < values.members.length; i++) {
//       if (!values.members[i]) {
//         return true;
//       }
//     }

//     if (errors['members'] || errors.president) {
//       return true;
//     }

//     if (isSubmitting) {
//       return true;
//     }

//     return false;
//   }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Container maxWidth="1050">
            <Formik
              initialValues={{
                subjects: subjects
              }}
              validationSchema={Yup.object().shape({
                subjects: Yup.array().of(Yup.string().required('Предметът е задължителен')),
              })}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);

                // committeServices.create(values)
                //   .then(data => {
                //     messageContext[1]({ status: 'success', text: 'Комисията е запазена успешно' });
                //     const interval = setInterval(function () {
                //       messageContext[1]('');
                //       clearInterval(interval);
                //     }, 2000)
                //     setSubmitting(false);
                //   })
                //   .catch(err => {
                //     if (err.message === 'Unauthorized') {
                //       navigate('/login');
                //     }
                //     setSubmitting(false);
                //   })
              }}
              enableReinitialize
              validateOnBlur={true}
              validateOnChange={false}
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
                      Предмети
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <FieldArray
                      name="subjects"
                      render={arrayHelpers => (
                        <>
                          {values.subjects.map((subject, index) => (
                            <TextField
                              error={Boolean(
                                getIn(touched, `subjects.${index}`) &&
                                getIn(errors, `subjects.${index}`)
                              )}
                              fullWidth
                              helperText={
                                getIn(touched, `subjects.${index}`) &&
                                getIn(errors, `subjects.${index}`)
                              }
                              label="Име"
                              margin="normal"
                              name={`subjects.${index}`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.subjects[index]}
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
                      //disabled={disableCreateButton(isSubmitting, errors, values)}
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

export default SubjectsListResult;
