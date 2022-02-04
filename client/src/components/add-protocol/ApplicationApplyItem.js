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
import ApplicationsApplyForm from './ApplicationApplyForm';

const ApplicationsApplyItem = ({ props, type, mode, edit }, ...rest) => {
    const [open, setOpen] = useState(true);
    const el = props.el;
    const index = props.index;
    const elIndex = props.elIndex;
    const elArrayHelpers = props.elArrayHelpers
    const setFieldValue = props.setFieldValue;
    const values = props.values;
    const scrollTo = props.scrollTo;

    useEffect(() => {
        if(!edit) {
            const scheme = {
                id: el.id,
                credits: '',
                approve: '',
                notApprove: ''
            };
            elArrayHelpers.push(scheme);
        }
    }, []);

    return (
        <>
            <Box className="expand-wrapper">
                <ListItemButton className="expand-button" sx={{ ml: 2, mb: !open ? 2 : 0 }} onClick={() => setOpen(!open)}>
                    {!open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary={type} />
                </ListItemButton>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ ml: 2 }}>
                    <>
                        <ApplicationsApplyForm props={props} mode={mode} index={index} elIndex={elIndex} />
                    </>
                </Box>
            </Collapse>
        </>
    );
}

export default ApplicationsApplyItem;