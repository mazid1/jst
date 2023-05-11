import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import useConfirmation from './useConfirmation';

function ConfirmationModal() {
  const {
    isOpen,
    header,
    prompt,
    acceptButtonText,
    rejectButtonText,
    accept,
    reject,
  } = useConfirmation();
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={reject}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{prompt}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={reject}>
              {rejectButtonText}
            </Button>
            <Button colorScheme="red" onClick={accept} ml={3}>
              {acceptButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ConfirmationModal;
