import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
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
    Zoom,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Autocomplete,
    Typography
} from '@material-ui/core';
import {
    DatePicker,
    LocalizationProvider
} from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import { createFilterOptions } from '@material-ui/core/Autocomplete'
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    ExpandLess,
    ExpandMore,
    Check as CheckIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import { getIn, FieldArray } from 'formik';
import teacherServices from '../../services/teacher';
import ApplicationsApplyItem from './ApplicationApplyItem';


const ApplicationFormItem = ({ props }, ...rest) => {
    const [open, setOpen] = useState(true);
    const [search, setSearch] = useState(false);
    const [teacher, setTeacher] = useState();
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState();
    const [loading, setLoading] = useState(true);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [date, setDate] = useState(null);
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
        ruoNumberOut: '',
        dateOut: '',
        teacher: '',
        application: '',
        teachings: [],
        reports: [],
        publications: []
    };
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 10
    })

    useEffect(() => {
        if (loading) {
            teacherServices.getAll()
                .then(data => {
                    let arr = []

                    data.forEach((th) => {
                        arr.push({
                            label: `${th.firstName} ${th.middleName} ${th.lastName} - ${moment(th.dateOfBirth).format('DD/MM/YYYY')}`,
                            id: th.id,
                            firstLetter: th.firstName[0].toUpperCase(),
                            application: th.application
                        });
                    })

                    setTeacherOptions(arr);
                    setLoading(false);
                })
                .catch(err => {
                    if(err.message === 'Unauthorized') {
                        navigate('/login');
                    }
                })
        }
        if (values.applications.length > 1) {
            scrollTo.current.scrollIntoView({ behavior: 'smooth' })
        }
    })

    const selectTeacher = (teacher) => {
        if (teacher == null) {
            setTeacher(false);
            setFieldValue(`applications.${index}.teacher`, '');
            return;
        }

        setTeacher(true);
        const applicationOptions = teacher.application.filter(appl => !appl.inProtocol);
        setApplications(applicationOptions);
        setFieldValue(`applications.${index}.teacher`, teacher.id);
        setFieldValue(`applications.${index}.teachings`, []);
        setFieldValue(`applications.${index}.reports`, []);
        setFieldValue(`applications.${index}.publications`, []);
        setSelectedApplication(null);
        setFieldValue(`applications.${index}.application`, '');
        if (teacher.application.length === 0) {
            setFieldValue(`applications.${index}.application`, '');
        }
    }

    const selectApplication = (id) => {
        teacherServices.getApplication(id)
            .then(data => {
                setSelectedApplication(data);
            })
            .catch(err => {
                if(err.message === 'Unauthorized') {
                    navigate('/login');
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
                        error={Boolean(
                            getIn(touched, `applications.${index}.ruoNumberOut`) &&
                            getIn(errors, `applications.${index}.ruoNumberOut`)
                        )}
                        fullWidth
                        helperText={
                            getIn(touched, `applications.${index}.ruoNumberOut`) &&
                            getIn(errors, `applications.${index}.ruoNumberOut`)
                        }
                        label="Изходящ номер"
                        margin="normal"
                        name={`applications.${index}.ruoNumberOut`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.applications[index].ruoNumberOut}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">№</InputAdornment>
                        }}
                    />
                    <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Дата"
                            value={date}
                            onChange={(newValue) => {
                                setFieldValue(`applications.${index}.dateOut`, moment(newValue).format('YYYY/MM/DD'))
                                setDate(newValue)
                            }}
                            renderInput={(params) => {
                                params.error = Boolean(
                                    getIn(touched, `applications.${index}.dateOut`) &&
                                    getIn(errors, `applications.${index}.dateOut`)
                                );
                                return (<TextField
                                    name={`applications.${index}.dateOut`}
                                    helperText={
                                        getIn(touched, `applications.${index}.dateOut`) &&
                                        getIn(errors, `applications.${index}.dateOut`)
                                    }
                                    margin="normal"
                                    onBlur={handleBlur}
                                    fullWidth
                                    {...params}
                                />)
                            }
                            }
                        />
                    </LocalizationProvider>
                    <Autocomplete
                        fullWidth
                        onChange={(event, newValue) => {
                            selectTeacher(newValue);
                        }}
                        filterOptions={filterOptions}
                        disablePortal
                        id="teacher"
                        options={teacherOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                name={`applications.${index}.teacher`}
                                error={Boolean(
                                    getIn(touched, `applications.${index}.teacher`) &&
                                    getIn(errors, `applications.${index}.teacher`)
                                )}
                                helperText={
                                    getIn(touched, `applications.${index}.teacher`) &&
                                    getIn(errors, `applications.${index}.teacher`)
                                }
                                onBlur={handleBlur}
                                {...params}
                                label="Учител"
                                margin="normal"
                            />
                        )}
                    />
                    {applications.length > 0 &&
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={Boolean(getIn(touched, `applications.${index}.application`) && getIn(errors, `applications.${index}.application`))}
                        >
                            <InputLabel id="demo-simple-select-label">Заявления</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.applications[index].application}
                                label="Заявления"
                                name={`applications.${index}.application`}
                                onChange={event => {
                                    selectApplication(event.target.value);
                                    handleChange(event);
                                }}
                                onBlur={handleBlur}
                            >
                                {applications.map((application, index) => (
                                    <MenuItem key={index} value={application.id}>Заявление № {application.ruoNumber}/{moment(application.date).format('DD.MM.YYYY')} г.</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{getIn(touched, `applications.${index}.application`) && getIn(errors, `applications.${index}.application`)}</FormHelperText>
                        </FormControl>
                    }

                    {applications.length == 0 && teacher &&
                        <FormHelperText sx={{ fontSize: '15px' }} error={true}>*Към избрания учител няма заявления или всички са включени към протoкол</FormHelperText>
                    }

                    {selectedApplication &&
                        <Box>
                            {selectedApplication.teachings.length != 0 &&
                                <>
                                    <Box sx={{ mb: 1, mt: 1, ml: 1 }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h5"
                                        >
                                            Обучения
                                        </Typography>
                                    </Box>
                                    {selectedApplication.teachings.map((teaching, tIndex) => (
                                        <FieldArray
                                            name={`applications.${index}.teachings`}
                                            render={tArrayHelpers => (
                                                <ApplicationsApplyItem
                                                    key={tIndex}
                                                    mode="teachings"
                                                    type={`Обучение на тема ${teaching.theme}, проведено от ${teaching.institution} от ${moment(teaching.startDate).format('DD.MM.YYYY')} до ${moment(teaching.endDate).format('DD.MM.YYYY')} г. за ${teaching.lessonHours} ак. часа`}
                                                    props={{
                                                        el: teaching,
                                                        elArrayHelpers: tArrayHelpers,
                                                        elIndex: tIndex,
                                                        ...props
                                                    }}
                                                />
                                            )}
                                        />
                                    ))}
                                </>
                            }
                            {selectedApplication.reports.length != 0 &&
                                <>
                                    <Box sx={{ mb: 1, mt: 1, ml: 1 }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h5"
                                        >
                                            Доклади, научни съобщения или презентации
                                    </Typography>
                                    </Box>
                                    {selectedApplication.reports.map((report, rIndex) => (
                                        <FieldArray
                                            name={`applications.${index}.reports`}
                                            render={rArrayHelpers => (
                                                <ApplicationsApplyItem
                                                    key={rIndex}
                                                    mode="reports"
                                                    type={`Доклад, научно съобщение или преззентация на тема ${report.theme}, проведено от ${report.institution} от ${moment(report.startDate).format('DD.MM.YYYY')} до ${moment(report.endDate).format('DD.MM.YYYY')} г. за ${report.lessonHours} ак. часа`}
                                                    props={{
                                                        el: report,
                                                        elArrayHelpers: rArrayHelpers,
                                                        elIndex: rIndex,
                                                        ...props
                                                    }}
                                                />
                                            )}
                                        />
                                    ))}
                                </>
                            }
                            {selectedApplication.publications.length != 0 &&
                                <>
                                    <Box sx={{ mb: 1, mt: 1, ml: 1 }}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h5"
                                        >
                                            Публикации
                                    </Typography>
                                    </Box>
                                    {selectedApplication.publications.map((publication, pIndex) => (
                                        <FieldArray
                                            name={`applications.${index}.publications`}
                                            render={pArrayHelpers => (
                                                <ApplicationsApplyItem
                                                    key={pIndex}
                                                    mode="publications"
                                                    type={`Публикация на тема ${publication.theme}, проведена от ${publication.institution} от ${moment(publication.startDate).format('DD.MM.YYYY')} до ${moment(publication.endDate).format('DD.MM.YYYY')} г., публикувана на ${publication.published}`}
                                                    props={{
                                                        el: publication,
                                                        elArrayHelpers: pArrayHelpers,
                                                        elIndex: pIndex,
                                                        ...props
                                                    }}
                                                />
                                            )}
                                        />
                                    ))}
                                </>
                            }
                        </Box>
                    }
                </Box>
            </Collapse>
        </>
    );
}

export default ApplicationFormItem;