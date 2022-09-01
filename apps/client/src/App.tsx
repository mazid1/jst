import { Box, Container } from '@chakra-ui/react';
import Footer from './app/Footer';
import Toolbar from './app/Toolbar';
import Home from './features/home/Home';

export function App() {
  return (
    <>
      <Toolbar />
      <Box as="main">
        <Container maxW={'8xl'}>
          <Home />
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default App;
