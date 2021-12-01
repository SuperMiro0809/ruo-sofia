import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import CustomerAdd from './pages/CustomerAdd';
import CustomerEdit from './pages/CustomerEdit';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';
import TeacherList from './pages/TeacherList';
import TeacherAdd from './pages/TeacherAdd';
import ProtocolList from './pages/ProtocolList';
import ProtocolAdd from './pages/ProtocolAdd';
import AdminRoute from './hoc/isAdmin';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'users', element: <AdminRoute component={CustomerList} /> },
      { path: 'users/add', element: <AdminRoute component={CustomerAdd} /> },
      { path: 'users/edit', element: <AdminRoute component={CustomerEdit} /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'teachers', element: <TeacherList /> },
      { path: 'teachers/add', element: <TeacherAdd /> },
      { path: 'protocols', element: <ProtocolList /> },
      { path: 'protocols/add', element: <ProtocolAdd /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
