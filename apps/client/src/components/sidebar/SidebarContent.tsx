import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import {
  FiBell,
  FiChevronDown,
  FiCompass,
  FiHome,
  FiMenu,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';
import Footer from '../Footer';
import NavItem from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex flexDirection="column" alignItems="space-between" h="full">
        <Flex
          h="20"
          alignItems="center"
          px="8"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor={useColorModeValue('gray.300', 'gray.600')}
        >
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            JST
          </Text>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
        <Footer mt="auto" />
      </Flex>
    </Box>
  );
};

export default SidebarContent;
