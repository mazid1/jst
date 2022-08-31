import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={process.env['NX_GOOGLE_CLIENT_ID'] || ''}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme['config'].initialColorMode} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
