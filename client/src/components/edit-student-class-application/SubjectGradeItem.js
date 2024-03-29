import { useEffect } from 'react';
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

const SubjectGradeItem = ({ props, mode, subjects, noGrade }) => {
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
        scrollTo.current.scrollIntoView({ behavior: 'smooth' });
    }, [values[mode].length])

    return (
        <Box sx={{ ml: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} lg={!noGrade ? 6 : 11}>
                    <Autocomplete
                        fullWidth
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setFieldValue(`${mode}.${index}.subjectName`, newValue.label);
                            } else {
                                setFieldValue(`${mode}.${index}.subjectName`, '');
                            }
                        }}
                        disablePortal
                        isOptionEqualToValue={(option, value) => option.label == value}
                        options={subjects.sort((a, b) => -b.label.localeCompare(a.label))}
                        value={values[mode][index].subjectName || null}
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
                {!noGrade && (
                    <Grid item xs={12} lg={5}>
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={Boolean(
                                getIn(touched, `${mode}.${index}.grade`) &&
                                getIn(errors, `${mode}.${index}.grade`)
                            )}
                        >
                            <InputLabel id="demo-simple-select-label">Оценка</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values[mode][index].grade}
                                label="Оценка"
                                name={`${mode}.${index}.grade`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                                <MenuItem value={"4"}>4</MenuItem>
                                <MenuItem value={"5"}>5</MenuItem>
                                <MenuItem value={"6"}>6</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                )}

                <Grid item xs={12} lg={1}>
                    <Fab onClick={() => arrayHelpers.push(!noGrade ? { subjectName: '', grade: '' } : { subjectName: '' })} size="medium" color="primary" aria-label="add">
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