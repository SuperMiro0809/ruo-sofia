import {
    TextField
} from '@material-ui/core';
import { getIn } from 'formik';

const ApplicationsApplyItem = ({ props, index, elIndex, mode }, ...rest) => {
    const errors = props.errors;
    const setFieldValue = props.setFieldValue;
    const handleBlur = props.handleBlur;
    const handleChange = props.handleChange;
    const touched = props.touched;
    const values = props.values;
    const item = values.applications[index][mode][elIndex];

    return (
        <>
            <TextField
                fullWidth
                label="Предложение за признаване"
                margin="normal"
                name={`applications.${index}.${mode}.${elIndex}.approve`}
                onBlur={handleBlur}
                onChange={event => {
                    if(!event.currentTarget.value) {
                        setFieldValue(`applications.${index}.${mode}.${elIndex}.credits`, '');
                    }

                    handleChange(event);
                }}
                type="text"
                value={item ? values.applications[index][mode][elIndex].approve : ''}
                variant="outlined"
                multiline
                rows={3}
                disabled={Boolean(item && values.applications[index][mode][elIndex].notApprove)}
            />
            {item && values.applications[index][mode][elIndex].approve &&
                <TextField
                    error={Boolean(
                        getIn(touched, `applications.${index}.${mode}.${elIndex}.credits`) &&
                        getIn(errors, `applications.${index}.${mode}.${elIndex}.credits`)
                    )}
                    fullWidth
                    helperText={
                        getIn(touched, `applications.${index}.${mode}.${elIndex}.credits`) &&
                        getIn(errors, `applications.${index}.${mode}.${elIndex}.credits`)
                    }
                    label="Квалификационни кредити"
                    margin="normal"
                    name={`applications.${index}.${mode}.${elIndex}.credits`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={item ? values.applications[index][mode][elIndex].credits : ''}
                    variant="outlined"
                    InputProps={{
                        inputProps: {
                            min: 1
                        }
                    }}
                />
            }
            <TextField
                fullWidth
                label="Отказ за признаване"
                margin="normal"
                name={`applications.${index}.${mode}.${elIndex}.notApprove`}
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={item ? values.applications[index][mode][elIndex].notApprove : ''}
                variant="outlined"
                multiline
                rows={3}
                disabled={Boolean(item && values.applications[index][mode][elIndex].approve)}
            />
        </>
    );
}

export default ApplicationsApplyItem;