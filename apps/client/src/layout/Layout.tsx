import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Toolbar from './Toolbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toolbar />
      <Box as="main" bg={useColorModeValue('gray.100', 'gray.900')}>
        <Container maxW={'8xl'}>{children}</Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
