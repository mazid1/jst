import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import theme from './theme';
import App from './App';
import { store } from './app/store';
import { authApiSlice } from './features/auth/authApiSlice';
import { setUser } from './features/auth/authSlice';

const getCurrentUser = async () => {
  try {
    const user = await store
      .dispatch(authApiSlice.endpoints.currentUser.initiate(null))
      .unwrap();
    store.dispatch(setUser(user));
  } catch (err) {
    console.log(err);
  }
};
getCurrentUser();

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
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
