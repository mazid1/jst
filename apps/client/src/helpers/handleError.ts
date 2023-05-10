import { CreateToastFnReturn } from '@chakra-ui/react';
import { ServerError } from '../@types/serverError';

export function handleError(error: unknown, toast: CreateToastFnReturn) {
  const serverError = error as ServerError;
  const { statusCode, message } = serverError;
  if (statusCode !== 401) {
    const description =
      typeof message === 'string' ? message : message.join(', ');
    toast({
      title: 'Failed.',
      description: description || 'Unknown error occured, please try again.',
      status: 'error',
      isClosable: true,
    });
  }
}
