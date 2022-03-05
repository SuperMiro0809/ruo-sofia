import { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Fab,
    Autocomplete
} from '@material-ui/core';
import {
    Add as AddIcon,
    Remove as RemoveIcon
} from '@material-ui/icons';
import { getIn } from 'formik';

const SubjectGradeItem = ({ props, mode, subjects }) => {
    const commaSeparatorRegex = /^[2-5]{1}(,\d{0,2})?$|^[6]{1}(,[0]{0,2})?$/;
    const {
        arrayHelpers,
        values,
        errors,
        touched,
        el,
        index,
        handleBlur,
        handleChange,
        setFieldValue,
        scrollTo
    } = props;

    useEffect(() => {
        if (values[mode].length > 1) {
            scrollTo.current.scrollIntoView({ behavior: 'smooth' })
        }
    })

    return (
        <Box sx={{ ml: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} lg={6}>
                    <Autocomplete
                        fullWidth
                        onChange={(event, newValue) => {
                            console.log(newValue);
                            if (newValue) {
                                setFieldValue(`${mode}.${index}.subjectName`, newValue.label);
                            } else {
                                setFieldValue(`${mode}.${index}.subjectName`, '');
                            }
                        }}
                        disablePortal
                        options={subjects}
                        renderInput={(params) => (
                            <TextField
                                name={`${mode}.${index}.subjectName`}
                                error={Boolean(
                                    getIn(touched, `${mode}.${index}.subjectName`) &&
                                    getIn(errors, `${mode}.${index}.subjectName`)
                                )}
                                onBlur={handleBlur}
                                {...params}
                                label="Предмет"
                                margin="normal"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} lg={5}>
                    <TextField
                        ste
                        error={Boolean(
                            getIn(touched, `${mode}.${index}.grade`) &&
                            getIn(errors, `${mode}.${index}.grade`)
                        )}
                        fullWidth
                        label="Оценка"
                        margin="normal"
                        type="text"
                        name={`${mode}.${index}.grade`}
                        onBlur={handleBlur}
                        onChange={(e) => {
                            if(commaSeparatorRegex.test(e.target.value) || !e.target.value) {
                                handleChange(e);
                            }
                        }}
                        value={values[mode][index].grade}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} lg={1}>
                    <Fab onClick={() => arrayHelpers.push({ subjectName: '', grade: '' })} size="medium" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                    <Fab onClick={() => arrayHelpers.remove(index)} disabled={values[mode].length === 1} sx={{ marginLeft: '15px' }} size="medium" color="primary" aria-label="remove">
                        <RemoveIcon />
                    </Fab>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SubjectGradeItem;