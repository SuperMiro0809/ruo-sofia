import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  faGlasses as GlassesIcon,
  faPrint as PrintIcon,
  faUserGraduate as UserGraduateIcon,
  faGraduationCap as GraduationCapIcon,
  faFileContract as FileContractIcon,
  faPollH as PollHIcon,
  faUsers as UsersIcon,
  faUserCog as UserCogIcon,
  faSignal as SignalIcon
} from '@fortawesome/free-solid-svg-icons';
import NavItem from './NavItem';
import DropDownMenu from './DropDownMenu';
import LogoutItem from './LogoutItem'; 

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: SignalIcon,
    title: 'Начало'
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Потребители'
  },
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  {
    href: '/app/account',
    icon: UserCogIcon,
    title: 'Профил'
  },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // }
];

const dropDownQualifications = {
  icon: PollHIcon,
  title: 'Квалификации',
  elements: [
    {
      href: '/app/teachers',
      icon: GlassesIcon,
      title: 'Учители'
    },
    {
      href: '/app/teachers-protokol',
      icon: FileContractIcon,
      title: 'Генериране на протокол'
    },
    {
      href: '/app/teachers-certificate',
      icon: PrintIcon,
      title: 'Издаване на удостоверение'
    }
  ]
}

const dropDownEducation = {
  icon: GraduationCapIcon,
  title: 'Образование',
  elements: [
    {
      href: '/app/students',
      icon: UserGraduateIcon,
      title: 'Ученици'
    },
    {
      href: '/app/students-certificate',
      icon: PrintIcon,
      title: 'Удостоверение за завършен клас'
    }
  ]
}

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <DropDownMenu {...dropDownQualifications}/>
          <DropDownMenu {...dropDownEducation}/>
          <LogoutItem />
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;
