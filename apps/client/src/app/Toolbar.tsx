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
import { ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const links = ['Applications', 'Organizations'];

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

const Toolbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderBottomWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.300', 'gray.600')}
      px={4}
    >
      <Container maxW={'6xl'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
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
              {links.map((link) => (
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
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Account</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map((link) => (
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
