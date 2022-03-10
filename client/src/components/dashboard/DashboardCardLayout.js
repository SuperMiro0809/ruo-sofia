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

    /* 3 */
    // <Card
    //     sx={{ height: '100%' }}
    // >
    //     <CardContent
    //         sx={{
    //             paddingBottom: '5px !important'
    //         }}
    //     >
    //         <Grid
    //             container
    //             spacing={3}
    //             sx={{ 
    //                 // justifyContent: 'centered',
    //                 // mt: 3 
    //                 justifyContent: 'space-between'
    //             }}
    //         >
    //             <Grid item>
    //                 <Typography
    //                     color="textPrimary"
    //                     variant="h3"
    //                 >
    //                     <CountUp end={value} />
    //                 </Typography>
    //             </Grid>
    //             <Grid item>
    //                 <Avatar
    //                     sx={{
    //                         backgroundColor: '#124682',
    //                         height: 60,
    //                         width: 60
    //                     }}
    //                 >
    //                     <FontAwesomeIcon icon={icon} style={{ fontSize: '35px' }}/>
    //                 </Avatar>
    //             </Grid>
    //             {/* <Grid item>
    //                 <Box className="title">
    //                     <Typography
    //                         color="#B08803"
    //                         gutterBottom
    //                         variant="h3"
    //                     >
    //                         {title}
    //                     </Typography>
    //                     <Typography
    //                             color="textPrimary"
    //                             variant="h3"
    //                         >
    //                             <CountUp end={value} />
    //                     </Typography>
    //                 </Box>
    //             </Grid> */}
    //         </Grid>
    //         <Box className="title">
    //             <Typography
    //                 color="#B08803"
    //                 gutterBottom
    //                 variant="h3"
    //             >
    //                 {title}
    //             </Typography>
    //         </Box>
    //         <Box
    //             sx={{
    //                 pt: 2,
    //                 textAlign: 'right'
    //             }}
    //         >
    //             <Button endIcon={<ArrowForward />} component={RouterLink} to={url}>
    //                 Виж повече
    //             </Button>
    //         </Box>
    //     </CardContent>
    // </Card>

    /* 2 */
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
                sx={{ 
                    // justifyContent: 'centered',
                    // mt: 3 
                    justifyContent: 'left'
                }}
            >
                {/* <Grid item>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        <CountUp end={value} />
                    </Typography>
                </Grid> */}
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: '#124682',
                            height: 60,
                            width: 60
                        }}
                    >
                        <FontAwesomeIcon icon={icon} style={{ fontSize: '35px' }}/>
                    </Avatar>
                </Grid>
                {/* <Grid item>
                    <Box className="title">
                        <Typography
                            color="#B08803"
                            gutterBottom
                            variant="h3"
                        >
                            {title}
                        </Typography>
                        <Typography
                                color="textPrimary"
                                variant="h3"
                            >
                                <CountUp end={value} />
                        </Typography>
                    </Box>
                </Grid> */}
            </Grid>
            <Box className="title">
                <Typography
                    color="#B08803"
                    gutterBottom
                    variant="h3"
                >
                    {title}
                </Typography>
                <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        <CountUp end={value} />
                </Typography>
            </Box>
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
