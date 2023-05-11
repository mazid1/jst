import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { ConfirmationDialogState } from './types';

export const defaultConfirmationDialogState: ConfirmationDialogState = {
  header: '',
  prompt: '',
  rejectButtonText: 'No',
  acceptButtonText: 'Yes',
  isOpen: false,
  accept: () => undefined,
  reject: () => undefined,
};

export const ConfirmContext = createContext<
  [ConfirmationDialogState, Dispatch<SetStateAction<ConfirmationDialogState>>]
>([defaultConfirmationDialogState, () => undefined]);

function ConfirmationContextProvider({ children }: PropsWithChildren) {
  const [confirm, setConfirm] = useState<ConfirmationDialogState>(
    defaultConfirmationDialogState
  );

  return (
    <ConfirmContext.Provider value={[confirm, setConfirm]}>
      {children}
    </ConfirmContext.Provider>
  );
}

export default ConfirmationContextProvider;
