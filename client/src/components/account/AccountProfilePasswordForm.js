import {
    Grid,
    TextField
} from '@material-ui/core';

const AccountProfilePasswordForm = ({ props }) => {
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
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    fullWidth
                    helperText={touched.oldPassword && errors.oldPassword}
                    label="Стара парола"
                    name="oldPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.oldPassword}
                    variant="outlined"
                />
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    fullWidth
                    helperText={touched.newPassword && errors.newPassword}
                    label="Нова парола"
                    name="newPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.newPassword}
                    variant="outlined"
                />
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    error={Boolean(touched.repeatNewPassword && errors.repeatNewPassword)}
                    fullWidth
                    helperText={touched.repeatNewPassword && errors.repeatNewPassword}
                    label="Повтори новата парола"
                    name="repeatNewPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.repeatNewPassword}
                    variant="outlined"
                />
            </Grid>
        </Grid>
    );
}

export default AccountProfilePasswordForm;