import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import UserMenu from '../user/UserMenu';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const Topbar = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        JST
      </Text>

      <HStack spacing={{ base: '2', md: '6' }}>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={() => toggleColorMode()}
          aria-label={'Toggle Dark Mode'}
          variant="outline"
        />
        <UserMenu />
      </HStack>
    </Flex>
  );
};

export default Topbar;
