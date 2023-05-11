export type DialogProps = {
  header: string;
  message: string;
  rejectButtonText: string;
  acceptButtonText: string;
  isOpen: boolean;
};

export type ConfirmationAction = {
  accept: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

export type ConfirmationDialogState = DialogProps & ConfirmationAction;
