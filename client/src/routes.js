import { Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import CustomerAdd from './pages/CustomerAdd';
import CustomerEdit from './pages/CustomerEdit';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import TeacherList from './pages/TeacherList';
import TeacherAdd from './pages/TeacherAdd';
import TeacherEdit from './pages/TeacherEdit';
import TeacherCertificate from './pages/TeacherCertificate'
import ProtocolList from './pages/ProtocolList';
import ProtocolAdd from './pages/ProtocolAdd';
import ProtocolEdit from './pages/ProtocolEdit';
import ApplicationAdd from './pages/ApplicationAdd';
import CommitteList from './pages/CommitteList';
import RoleRoute from './hoc/isRole';
import AuthRoute from './hoc/isAuth';
import NotAuthRoute from './hoc/isNotAuth';

const Layout = () => (
  <div>
    <Outlet />
  </div>

)

const routes = [
  {
    path: 'app',
    element: <AuthRoute component={DashboardLayout} />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'account', element: <Account /> },
      {
        path: 'users',
        element: <RoleRoute role="Administrator" component={Layout} />,
        children: [
          { path: '/', element: <CustomerList /> },
          { path: 'add', element: <CustomerAdd /> },
          { path: 'edit', element: <CustomerEdit /> },
        ]
      },
      {
        path: 'teachers',
        element: <RoleRoute role="Qualifications" component={Layout} />,
        children: [
          { path: '/', element: <TeacherList /> },
          { path: 'add', element: <TeacherAdd /> },
          { path: 'edit', element: <TeacherEdit /> },
          { path: 'certificate', element: <TeacherCertificate /> },
        ]
      },
      { path: 'applications/add', element: <RoleRoute role="Qualifications" component={ApplicationAdd} /> },
      {
        path: 'protocols',
        element: <RoleRoute role="Qualifications" component={Layout} />,
        children: [
          { path: '', element: <ProtocolList /> },
          { path: 'add', element: <ProtocolAdd /> },
          { path: 'edit', element: <ProtocolEdit /> },
        ]
      },
      { path: 'settings/committe', element: <CommitteList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
      // { path: 'users', element: <RoleRoute role="Administrator" component={CustomerList} /> },
      // { path: 'users/add', element: <RoleRoute role="Administrator" component={CustomerAdd} /> },
      // { path: 'users/edit', element: <RoleRoute role="Administrator" component={CustomerEdit} /> },
      // { path: 'teachers', element: <RoleRoute role="Qualifications" component={TeacherList} /> },
      // { path: 'teachers/add', element: <RoleRoute role="Qualifications" component={TeacherAdd} /> },
      // { path: 'teachers/edit', element: <RoleRoute role="Qualifications" component={TeacherEdit} /> },
      // { path: 'teachers/certificate', element: <RoleRoute role="Qualifications" component={TeacherCertificate} /> },
      // { path: 'protocols', element: <ProtocolList /> },
      // { path: 'protocols/add', element: <ProtocolAdd /> },
      // { path: 'protocols/edit', element: <ProtocolEdit /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <NotAuthRoute component={Login} /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
