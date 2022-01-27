import { useState, useEffect } from 'react';
import {
    Box,
    Fab,
    ListItemButton,
    ListItemText,
    Collapse
} from '@material-ui/core';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    ExpandLess,
    ExpandMore
} from '@material-ui/icons';

const ApplicationsApplyItem = ({ props, form, type }, ...rest) => {
    const [open, setOpen] = useState(true);
    const application = props.el;
    const index = props.index;
    const arrayHelpers = props.arrayHelpers;
    //const setFieldValue = props.setFieldValue;
    const values = props.values;
    const scrollTo = props.scrollTo;
    const mode = props.mode;

    const applicationScheme = props.scheme

    useEffect(() => {
        console.log(values[mode].length > 1);
        if (values[mode].length > 1) {
            scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [])

    const addApplication = () => {
        arrayHelpers.push(applicationScheme);
    }

    const removeApplication = () => {
        arrayHelpers.remove(index);
    }

    return (
        <>
            <Box className="expand-wrapper">
                <ListItemButton className="expand-button" sx={{ ml: 2, mb: !open ? 2 : 0 }} onClick={() => setOpen(!open)}>
                    {!open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary={type} />
                </ListItemButton>
                <Box className="expand-options" sx={{ mb: !open ? 2 : 0 }}>
                    <Fab onClick={() => addApplication()} size="small" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                    <Fab onClick={() => removeApplication()} disabled={values[mode].length == 1} sx={{ ml: 1 }} size="small" color="primary" aria-label="remove">
                        <RemoveIcon />
                    </Fab>
                </Box>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ ml: 2 }}>
                    <>
                        {form}
                    </>
                </Box>
            </Collapse>
        </>
    );
}

export default ApplicationsApplyItem;