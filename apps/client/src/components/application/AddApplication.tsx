import { AddIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';
import ApplicationFormModal from './ApplicationFormModal';

function AddApplication() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Add Application
      </Button>

      <ApplicationFormModal
        isOpen={isOpen}
        onClose={onClose}
        headerText="Add a new application"
        saveButtonText="Save Application"
      />
    </>
  );
}

export default AddApplication;
