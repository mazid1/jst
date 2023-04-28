import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateOrganizationDto } from '../../@types';

export const ORGANIZATION_FORM_ID = 'organizationForm';

function OrganizationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrganizationDto>();

  const onSubmit: SubmitHandler<CreateOrganizationDto> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={ORGANIZATION_FORM_ID}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>Name</FormLabel>
        <Input type="text" {...register('name', { required: true })} />
        <FormErrorMessage>Name is required.</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input type="text" {...register('location')} />
      </FormControl>

      <FormControl>
        <FormLabel>Size</FormLabel>
        <Input type="text" {...register('size')} />
      </FormControl>

      <FormControl>
        <FormLabel>Minimum Salary</FormLabel>
        <Input type="text" {...register('minSalary')} />
      </FormControl>

      <FormControl>
        <FormLabel>Maximum Salary</FormLabel>
        <Input type="text" {...register('maxSalary')} />
      </FormControl>

      <FormControl>
        <FormLabel>Website</FormLabel>
        <Input type="text" {...register('website')} />
      </FormControl>

      <FormControl>
        <FormLabel>Linkedin</FormLabel>
        <Input type="text" {...register('linkedinPage')} />
      </FormControl>
    </form>
  );
}

export default OrganizationForm;
