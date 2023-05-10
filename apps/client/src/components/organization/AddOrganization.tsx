import { AddIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';
import OrganizationFormModal from './OrganizationFormModal';

function AddOrganization() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Add Organization
      </Button>

      <OrganizationFormModal
        isOpen={isOpen}
        onClose={onClose}
        headerText="Add a new organization"
        saveButtonText="Save Organization"
      />
    </>
  );
}

export default AddOrganization;
