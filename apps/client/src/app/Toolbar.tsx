import {
  Link,
  Box,
  useColorModeValue,
  useDisclosure,
  Flex,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Container,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import NavLink from '../components/NavLink';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import {
  useLoginMutation,
  useLogoutMutation,
} from '../features/auth/authApiSlice';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { selectCurrentUser } from '../features/auth/userSlice';
import { useSelector } from 'react-redux';

const links = ['Applications', 'Organizations'];

const Toolbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const currentUser = useSelector(selectCurrentUser);

  const startLogin = async (codeResponse: CodeResponse) => {
    const { code } = codeResponse;
    try {
      const { name, email, picture } = await login({ code }).unwrap();
      console.log(name, email, picture);
    } catch (err) {
      console.log(err);
    }
  };

  const requestUserConsent = useGoogleLogin({
    onSuccess: startLogin,
    onError: (err) => console.log(err),
    flow: 'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/drive.appdata',
  });

  const startLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const loginButton = <GoogleSignInButton onClick={requestUserConsent} />;

  const userMenu = (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Avatar size={'sm'} src={currentUser?.picture} />
      </MenuButton>
      <MenuList>
        <MenuItem>Account</MenuItem>
        <MenuDivider />
        <MenuItem onClick={startLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );

  const userButton = currentUser ? userMenu : loginButton;

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderBottomWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.300', 'gray.600')}
      px={4}
    >
      <Container maxW={'8xl'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={2} alignItems={'center'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Link
              color={useColorModeValue('teal.700', 'teal.200')}
              fontWeight={'extrabold'}
              fontSize={'xl'}
              as={ReactRouterLink}
              to={'/'}
              _hover={{ textDecoration: 'none' }}
            >
              JST
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {currentUser &&
                links.map((link) => (
                  <NavLink key={link} to={link.toLowerCase()}>
                    {link}
                  </NavLink>
                ))}
            </HStack>
          </HStack>
          <HStack alignItems={'center'}>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={() => toggleColorMode()}
              aria-label={'Toggle Dark Mode'}
            />
            {userButton}
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {currentUser &&
                links.map((link) => (
                  <NavLink key={link} to={link.toLowerCase()}>
                    {link}
                  </NavLink>
                ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Toolbar;
