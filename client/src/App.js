import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import { useEffect, useState } from 'react';
import MessageContext from './contexts/MessageContext';

const App = () => {
  const content = useRoutes(routes);
  const [message, setMessage] = useState();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MessageContext.Provider value={[message, setMessage]}>
          {content}
        </MessageContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
