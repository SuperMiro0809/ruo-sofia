import {
    Box,
    Typography,
    TextField
} from '@material-ui/core';
import { FieldArray, getIn } from 'formik';

const ProtocolEducationCommitteForm = ({ props }) => {
    const {
        errors,
        setFieldValue,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
    } = props;
    
    return (
        <Box>
            <Box sx={{ mb: 3, mt: 3, ml: 2 }}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    Комисия
                 </Typography>
            </Box>
            <Box sx={{ mb: 1, mt: 2, ml: 4 }}>
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    Председател
                </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
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
            <Box sx={{ mb: 1, mt: 2, ml: 4 }}>
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    Заместник-председатели
                </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
                <FieldArray
                    name="vicePresidents"
                    render={arrayHelpers => (
                        <>
                            {values.vicePresidents.map((vicePresident, index) => (
                                <TextField
                                    error={Boolean(
                                        getIn(touched, `vicePresidents.${index}`) &&
                                        getIn(errors, `vicePresidents.${index}`)
                                    )}
                                    fullWidth
                                    helperText={
                                        getIn(touched, `vicePresidents.${index}`) &&
                                        getIn(errors, `vicePresidents.${index}`)
                                    }
                                    label="Име"
                                    margin="normal"
                                    name={`vicePresidents.${index}`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.vicePresidents[index]}
                                    variant="outlined"
                                />
                            ))}
                        </>
                    )}
                >

                </FieldArray>
            </Box>
            <Box sx={{ mb: 1, mt: 2, ml: 4 }}>
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    Членове
                </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
                <FieldArray
                    name="members"
                    render={arrayHelpers => (
                        <>
                            {values.members.map((member, index) => (
                                <TextField
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
        </Box>
    );
}

export default ProtocolEducationCommitteForm;