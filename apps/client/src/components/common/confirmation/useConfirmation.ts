import { useContext, useEffect, useState } from 'react';
import {
  ConfirmContext,
  defaultConfirmationDialogState,
} from './ConfirmationContextProvider';
import { DialogProps } from './types';

function useConfirmation() {
  const [confirm, setConfirm] = useContext(ConfirmContext);
  const [needsCleanup, setNeedsCleanup] = useState(false);

  const ask = (dialogProps: Partial<DialogProps> = {}) => {
    const promise = new Promise((resolve, reject) => {
      setConfirm({
        ...defaultConfirmationDialogState,
        ...dialogProps,
        isOpen: true,
        accept: resolve,
        reject,
      });
      setNeedsCleanup(true);
    });

    const reset = () => {
      setConfirm(defaultConfirmationDialogState);
      setNeedsCleanup(false);
    };

    return promise.then(
      () => {
        reset();
        return true;
      },
      () => {
        reset();
        return false;
      }
    );
  };

  // Call cancel in a cleanup func to avoid dangling confirm dialog
  useEffect(() => {
    return () => {
      if (confirm.reject && needsCleanup) {
        confirm.reject();
      }
    };
  }, [confirm, needsCleanup]);

  return {
    ...confirm,
    ask,
  };
}

export default useConfirmation;
