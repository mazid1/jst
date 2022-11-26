import { Link, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    as={ReactRouterLink}
    to={to}
  >
    {children}
  </Link>
);

export default NavLink;
