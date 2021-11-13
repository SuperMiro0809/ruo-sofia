import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import Logo from './Logo';
import Message from '../components/message/Message';
import MessageContext from '../contexts/MessageContext';

const MainNavbar = (props) => {
  const messageContext = useContext(MessageContext);

  return(
    <AppBar
      elevation={0}
      {...props}
    >
      <Toolbar sx={{ height: 64 }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        {messageContext[0] &&
            <Message text={messageContext[0].text} status={messageContext[0].status}/>
        }
      </Toolbar>
    </AppBar>
  );
}

export default MainNavbar;
