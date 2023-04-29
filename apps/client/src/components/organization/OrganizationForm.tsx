import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
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

  const onSubmit: SubmitHandler<OrganizationSchema> = async (data) => {
    try {
      const createdOrganization = await createOrganization(data).unwrap();
      console.log('created', createdOrganization);
      onSuccess();
    } catch (error) {
      console.log('rejected', error);
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
