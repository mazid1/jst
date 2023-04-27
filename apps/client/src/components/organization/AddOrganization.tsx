import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

function AddOrganization() {
  return (
    <Button leftIcon={<AddIcon />} colorScheme="teal">
      Add Organization
    </Button>
  );
}

export default AddOrganization;
