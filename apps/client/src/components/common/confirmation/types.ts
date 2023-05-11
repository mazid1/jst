import { ReactNode } from 'react';

export type DialogProps = {
  header: string | ReactNode;
  message: string | ReactNode;
  rejectButtonText: string | ReactNode;
  acceptButtonText: string | ReactNode;
  isOpen: boolean;
};

export type ConfirmationAction = {
  accept: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

export type ConfirmationDialogState = DialogProps & ConfirmationAction;
