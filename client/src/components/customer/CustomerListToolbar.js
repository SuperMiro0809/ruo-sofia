import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from '@material-ui/core';
import {
    Search as SearchIcon,
    AtSign as EmailIcon
} from 'react-feather';
import { NavLink as RouterLink } from 'react-router-dom';

const CustomerListToolbar = ({ setName, setEmail, setRole }, ...props) => {
    const [nameSearch, setNameSearch] = useState();
    const [emailSearch, setEmailSearch] = useState();
    const [roleSearch, setRoleSearch] = useState('');

    const handleSearch = () => {
        setName(nameSearch);
        setEmail(emailSearch);
        setRole(roleSearch);
    };

    const handleReset = () => {
        setNameSearch('');
        setEmailSearch('');
        setRoleSearch('');
        setName(null);
        setEmail(null);
        setRole(null);
    };

    return (
        <Box {...props}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    component={RouterLink}
                    color="primary"
                    variant="contained"
                    to="/app/users/add"
                >
                    Добави потребител
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={3}>
                                <TextField
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    size="small"
                                    value={nameSearch}
                                    onChange={event => {
                                        setNameSearch(event.currentTarget.value);
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
                                    placeholder="Име"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <TextField
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    size="small"
                                    value={emailSearch}
                                    onChange={event => {
                                        setEmailSearch(event.currentTarget.value);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SvgIcon
                                                    fontSize="small"
                                                    color="action"
                                                >
                                                    <EmailIcon />
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Имейл"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={2}>
                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    sx={{ marginTop: '0px', marginBottom: '0px' }}
                                >
                                    <InputLabel id="demo-simple-select-label">Роля</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={roleSearch}
                                        label="Роля"
                                        name="role"
                                        onChange={event => {
                                            setRoleSearch(event.target.value);
                                        }}
                                    >
                                        <MenuItem value={"Administrator"}>Администратор</MenuItem>
                                        <MenuItem value={"Qualifications"}>Квалификации</MenuItem>
                                        <MenuItem value={"Education"}>Образование</MenuItem>
                                        <MenuItem value={"Member"}>Потребител</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={2} >
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
                            <Grid item xs={12} lg={2}>
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
    );
}

export default CustomerListToolbar;
