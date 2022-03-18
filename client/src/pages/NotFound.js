import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button
} from '@material-ui/core';
import {
    Forward as ForwardIcon
} from '@material-ui/icons';

const NotFound = () => (
    <>
        <Helmet>
            <title>404</title>
        </Helmet>
        <Box
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="md">
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h1"
                >
                    404: Страницата, която търсите, не съществува
                </Typography>
                {/* <Typography
                    align="center"
                    color="textPrimary"
                    variant="subtitle2"
                >
                    You either tried some shady route or you came here by mistake.
                    Whichever it is, try using the navigation
                </Typography> */}
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        alt="Under development"
                        src="/static/ruo.png"
                        style={{
                            marginTop: 10,
                            display: 'inline-block',
                            maxWidth: '100%',
                            width: 360
                        }}
                    />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        component={RouterLink}
                        color="primary"
                        variant="contained"
                        to='/app/dashboard'
                        endIcon={<ForwardIcon />}
                    >
                        Върни се към начало
                    </Button>
                </Box>
            </Container>
        </Box>
    </>
);

export default NotFound;
