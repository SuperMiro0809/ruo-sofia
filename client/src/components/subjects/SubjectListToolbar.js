import { useState, useRef } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';


const SubjectListToolbar = ({ openSubjectModalProp }, ...props) => {
    return (
        <Box {...props}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    sx={{ ml: 1 }}
                    color="primary"
                    variant="contained"
                    onClick={() => openSubjectModalProp.setOpenSubjectModal(true)}
                >
                    Добави предмет
                </Button>
            </Box>
        </Box>
    )
}

export default SubjectListToolbar;