import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import OrganizationForm, { ORGANIZATION_FORM_ID } from './OrganizationForm';

type OrganizationFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  headerText: string | ReactNode; // i.e. Add a new organization
  cancelButtonText?: string;
  saveButtonText?: string;
};

function OrganizationFormModal(props: OrganizationFormModalProps) {
  const {
    isOpen,
    onClose,
    headerText,
    cancelButtonText = 'Cancel',
    saveButtonText = 'Save',
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <OrganizationForm onSuccess={onClose} />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button colorScheme="teal" type="submit" form={ORGANIZATION_FORM_ID}>
            {saveButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OrganizationFormModal;
