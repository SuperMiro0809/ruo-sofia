import { Link as RouterLink } from 'react-router-dom';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import {
    ArrowForward
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';

const DashboardCardLayout = ({ title, value, icon, url }) => (
    <Card
        sx={{ height: '100%' }}
    >
        <CardContent
            sx={{
                paddingBottom: '5px !important'
            }}
        >
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h6"
                    >
                        {title}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        <CountUp end={value}/>
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: '#124682',
                            height: 56,
                            width: 56
                        }}
                    >
                        <FontAwesomeIcon icon={icon}/>
                    </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                    pt: 2,
                    textAlign: 'right'
                }}
            >
                <Button endIcon={<ArrowForward />} component={RouterLink} to={url}>
                    Виж повече
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export default DashboardCardLayout;
