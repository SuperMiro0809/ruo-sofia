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
import TeacherCertificate from './pages/TeacherCertificate';
import TeacherReference from './pages/TeacherReference';
import ProtocolList from './pages/ProtocolList';
import ProtocolAdd from './pages/ProtocolAdd';
import ProtocolEdit from './pages/ProtocolEdit';
import ProtocolTextEditor from './pages/ProtocolTextEditor';
import ApplicationAdd from './pages/ApplicationAdd';
import CommitteList from './pages/CommitteList';
import CommitteEducationList from './pages/CommitteEducationList';
import StudentClassList from './pages/StudentClassList';
import StudentClassAdd from './pages/StudentClassAdd';
import SubjectList from './pages/SubjectList';
import StudentSecondaryList from './pages/StudentSecondaryList';
import StudentSecondaryAdd from './pages/StudentSecondaryAdd';
import StudentSecondaryEdit from './pages/StudentSecondaryEdit';
import ProtocolClassList from './pages/ProtocolClassList';
import ProtocolClassAdd from './pages/ProtocolClassAdd';
import ProtocolClassEdit from './pages/ProtocolClassEdit';
import ProtocolSecondaryList from './pages/ProtocolSecondaryList';
import ProtocolSecondaryAdd from './pages/ProtocolSecondaryAdd';
import ProtocolSecondaryEdit from './pages/ProtocolSecondaryEdit';
import StudentClassCertificate from './pages/StudentClassCertificate';
import StudentSecondaryCertificate from './pages/StudentSecondaryCertificate';
import StudentClassApplicationEdit from './pages/StudentClassApplicationEdit';
import StudentReference from './pages/StudentReference';
import MpsList from './pages/MpsList';
import MpsAdd from './pages/MpsAdd';
import MpsEdit from './pages/MpsEdit';
import MpsCertificate from './pages/MpsCertificate';
import ProtocolMpsList from './pages/ProtocolMpsList';
import ProtocolMpsAdd from './pages/ProtocolMpsAdd';
import ProtocolMpsEdit from './pages/ProtocolMpsEdit';

import RoleRoute from './hoc/isRole';
import AuthRoute from './hoc/isAuth';
import NotAuthRoute from './hoc/isNotAuth';

const Layout = () => (
  <Outlet />
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
          { path: '', element: <CustomerList /> },
          { path: 'add', element: <CustomerAdd /> },
          { path: 'edit/:id', element: <CustomerEdit /> },
        ]
      },
      {
        path: 'teachers',
        element: <RoleRoute role="Qualifications" component={Layout} />,
        children: [
          { path: '', element: <TeacherList /> },
          { path: 'add', element: <TeacherAdd /> },
          { path: 'edit/:id', element: <TeacherEdit /> },
          { path: 'certificate', element: <TeacherCertificate /> },
          { path: 'application', element: <ApplicationAdd /> },
          { path: 'reference', element: <TeacherReference /> }
        ]
      },
      {
        path: 'protocols',
        element: <RoleRoute role="Qualifications" component={Layout} />,
        children: [
          { path: '', element: <ProtocolList /> },
          { path: 'add', element: <ProtocolAdd /> },
          { path: 'edit/:id', element: <ProtocolEdit /> },
          { path: 'text-editor', element: <ProtocolTextEditor /> },
          {
            path: 'students-class',
            element: <Layout />,
            children: [
              { path: '', element: <ProtocolClassList /> },
              { path: 'add', element: <ProtocolClassAdd /> },
              { path: 'edit/:id', element: <ProtocolClassEdit /> }
            ]
          },
          {
            path: 'students-secondary',
            element: <Layout />,
            children: [
              { path: '', element: <ProtocolSecondaryList /> },
              { path: 'add', element: <ProtocolSecondaryAdd /> },
              { path: 'edit/:id', element: <ProtocolSecondaryEdit /> }
            ]
          }
        ]
      },
      {
        path: 'students-class',
        element: <RoleRoute role="Education" component={Layout} />,
        children: [
          { path: '', element: <StudentClassList /> },
          { path: 'add', element: <StudentClassAdd /> },
          { path: 'certificate', element: <StudentClassCertificate /> },
          {
            path: 'application',
            children: [
              { path: ':id', element: <StudentClassApplicationEdit /> }
            ]
          }
        ]
      },
      {
        path: 'students-secondary',
        element: <RoleRoute role="Education" component={Layout} />,
        children: [
          { path: '', element: <StudentSecondaryList /> },
          { path: 'add', element: <StudentSecondaryAdd /> },
          { path: 'edit/:id', element: <StudentSecondaryEdit /> },
          { path: 'certificate', element: <StudentSecondaryCertificate /> }
        ]
      },
      {
        path: 'students/reference',
        element: <RoleRoute role="Education" component={StudentReference} />
      },
      {
        path: 'mps',
        children: [
          { path: '', element: <MpsList /> },
          { path: 'add', element: <MpsAdd /> },
          { path: 'edit/:id', element: <MpsEdit /> },
          { path: 'certificate', element: <MpsCertificate /> },
          {
            path: 'protocols',
            children: [
              { path: '', element: <ProtocolMpsList /> },
              { path: 'add', element: <ProtocolMpsAdd /> },
              { path: 'edit/:id', element: <ProtocolMpsEdit /> }
            ]
          }
        ]
      },
      {
        path: 'settings',
        element: <Layout />,
        children: [
          { path: 'committe', element: <CommitteList /> },
          { path: 'committe-education', element: <CommitteEducationList /> },
          { path: 'subjects', element: <SubjectList /> }
        ]
      },
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
