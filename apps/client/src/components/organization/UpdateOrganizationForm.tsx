import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ServerError } from '../../@types/serverError';
import { useUpdateOrganizationMutation } from '../../redux/api/organizationApiSlice';
import {
  OrganizationSchema,
  schema as organizationZodSchema,
} from './OrganizationForm';

export const EDIT_ORGANIZATION_FORM_ID = 'editOrganizationForm';

type EditOrganizationFormProps = {
  id: string;
  onSuccess: () => void;
};

function UpdateOrganizationForm({ id, onSuccess }: EditOrganizationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationZodSchema),
  });

  const [editOrganization] = useUpdateOrganizationMutation();

  const toast = useToast();

  const onSubmit: SubmitHandler<OrganizationSchema> = async (data) => {
    try {
      const newOrganization = await editOrganization({
        org: data,
        id,
      }).unwrap();
      toast({
        title: 'Updated.',
        description: (
          <Text>
            <strong>{newOrganization.name}</strong> organization updated.
          </Text>
        ),
        status: 'success',
        isClosable: true,
      });
      onSuccess();
    } catch (error) {
      const serverError = error as ServerError;
      const { statusCode, message } = serverError;
      if (statusCode !== 401) {
        const description =
          typeof message === 'string' ? message : message.join(', ');
        toast({
          title: 'Failed.',
          description:
            description || 'Unknown error occured, please try again.',
          status: 'error',
          isClosable: true,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={EDIT_ORGANIZATION_FORM_ID}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>Name</FormLabel>
        <Input type="text" {...register('name', { required: true })} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.location}>
        <FormLabel>Location</FormLabel>
        <Input type="text" {...register('location')} />
        <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.size}>
        <FormLabel>Size</FormLabel>
        <Input type="text" {...register('size')} />
        <FormErrorMessage>{errors.size?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.minSalary}>
        <FormLabel>Minimum Salary</FormLabel>
        <Input
          type="number"
          {...register('minSalary', {
            setValueAs: (v) => (v ? Number(v) : undefined),
          })}
        />
        <FormErrorMessage>{errors.minSalary?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.maxSalary}>
        <FormLabel>Maximum Salary</FormLabel>
        <Input
          type="number"
          {...register('maxSalary', {
            setValueAs: (v) => (v ? Number(v) : undefined),
          })}
        />
        <FormErrorMessage>{errors.maxSalary?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.website}>
        <FormLabel>Website</FormLabel>
        <Input type="url" {...register('website')} />
        <FormErrorMessage>{errors.website?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.linkedinPage}>
        <FormLabel>Linkedin</FormLabel>
        <Input type="url" {...register('linkedinPage')} />
        <FormErrorMessage>{errors.linkedinPage?.message}</FormErrorMessage>
      </FormControl>
    </form>
  );
}

export default UpdateOrganizationForm;
