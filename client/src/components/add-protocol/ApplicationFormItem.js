import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    Fab,
    ListItemButton,
    ListItemText,
    Collapse,
    CircularProgress,
    Tooltip,
    Zoom
} from '@material-ui/core';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    ExpandLess,
    ExpandMore,
    Check as CheckIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import { getIn } from 'formik';
import teacherServices from '../../services/teacher';

const ApplicationFormItem = ({ props }, ...rest) => {
    const [open, setOpen] = useState(true);
    const [search, setSearch] = useState(false);
    const [teacher, setTeacher] = useState();
    const application = props.application;
    const index = props.index;
    const arrayHelpers = props.arrayHelpers;
    const errors = props.errors;
    const setFieldValue = props.setFieldValue;
    const handleBlur = props.handleBlur;
    const handleChange = props.handleChange;
    const touched = props.touched;
    const values = props.values;
    const scrollTo = props.scrollTo;
    const applicationSchema = {
        egn: '',
        teacherId: '',
        approve: '',
        notApprove: ''
    }

    useEffect(() => {
        if (values.applications.length > 1) {
            scrollTo.current.scrollIntoView({ behavior: 'smooth' })
        }
    })

    const findByEgn = (egn, setFieldValue, index) => {
        teacherServices.getByEgn(egn)
            .then(data => {
                setSearch(false);
                if (data.length === 1) {
                    setTeacher(true);
                    setFieldValue(`applications.${index}.teacherId`, data[0].id);
                } else {
                    setTeacher(false);
                    setFieldValue(`applications.${index}.teacherId`, '');
                }
            })
    }

    const addApplication = () => {
        arrayHelpers.push(applicationSchema);
    }

    const removeApplication = () => {
        arrayHelpers.remove(index);
    }

    return (
        <>
            <Box className="expand-wrapper">
                <ListItemButton className="expand-button" sx={{ ml: 2, mb: !open ? 2 : 0 }} onClick={() => setOpen(!open)}>
                    {!open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary="Заявление" />
                </ListItemButton>
                <Box className="expand-options" sx={{ mb: !open ? 2 : 0 }}>
                    <Fab onClick={() => addApplication()} size="small" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                    <Fab onClick={() => removeApplication()} disabled={values.applications.length == 1} sx={{ ml: 1 }} size="small" color="primary" aria-label="remove">
                        <RemoveIcon />
                    </Fab>
                </Box>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ ml: 2 }}>
                    <TextField
                        //error={Boolean(touched.egn && errors.egn)}
                        fullWidth
                        //helperText={touched.egn && errors.egn}
                        label="ЕГН"
                        margin="normal"
                        name={`applications.${index}.egn`}
                        onBlur={handleBlur}
                        onChange={e => {
                            handleChange(e);
                            if (e.currentTarget.value.length === 10) {
                                setSearch(true);
                                findByEgn(e.currentTarget.value, setFieldValue, index);
                            } else {
                                setTeacher(false);
                                setFieldValue(`applications.${index}.teacherId`, '');
                            }
                        }}
                        type="text"
                        value={values.applications[index].egn}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {values.applications[index].egn.length === 10 &&
                                    <>
                                        {search ?
                                            <CircularProgress size="28px" />
                                            :
                                            <>
                                                {teacher ?
                                                    <Tooltip TransitionComponent={Zoom} open={teacher} title="Учителят е въведен" arrow>
                                                        <CheckIcon sx={{ color: "rgb(76, 175, 80)" }} />
                                                    </Tooltip>
                                                    :
                                                    <Tooltip TransitionComponent={Zoom} open={!teacher} title="Учителят не е въведен" arrow>
                                                        <CloseIcon sx={{ color: "rgb(239, 83, 80)" }} />
                                                    </Tooltip>
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </InputAdornment>
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Предложение за признаване"
                        margin="normal"
                        name={`applications.${index}.approve`}
                        //name={`application-${index}.approve`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.applications[index].approve}
                        //value={values[`application-${index}`].approve}
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                    <TextField
                        fullWidth
                        label="Отказ за признаване"
                        margin="normal"
                        name={`applications.${index}.notApprove`}
                        // name={`application-${index}.notApprove`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.applications[index].notApprove}
                        //value={values[`application-${index}`].notApprove}
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                </Box>
            </Collapse>
        </>
    );
}

export default ApplicationFormItem;