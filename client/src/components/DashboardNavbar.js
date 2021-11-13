import { useState, useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import Message from './message/Message';
import MessageContext from '../contexts/MessageContext';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const messageContext = useContext(MessageContext);

  return (
    <AppBar
    elevation={0}
    {...rest}
  >
    <Toolbar>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
      {messageContext[0] &&
        <Hidden xlDown>
          <Message text={messageContext[0].text} status={messageContext[0].status}/>
        </Hidden>
      }
      <Hidden lgUp>
        <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
