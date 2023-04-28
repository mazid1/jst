import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateOrganizationDto } from '../../@types';

export const ORGANIZATION_FORM_ID = 'organizationForm';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  location: z.string(),
  size: z.string(),
  minSalary: z.number().nonnegative().optional(),
  maxSalary: z.number().nonnegative().optional(),
  website: z.string().url().optional().or(z.literal('')),
  linkedinPage: z.string().url().optional().or(z.literal('')),
});

function OrganizationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrganizationDto>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<CreateOrganizationDto> = (data) =>
    console.log(data);

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
            setValueAs: (v) => (v ? parseFloat(v) : undefined),
          })}
        />
        <FormErrorMessage>{errors.minSalary?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.maxSalary}>
        <FormLabel>Maximum Salary</FormLabel>
        <Input
          type="number"
          {...register('maxSalary', {
            setValueAs: (v) => (v ? parseFloat(v) : undefined),
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
