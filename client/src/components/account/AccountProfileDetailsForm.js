import {
    Grid,
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText
} from '@material-ui/core';

const AccountProfileDetailsForm = ({ props }) => {
    const {
        errors,
        handleBlur,
        handleChange,
        touched,
        values
    } = props;

    return (
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
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Име"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                />
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Имейл"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                />
            </Grid>
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
                        disabled
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
    );
}

export default AccountProfileDetailsForm;