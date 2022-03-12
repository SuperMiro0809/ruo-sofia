import { useEffect, useState, useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  faFileContract as FileContractIcon,
  faUsers as UsersIcon,
  faUserCog as UserCogIcon,
  faSignal as SignalIcon,
  faStar as StarIcon,
  faUserGraduate as UserGraduateIcon,
  faBookReader as BookReaderIcon,
  faCog as SettingsIcon,
  faUserFriends as CommitteIcon,
  faChartBar as ReferenceIcon,
  faBook as SubjectIcon
} from '@fortawesome/free-solid-svg-icons';
import NavItem from './NavItem';
import DropDownMenu from './DropDownMenu';
import LogoutItem from './LogoutItem';
import UserContext from '../contexts/UserContext';
import services from '../services';

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
  {
    href: '/app/account',
    icon: UserCogIcon,
    title: 'Профил'
  },
];

const dropDownQualifications = {
  icon: StarIcon,
  title: 'Квалификации',
  elements: [
    {
      href: '/app/teachers',
      icon: GlassesIcon,
      title: 'Учители'
    },
    {
      href: '/app/protocols',
      icon: FileContractIcon,
      title: 'Протоколи'
    },
    {
      href: '/app/teachers/certificate',
      icon: PrintIcon,
      title: 'Издаване на удостоверение'
    },
    {
      href: '/app/teachers/reference',
      icon: ReferenceIcon,
      title: 'Справки'
    }
  ]
}

const dropDownEducation = {
  icon: BookReaderIcon,
  title: 'Образование',
  elements: [
    {
      href: '/app/students-class',
      icon: UserGraduateIcon,
      title: 'Ученици - Клас'
    },
    {
      href: '/app/students-secondary',
      icon: UserGraduateIcon,
      title: 'Ученици - Средно'
    },
    {
      href: '/app/protocols/students-class',
      icon: FileContractIcon,
      title: 'Протоколи - Клас'
    },
    {
      href: '/app/protocols/students-secondary',
      icon: FileContractIcon,
      title: 'Протоколи - Средно'
    },
    {
      href: '/app/students-certificate',
      icon: PrintIcon,
      title: 'Удостоверение за завършен клас'
    },
    {
      href: '/app/students-certificate',
      icon: PrintIcon,
      title: 'Удостоверение за завършено средно'
    }
  ]
}

const dropDownSettings = {
  icon: SettingsIcon,
  title: 'Настройки',
  elements: [
    {
      href: '/app/settings/committe',
      icon: CommitteIcon,
      title: 'Комисия'
    },
    {
      href: '/app/settings/subjects',
      icon: SubjectIcon,
      title: 'Предмети'
    }
  ]
}

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [user] = useContext(UserContext);
  const [routes, setRoutes] = useState(items);

  const roles = {
    'Administrator': 'Администратор',
    'Qualifications': 'Квалификации',
    'Education': 'Образование',
    'Member': 'Потребител'
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }

    if (user.role != 'Administrator') {
      setRoutes(items.filter(item => item.href != '/app/users'));
    } else {
      setRoutes(items);
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
      <PerfectScrollbar>
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
            src={`${services.assets}/avatars/${user.avatar}`}
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
            {roles[user.role]}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <List>
            {routes.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
            {user.role !== "Education" &&
              <DropDownMenu {...dropDownQualifications} />
            }
            {user.role !== "Qualifications" &&
              <DropDownMenu {...dropDownEducation} />
            }
            <DropDownMenu {...dropDownSettings} />
            <LogoutItem />
          </List>
        </Box>
      </PerfectScrollbar>
      <Box sx={{ flexGrow: 1 }} />
    </Box >
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
              top: 169, //150, 183
              height: 'calc(100% - 169px)'
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
