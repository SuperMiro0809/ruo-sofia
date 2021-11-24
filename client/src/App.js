import './App.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import { useEffect, useState } from 'react';
import MessageContext from './contexts/MessageContext';
import UserContext from './contexts/UserContext';
import userServices from './services/user';

const App = () => {
  const content = useRoutes(routes);
  const [message, setMessage] = useState();
  const [user, setUser] = useState({});
  const jsonUser = JSON.stringify(user);

  useEffect(() => {
    getUser();

    const interval = setInterval(() => {
      userServices.refresh()
      .then(data => {
        console.log(data);
        localStorage.setItem('token', data.access_token);
        getUser();
      })
    }, 3598000);

    if (!localStorage.getItem('token')) {
      console.log('logged out')
      clearInterval(interval);
    }
    // console.log('User')
    //return () => clearInterval(interval);
  }, [jsonUser])

  const getUser = () => {
    userServices.profile()
    .then(data => {
      console.log(data);
      if (data.name) {
        setUser(data);
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
