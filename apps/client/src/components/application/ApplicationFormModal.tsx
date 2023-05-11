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
import { Application } from '../../@types';
import ApplicationForm, { APPLICATION_FORM_ID } from './ApplicationForm';

type ApplicationFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  headerText: string | ReactNode; // i.e. Add a new application
  cancelButtonText?: string;
  saveButtonText?: string;
  application?: Application;
};

function ApplicationFormModal(props: ApplicationFormModalProps) {
  const {
    isOpen,
    onClose,
    headerText,
    cancelButtonText = 'Cancel',
    saveButtonText = 'Save',
    application,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ApplicationForm onSuccess={onClose} application={application} />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button colorScheme="teal" type="submit" form={APPLICATION_FORM_ID}>
            {saveButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ApplicationFormModal;
