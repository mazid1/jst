import {
  Flex,
  FlexProps,
  Icon,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link as ReactRouterLink } from 'react-router-dom';

interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  children: string | number;
}

const NavItem = ({ icon, url, children, ...rest }: NavItemProps) => {
  return (
    <Link
      as={ReactRouterLink}
      to={url}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue('teal.400', 'teal.700'),
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
