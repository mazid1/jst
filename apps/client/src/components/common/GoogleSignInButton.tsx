import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';

interface Props {
  onClick: () => void;
}

const GoogleSignInButton = ({ onClick }: Props) => {
  return (
    <Center>
      <Button
        w={'full'}
        maxW={'md'}
        variant={'outline'}
        leftIcon={<FcGoogle />}
        onClick={onClick}
      >
        <Center>
          <Text>Sign in</Text>
        </Center>
      </Button>
    </Center>
  );
};

export default GoogleSignInButton;
