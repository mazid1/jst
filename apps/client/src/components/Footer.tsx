import {
  Box,
  BoxProps,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import SocialButton from './common/SocialButton';

const Footer = (props: BoxProps) => {
  return (
    <Box
      as="footer"
      bg={useColorModeValue('white', 'gray.900')}
      borderColor={useColorModeValue('gray.300', 'gray.600')}
      borderTopWidth={1}
      borderStyle={'solid'}
      {...props}
    >
      <VStack maxW={'8xl'} py={4} spacing={4}>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </VStack>
    </Box>
  );
};

export default Footer;
