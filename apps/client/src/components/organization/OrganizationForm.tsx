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
import { z } from 'zod';
import { ServerError } from '../../@types/serverError';
import { asOptionalField } from '../../helpers/zodHelper';
import { useCreateOrganizationMutation } from '../../redux/api/organizationApiSlice';

export const ORGANIZATION_FORM_ID = 'organizationForm';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  location: asOptionalField(z.string().nonempty()),
  size: asOptionalField(z.string().nonempty()),
  minSalary: z.number().nonnegative().optional(),
  maxSalary: z.number().nonnegative().optional(),
  website: asOptionalField(z.string().url()),
  linkedinPage: asOptionalField(z.string().url()),
});

type OrganizationSchema = z.infer<typeof schema>;

type OrganizationFormProps = {
  onSuccess: () => void;
};

function OrganizationForm({ onSuccess }: OrganizationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationSchema>({ resolver: zodResolver(schema) });

  const [createOrganization] = useCreateOrganizationMutation();

  const toast = useToast();

  const onSubmit: SubmitHandler<OrganizationSchema> = async (data) => {
    try {
      const newOrganization = await createOrganization(data).unwrap();
      toast({
        title: 'Created.',
        description: (
          <Text>
            <strong>{newOrganization.name}</strong> organization created.
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
    <form onSubmit={handleSubmit(onSubmit)} id={ORGANIZATION_FORM_ID}>
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

export default OrganizationForm;
