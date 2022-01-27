import './ApplicationsFormItem.scss';
import React, { useContext, useState, useRef } from 'react';
import moment from 'moment';
import {
    Box,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup
} from '@material-ui/core';
import { FieldArray } from 'formik';
import {
    DateRangePicker,
    LocalizationProvider
} from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { bg } from 'date-fns/locale';
import ApplicationsApplyItem from './ApplicationsApplyItem';
import { getIn } from 'formik';

const FormItem = ({ props, index, mode }, ...rest) => {
    const errors = props.errors;
    const handleBlur = props.handleBlur;
    const handleChange = props.handleChange;
    const setFieldValue = props.setFieldValue;
    const touched = props.touched;
    const values = props.values;

    const [date, setDate] = useState([values[mode][index].startDate, values[mode][index].endDate]);

    return (
        <>
            <TextField
                error={Boolean(
                    getIn(touched, `${mode}.${index}.institution`) &&
                    getIn(errors, `${mode}.${index}.institution`)
                )}
                fullWidth
                helperText={
                    getIn(touched, `${mode}.${index}.institution`) &&
                    getIn(errors, `${mode}.${index}.institution`)
                }
                label="Проведено от"
                margin="normal"
                name={`${mode}.${index}.institution`}
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values[mode][index].institution}
                variant="outlined"
            />
            {mode == 'teaching' &&
                <TextField
                    error={Boolean(
                        getIn(touched, `${mode}.${index}.eik`) &&
                        getIn(errors, `${mode}.${index}.eik`)
                    )}
                    fullWidth
                    helperText={
                        getIn(touched, `${mode}.${index}.eik`) &&
                        getIn(errors, `${mode}.${index}.eik`)
                    }
                    label="ЕИК по регистър/БУЛСТАТ"
                    margin="normal"
                    name={`${mode}.${index}.eik`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values[mode][index].eik}
                    variant="outlined"
                />
            }
            <Box sx={{ mb: 1, mt: 1, ml: 1 }}>
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    Период
                </Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
                <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="От"
                        endText="До"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                            setFieldValue(`${mode}.${index}.startDate`, moment(newValue[0]).format('YYYY/MM/DD'));
                            setFieldValue(`${mode}.${index}.endDate`, moment(newValue[1]).format('YYYY/MM/DD'));
                        }}
                        renderInput={(startProps, endProps) => {
                            startProps.error = Boolean(
                                getIn(touched, `${mode}.${index}.startDate`) &&
                                getIn(errors, `${mode}.${index}.startDate`)
                            );
                            endProps.error = Boolean(
                                getIn(touched, `${mode}.${index}.endDate`) &&
                                getIn(errors, `${mode}.${index}.endDate`)
                            )
                            return (
                            <React.Fragment>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name={`${mode}.${index}.startDate`}
                                    helperText={
                                        getIn(touched, `${mode}.${index}.startDate`) &&
                                        getIn(errors, `${mode}.${index}.startDate`)
                                    }
                                    onBlur={handleBlur}
                                    {...startProps}
                                />
                                <Box sx={{ mx: 2 }}> - </Box>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name={`${mode}.${index}.endDate`}
                                    helperText={
                                        getIn(touched, `${mode}.${index}.endDate`) &&
                                        getIn(errors, `${mode}.${index}.endDate`)
                                    }
                                    onBlur={handleBlur}
                                    {...endProps}
                                />
                            </React.Fragment>
                        )
                        }
                    }
                    />
                </LocalizationProvider>
            </Box>
            {mode != 'publication' &&
                <TextField
                    error={Boolean(
                        getIn(touched, `${mode}.${index}.lessonHours`) &&
                        getIn(errors, `${mode}.${index}.lessonHours`)
                    )}
                    fullWidth
                    helperText={
                        getIn(touched, `${mode}.${index}.lessonHours`) &&
                        getIn(errors, `${mode}.${index}.lessonHours`)
                    }
                    label="Академични часове"
                    margin="normal"
                    name={`${mode}.${index}.lessonHours`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values[mode][index].lessonHours}
                    variant="outlined"
                />
            }
            <TextField
                error={Boolean(
                    getIn(touched, `${mode}.${index}.theme`) &&
                    getIn(errors, `${mode}.${index}.theme`)
                )}
                fullWidth
                helperText={
                    getIn(touched, `${mode}.${index}.theme`) &&
                    getIn(errors, `${mode}.${index}.theme`)
                }
                label="Тема"
                margin="normal"
                name={`${mode}.${index}.theme`}
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values[mode][index].theme}
                variant="outlined"
            />
            {mode == 'publication' &&
                <TextField
                    error={Boolean(
                        getIn(touched, `${mode}.${index}.published`) &&
                        getIn(errors, `${mode}.${index}.published`)
                    )}
                    fullWidth
                    helperText={
                        getIn(touched, `${mode}.${index}.published`) &&
                        getIn(errors, `${mode}.${index}.published`)
                    }
                    label="Къде е публикувано?"
                    margin="normal"
                    name={`${mode}.${index}.published`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values[mode][index].published}
                    variant="outlined"
                />
            }
        </>
    );
}

