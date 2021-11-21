import { useState, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import * as Yup from 'yup';
import { Formik } from 'formik';

const AccountProfileDetails = (props) => {
  const [user] = useContext(UserContext);

  return (
    <Formik
      initialValues={{
        name: user.name,
        email: user.email,
        role: user.role
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Името е задължително'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        role: Yup.string().required('Ролята е задължителна')
      })}
      onSubmit={(values) => {
        console.log(values)
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
        <form
          autoComplete="off"
          noValidate
          {...props}
          onSubmit={handleSubmit}
        >
          <Card>
            <CardHeader
              subheader="Информацията може да бъде редактирана"
              title="Профил"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Име"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid> */}
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Имейл"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid> */}
                {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid> */}
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(touched.role && errors.role)}
                    sx={{ marginTop: '0px' }}
                  >
                    <InputLabel id="demo-simple-select-label">Роля</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.role}
                      label="Роля"
                      name="role"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={"Administrator"}>Администратор</MenuItem>
                      <MenuItem value={"Qualifications"}>Квалификации</MenuItem>
                      <MenuItem value={"Education"}>Образование</MenuItem>
                      <MenuItem value={"Member"}>Потребител</MenuItem>
                    </Select>
                    <FormHelperText>{touched.role && errors.role}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                variant="contained"
              >
                Запазване
          </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default AccountProfileDetails;
