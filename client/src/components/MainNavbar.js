import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography } from '@material-ui/core';
import Logo from './Logo';
import Message from '../components/message/Message';
import MessageContext from '../contexts/MessageContext';

const MainNavbar = (props) => {
  const messageContext = useContext(MessageContext);

  return (
    <AppBar
      elevation={0}
      {...props}
      className="Header"
    >
      <Box className="information-wrapper">
        <Typography className="information-text">ул. "Антим I" №17</Typography>
        <Typography className="information-text">02/ 935 6050</Typography>
        <Typography className="information-text">rio_sofia_grad@mon.bg</Typography>
      </Box>
      <Toolbar sx={{ bgcolor: 'white' }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        {messageContext[0] &&
            <Message text={messageContext[0].text} status={messageContext[0].status}/>
        }
      </Toolbar>
      <Toolbar style={{ minHeight: '50px' }}>
     </Toolbar>
    </AppBar>
  );
}

export default MainNavbar;