const ApplicationsFormItem = ({ props, ...rest }) => {
    const errors = props.errors;
    const handleBlur = props.handleBlur;
    const handleChange = props.handleChange;
    const setFieldValue = props.setFieldValue;
    const touched = props.touched;
    const values = props.values;

    const teachingScheme = {
        institution: '',
        eik: '',
        startDate: '',
        endDate: '',
        lessonHours: '',
        theme: ''
    };
    const reportScheme = {
        institution: '',
        startDate: '',
        endDate: '',
        lessonHours: '',
        theme: ''
    };
    const publicationScheme = {
        institution: '',
        startDate: '',
        endDate: '',
        theme: '',
        published: ''
    };

    const scrollToTeaching = useRef(null);
    const scrollToReport = useRef(null);
    const scrollToPublication = useRef(null);

    return (
        <FormGroup className="ApplicationsFormItem">
            <FieldArray
                name="teaching"
                render={arrayHelpers => (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="qualification"
                                    value="teachings"
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            arrayHelpers.push(teachingScheme);
                                        } else {
                                            setFieldValue('teaching', []);
                                        }

                                        handleChange(event);
                                    }}
                                />
                            }
                            label="участие в обучение"
                        />
                        {values.qualification.includes("teachings") &&
                            <>
                                {values.teaching.map((el, index) => (
                                    <>
                                        <ApplicationsApplyItem
                                            key={index}
                                            form={<FormItem props={props} index={index} mode="teaching" />}
                                            type="Обучение"
                                            props={{
                                                arrayHelpers,
                                                el,
                                                index,
                                                scrollTo: scrollToTeaching,
                                                mode: 'teaching',
                                                scheme: teachingScheme,
                                                ...props
                                            }}
                                        />
                                    </>
                                ))}
                            </>
                        }
                    </>
                )}
            />
            <div ref={scrollToTeaching}></div>
            <FieldArray
                name="report"
                render={arrayHelpers => (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="qualification"
                                    value="reports"
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            arrayHelpers.push(reportScheme);
                                        } else {
                                            setFieldValue('report', []);
                                        }

                                        handleChange(event);
                                    }}
                                />
                            }
                            label="подготовка и представяне на доклад или научно съобщение за резултати от проучвания, изследователска и творческа дейност или на презентация за споделяне на добри, иновативни практики на конференция, конкурс, семинар, практикум и др."
                        />
                        {values.qualification.includes("reports") &&
                            <>
                                {values.report.map((el, index) => (
                                    <>
                                        <ApplicationsApplyItem
                                            key={index}
                                            form={<FormItem props={props} index={index} mode="report" />}
                                            type="Доклад, научно съобщение или презентация"
                                            props={{
                                                arrayHelpers,
                                                el,
                                                index,
                                                scrollTo: scrollToReport,
                                                mode: "report",
                                                scheme: reportScheme,
                                                ...props
                                            }}
                                        />
                                    </>
                                ))}
                            </>
                        }
                    </>
                )}
            />
            <div ref={scrollToReport}></div>
            <FieldArray
                name="publication"
                render={arrayHelpers => (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="qualification"
                                    value="publications"
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            arrayHelpers.push(publicationScheme)
                                        } else {
                                            setFieldValue('publication', []);
                                        }

                                        handleChange(event);
                                    }}
                                />
                            }
                            label="научна или методическа публикация в периодично издание"
                        />
                        {values.qualification.includes("publications") &&
                            <>
                                {values.publication.map((el, index) => (
                                    <>
                                        <ApplicationsApplyItem
                                            key={index}
                                            form={<FormItem props={props} index={index} mode="publication" />}
                                            type="Публикация"
                                            props={{
                                                arrayHelpers,
                                                el,
                                                index,
                                                scrollTo: scrollToPublication,
                                                mode: 'publication',
                                                scheme: publicationScheme,
                                                ...props
                                            }}
                                        />
                                    </>
                                ))}
                            </>
                        }
                    </>
                )}
            />
            <div ref={scrollToPublication}></div>
        </FormGroup>
    );
};

export default ApplicationsFormItem;
