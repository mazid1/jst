import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ConfirmationContextProvider from './components/common/Confirmation/ConfirmationContextProvider';
import ConfirmationModal from './components/common/Confirmation/ConfirmationModal';
import { store } from './redux/store';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env['NX_GOOGLE_CLIENT_ID'] || ''}>
        <ChakraProvider theme={theme}>
          <ColorModeScript
            initialColorMode={theme['config'].initialColorMode}
          />
          <BrowserRouter>
            <ConfirmationContextProvider>
              <App />
              <ConfirmationModal />
            </ConfirmationContextProvider>
          </BrowserRouter>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
