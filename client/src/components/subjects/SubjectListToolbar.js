import { useState, useRef } from 'react';
import './SubjectListToolbar.scss';
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


const SubjectListToolbar = ({ openSubjectModalProp, setSearch, setPage }, ...props) => {
    const [value, setValue] = useState('');

    const handleSearch = () => {
        setPage(0);
        setSearch(value);
    }

    const handleReset = () => {
        setPage(0);
        setValue('');
        setSearch(null);
    }

    return (
        <Box {...props} className="SubjectListToolbar">
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
                                    placeholder="Търси предмет"
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

export default SubjectListToolbar;