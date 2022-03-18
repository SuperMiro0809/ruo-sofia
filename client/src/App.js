import './App.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import { useEffect, useState } from 'react';
import MessageContext from './contexts/MessageContext';
import UserContext from './contexts/UserContext';
import userServices from './services/user';

const App = () => {
  const navigate = useNavigate();
  const content = useRoutes(routes);
  const [message, setMessage] = useState();
  const [user, setUser] = useState({});
  const jsonUser = JSON.stringify(user);

  useEffect(() => {
    getUser();

    const interval = setInterval(() => {
      userServices.refresh()
        .then(data => {
          localStorage.setItem('token', data.access_token);
          getUser();
        })
        .catch(err => {
          if (err.message === 'Unauthorized') {
            navigate('/login');
          }
        })
    }, 3598000);

    if (!localStorage.getItem('token')) {
      clearInterval(interval);
    }
  }, [jsonUser])

  const getUser = () => {
    userServices.profile()
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        if (err.message === 'Unauthorized') {
          navigate('/login');
        }
      })
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <UserContext.Provider value={[user, setUser]}>
          <MessageContext.Provider value={[message, setMessage]}>
            {content}
          </MessageContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
