import { useState, useRef } from 'react';
import './TeacherListToolbar.scss';
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
import {
    FileDownload as ExportIcon
} from '@material-ui/icons';
import { Search as SearchIcon } from 'react-feather';
import { NavLink as RouterLink } from 'react-router-dom';
import TeachersExcelDocument from './ExcelDocument/TeachersExcelDocument';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;

const TeacherListToolbar = ({setSearch, teachers}, ...props) => {
    const [value, setValue] = useState('');

    const handleSearch = () => {
        setSearch(value);
    }

    const handleReset = () => {
        setValue('');
        setSearch('');
    }

    return (
        <Box {...props} className="TeacherListToolbar">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <TeachersExcelDocument teachers={teachers}/>
                <Button
                    sx={{ ml: 1 }}
                    component={RouterLink}
                    color="primary"
                    variant="contained"
                    to="/app/teachers/application"
                >
                    Добави заявление
                </Button>
                <Button
                    sx={{ mx: 1 }}
                    component={RouterLink}
                    color="primary"
                    variant="contained"
                    to="/app/teachers/add"
                >
                    Добави учител
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={4}>
                                <TextField
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    size="small"
                                    value={value}
                                    onChange={event => {
                                        setValue(event.currentTarget.value);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SvgIcon
                                                    fontSize="small"
                                                    color="action"
                                                >
                                                    <SearchIcon />
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Търси учител"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={4} >
                                <Button
                                    fullWidth
                                    onClick={handleSearch}
                                    sx={{ height: '100%' }}
                                    color="primary"
                                    variant="contained"
                                >
                                    Търси
                                </Button>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Button
                                    className="reset-button"
                                    fullWidth
                                    onClick={handleReset}
                                    sx={{ height: '100%', backgroundColor: '#9e9e9e' }}
                                    variant="contained"
                                >
                                    Изчисти
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default TeacherListToolbar;